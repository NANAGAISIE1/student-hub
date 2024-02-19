import { createApi } from "unsplash-js";

export const getPhotoFromUnsplash = async ({ query }: { query: string }) => {
  const unsplash = createApi({
    accessKey:
      process.env.UNSPLASH_ACCESS_KEY ||
      "twxi4cGxscnAOerGQI3b3xr4u4FL5b6qPzT-o42d2tE",
  });

  const result = await unsplash.photos.getRandom({
    query: query,
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

  let photoUrl;
  let blurHash;
  if (Array.isArray(result.response)) {
    photoUrl = `${result.response[0].urls.regular}`;
    blurHash = result.response[0].blur_hash;
  } else {
    photoUrl = `${result.response.urls.regular}`;
    blurHash = result.response.blur_hash;
  }

  return { photoUrl, blurHash };
};
