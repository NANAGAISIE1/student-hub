import { Doc } from "../../convex/_generated/dataModel";

type Item = Doc<"unsplashImages">;

/**
 * Calculates the cosine similarity between two strings.
 * @param {string} str1 The first string.
 * @param {string} str2 The second string.
 * @returns {number} The cosine similarity between the two strings, ranging from -1 to 1.
 */

function calculateCosineSimilarity(str1: string, str2: string): number {
  // Tokenize strings into arrays of words
  const words1 = str1.toLowerCase().match(/\b\w+\b/g) || [];
  const words2 = str2.toLowerCase().match(/\b\w+\b/g) || [];

  // Create a set of unique words from both strings
  const uniqueWords = new Set([...words1, ...words2]);

  // Create vectors to represent word frequency in both strings
  const vector1 = Array.from(uniqueWords).map(
    (word) => words1.filter((w) => w === word).length,
  );
  const vector2 = Array.from(uniqueWords).map(
    (word) => words2.filter((w) => w === word).length,
  );

  // Compute dot product
  let dotProduct = 0;
  for (let i = 0; i < vector1.length; i++) {
    dotProduct += vector1[i] * vector2[i];
  }

  // Compute magnitudes
  const magnitude1 = Math.sqrt(
    vector1.reduce((acc, val) => acc + val * val, 0),
  );
  const magnitude2 = Math.sqrt(
    vector2.reduce((acc, val) => acc + val * val, 0),
  );

  // Compute cosine similarity
  const cosineSimilarity = dotProduct / (magnitude1 * magnitude2);

  return cosineSimilarity;
}

/**
 * Finds the item with the highest cosine similarity to the search string in the given array of items.
 * @param {Array<Image>} newArray The array of items to search through.
 * @param {string} searchString The search string.
 * @returns {Image | null} The item from newArray that is most similar to the search string, or null if no match is found.
 */

export function findMostSimilarItem(
  newArray: Item[],
  searchString: string,
): Item | null {
  let mostSimilarItem: Item | null = null;
  let maxSimilarityScore = 0;

  newArray.forEach((item) => {
    // Calculate similarity scores for title and description
    const titleSimilarity = calculateCosineSimilarity(
      item.photoData.title,
      searchString,
    );
    const descriptionSimilarity = calculateCosineSimilarity(
      item.photoData.description,
      searchString,
    );

    // Compute overall similarity score (you can adjust weights if needed)
    const overallSimilarity = (titleSimilarity + descriptionSimilarity) / 2;

    // Update most similar item if current item has higher similarity score
    if (overallSimilarity > maxSimilarityScore) {
      mostSimilarItem = item;
      maxSimilarityScore = overallSimilarity;
    }
  });

  return mostSimilarItem;
}
