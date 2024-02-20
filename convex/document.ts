import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships.js";

import { findMostSimilarItem } from "@/lib/image-similarity";

import { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.string(),
    coverImage: v.optional(v.string()),
    blurHash: v.optional(v.string()),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId: userId,
      coverImage: args.coverImage,
      coverImageBlurHash: args.blurHash,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});

export const saveImage = mutation({
  args: {
    photoData: v.object({
      title: v.string(),
      description: v.string(),
      blurHash: v.string(),
      url: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const storedImageData = await ctx.db.insert("unsplashImages", {
      photoData: {
        title: args.photoData.title,
        url: args.photoData.url,
        description: args.photoData.description,
        blurHash: args.photoData.blurHash,
      },
    });

    return storedImageData;
  },
});

export const getUnsplashImage = query({
  args: { query: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const imageWithSimilarTitle = await ctx.db
      .query("unsplashImages")
      .withSearchIndex("search_title", (q) =>
        q.search("photoData.title", args.query as string),
      )
      .collect();

    const imageWithSimilarDescription = await ctx.db
      .query("unsplashImages")
      .withSearchIndex("search_description", (q) =>
        q.search("photoData.description", args.query as string),
      )
      .collect();

    const combinedImageArray = [
      ...imageWithSimilarTitle,
      ...imageWithSimilarDescription,
    ];

    // Create a Set to filter out duplicate objects based on some unique identifier
    const uniqueImageObjects = new Set();

    // Filter the combined array to remove duplicate objects
    const filteredImageArray = combinedImageArray.filter((item) => {
      // Convert the object to a string to check for uniqueness
      const objectString = JSON.stringify(item);

      // If the objectString is not in the Set, add it and return true (keep the item)
      if (!uniqueImageObjects.has(objectString)) {
        uniqueImageObjects.add(objectString);
        return true;
      }

      // If the objectString is already in the Set, return false (discard the item)
      return false;
    });

    // Convert the filtered array back to an array of objects
    const returnedImageArray = filteredImageArray.map((item) => item);

    const mostSimilarFromArgs = findMostSimilarItem(
      returnedImageArray,
      args.query as string,
    );

    return mostSimilarFromArgs as Doc<"unsplashImages">;
  },
});

export const archive = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId),
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });

        await recursiveArchive(child._id);
      }
    };

    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    recursiveArchive(args.id);

    return document;
  },
});

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument),
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return documents;
  },
});

export const restore = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const recursiveRestore = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId),
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });

        await recursiveRestore(child._id);
      }
    };

    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    };

    if (existingDocument.parentDocument) {
      const parent = await ctx.db.get(existingDocument.parentDocument);
      if (parent?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    const document = await ctx.db.patch(args.id, options);

    recursiveRestore(args.id);

    return document;
  },
});

export const remove = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_document", (q) =>
        q.eq("userId", userId).eq("documentId", args.id),
      )
      .unique();

    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id);
    }

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.delete(args.id);

    return document;
  },
});

export const getById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Not found");
    }

    if (document.isPublished && !document.isArchived) {
      return document;
    }

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (document.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return document;
  },
});

export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.patch(args.id, {
      ...rest,
    });

    return document;
  },
});

export const removeIcon = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.patch(args.id, {
      icon: undefined,
    });

    return document;
  },
});

export const removeCoverImage = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.patch(args.id, {
      coverImage: undefined,
    });

    return document;
  },
});

export const favorite = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_document", (q) =>
        q.eq("userId", userId).eq("documentId", document._id),
      )
      .unique();

    if (existingFavorite) {
      throw new Error("Board already favorited");
    }

    await ctx.db.insert("userFavorites", {
      userId: userId,
      documentId: document._id,
    });

    return document;
  },
});

export const unfavorite = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_document", (q) =>
        q.eq("userId", userId).eq("documentId", document._id),
      )
      .unique();

    if (!existingFavorite) {
      throw new Error("Favorited board not found");
    }

    await ctx.db.delete(existingFavorite._id);

    return document;
  },
});

export const isFavorite = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const favoritedDocuments = await ctx.db
      .query("userFavorites")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    const ids = favoritedDocuments.map((b) => b.documentId);

    const documents = await getAllOrThrow(ctx.db, ids);
    documents.filter((document) => document._id === args.documentId);

    if (!documents) {
      return false;
    }

    return true;
  },
});
