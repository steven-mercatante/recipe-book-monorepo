import { Recipe } from "recipe-book-api-client";

/**
 * Helper function that asserts recipe.tags as an array of strings.
 * This is needed for now because the OpenAPI spec (and thus API client)
 * treat recipe.tags as a string.
 */
export function getRecipeTags(recipe: Recipe): string[] {
  return recipe.tags as unknown as string[];
}
