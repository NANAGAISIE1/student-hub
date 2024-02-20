"use node";
import { v } from "convex/values";
import { createApi } from "unsplash-js";

import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import { action } from "./_generated/server";

export const coverImage = action({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    // First check if query is familiar with a description in the unsplashImages table.

    const image: Doc<"unsplashImages"> = await ctx.runQuery(
      api.document.getUnsplashImage,
      {
        query: args.query,
      },
    );

    if (image) {
      const { url: photoUrl, blurHash } = image.photoData;
      return { photoUrl, blurHash };
    }

    if (!image) {
      const unsplash = createApi({
        accessKey:
          process.env.UNSPLASH_ACCESS_KEY ||
          "twxi4cGxscnAOerGQI3b3xr4u4FL5b6qPzT-o42d2tE",
      });

      const result = await unsplash.photos.getRandom({
        query: args.query,
        orientation: "landscape",
        topicIds: [
          "nature",
          "schoo",
          "business",
          "technology",
          "people",
          "objects",
          "buildings",
          "interiors",
          "food",
          "athletics",
          "transportation",
          "travel",
          "culture",
        ],
        contentFilter: "high",
      });
      if (result.errors) {
        throw new Error(result.errors[0]);
      }

      let photoUrl: string;
      let blurHash: string;
      let description: string;
      if (Array.isArray(result.response)) {
        photoUrl = `${result.response[0].urls.regular}`;
        blurHash = result.response[0].blur_hash as string;
        description = result.response[0].description as string;
      } else {
        photoUrl = `${result.response.urls.regular}`;
        blurHash = result.response.blur_hash as string;
        description = result.response.description as string;
      }

      const url = photoUrl;

      const photoData = { title: args.query, url, blurHash, description };

      //Store title, photoUrl, description and blurHash in table
      const newPhoto = await ctx.runMutation(api.document.saveImage, {
        photoData: photoData,
      });

      return { photoUrl, blurHash };
    }
  },
});
