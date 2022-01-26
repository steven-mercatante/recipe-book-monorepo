import {recipesApi} from "api";
import {RecipeForm} from "ui";
import {Routes} from "constants/routes";

// TODO: extract to "ui" package
export default function NewRecipe() {
  return (
    <div>
      <h1>New Recipe</h1>
      <RecipeForm createRecipe={recipesApi.createRecipe} destroyRecipe={recipesApi.destroyRecipe} updateRecipe={recipesApi.updateRecipe} routes={Routes}/>
    </div>
  );
}
