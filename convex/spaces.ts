import { v } from "convex/values";

import { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const archive = mutation({
  args: { id: v.id("spaces") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingSpace = await ctx.db.get(args.id);

    if (!existingSpace) {
      throw new Error("Not found");
    }

    if (existingSpace.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const recursiveArchive = async (spaceId: Id<"spaces">) => {
      const children = await ctx.db
        .query("spaces")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentSpace", spaceId),
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });

        await recursiveArchive(child._id);
      }
    };

    const space = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    recursiveArchive(args.id);

    return space;
  },
});

export const getSidebar = query({
  args: {
    parentSpace: v.optional(v.id("spaces")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const spaces = await ctx.db
      .query("spaces")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentSpace", args.parentSpace),
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return spaces;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentSpace: v.optional(v.id("spaces")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const space = await ctx.db.insert("spaces", {
      title: args.title,
      parentSpace: args.parentSpace,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return space;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const spaces = await ctx.db
      .query("spaces")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return spaces;
  },
});

export const restore = mutation({
  args: { id: v.id("spaces") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingSpace = await ctx.db.get(args.id);

    if (!existingSpace) {
      throw new Error("Not found");
    }

    if (existingSpace.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const recursiveRestore = async (spaceId: Id<"spaces">) => {
      const children = await ctx.db
        .query("spaces")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentSpace", spaceId),
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });

        await recursiveRestore(child._id);
      }
    };

    const options: Partial<Doc<"spaces">> = {
      isArchived: false,
    };

    if (existingSpace.parentSpace) {
      const parent = await ctx.db.get(existingSpace.parentSpace);
      if (parent?.isArchived) {
        options.parentSpace = undefined;
      }
    }

    const space = await ctx.db.patch(args.id, options);

    recursiveRestore(args.id);

    return space;
  },
});

export const remove = mutation({
  args: { id: v.id("spaces") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingSpace = await ctx.db.get(args.id);

    if (!existingSpace) {
      throw new Error("Not found");
    }

    if (existingSpace.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const space = await ctx.db.delete(args.id);

    return space;
  },
});

export const getSearch = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const spaces = await ctx.db
      .query("spaces")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return spaces;
  },
});

export const getById = query({
  args: { spaceId: v.id("spaces") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const space = await ctx.db.get(args.spaceId);

    if (!space) {
      throw new Error("Not found");
    }

    if (space.isPublished && !space.isArchived) {
      return space;
    }

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (space.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return space;
  },
});

export const update = mutation({
  args: {
    id: v.id("spaces"),
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

    const existingSpace = await ctx.db.get(args.id);

    if (!existingSpace) {
      throw new Error("Not found");
    }

    if (existingSpace.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const space = await ctx.db.patch(args.id, {
      ...rest,
    });

    return space;
  },
});

export const removeIcon = mutation({
  args: { id: v.id("spaces") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const existingSpace = await ctx.db.get(args.id);

    if (!existingSpace) {
      throw new Error("Not found");
    }

    if (existingSpace.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const space = await ctx.db.patch(args.id, {
      icon: undefined,
    });

    return space;
  },
});

export const removeCoverImage = mutation({
  args: { id: v.id("spaces") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const existingSpace = await ctx.db.get(args.id);

    if (!existingSpace) {
      throw new Error("Not found");
    }

    if (existingSpace.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const space = await ctx.db.patch(args.id, {
      coverImage: undefined,
    });

    return space;
  },
});
