import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships.js";

import { query } from "./_generated/server";

export const get = query({
  args: {
    documentId: v.id("documents"),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    if (args.favorites) {
      const favoritedDocuments = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_document", (q) =>
          q.eq("userId", identity.subject).eq("documentId", args.documentId),
        )
        .order("desc")
        .collect();

      const ids = favoritedDocuments.map((b) => b.documentId);

      const documents = await getAllOrThrow(ctx.db, ids);

      return documents.map((document) => ({
        ...document,
        isFavorite: true,
      }));
    }

    const title = args.search as string;
    let documents = [];

    if (title) {
      documents = await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("userId", identity.subject),
        )
        .collect();
    } else {
      documents = await ctx.db
        .query("documents")
        .withSearchIndex("search_content", (q) =>
          q.search("content", title).eq("userId", identity.subject),
        )
        .collect();
    }

    const documentsWithFavoriteRelation = documents.map((document) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_document", (q) =>
          q.eq("userId", identity.subject).eq("documentId", document._id),
        )
        .unique()
        .then((favorite) => {
          return {
            ...document,
            isFavorite: !!favorite,
          };
        });
    });

    const documentsWithFavoriteBoolean = Promise.all(
      documentsWithFavoriteRelation,
    );

    return documentsWithFavoriteBoolean;
  },
});

export const getAll = query({
  args: { searchParam: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const query = args.searchParam?.toLowerCase();

    if (args.searchParam) {
      const documents = await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", query as string).eq("userId", identity.subject),
        )
        .collect();

      return documents;
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});
