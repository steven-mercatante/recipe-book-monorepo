import { Configuration, RecipesApi } from "recipe-book-api-client";

const appHost =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_APP_HOST;

export const recipesApi = new RecipesApi({
  basePath: `${appHost}/api`,
} as Configuration);
