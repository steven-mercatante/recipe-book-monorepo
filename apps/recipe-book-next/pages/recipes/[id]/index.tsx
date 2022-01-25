import Head from "next/head";
import Link from "next/link";
import { recipesApi } from "api";
import { Recipe } from "recipe-book-api-client";
import { ParsedUrlQuery } from "querystring";
import { splitByNewline } from "utils/text";
import ItemList from "components/ItemList";
import { getRecipeTags } from "utils/recipe";
import { GetServerSidePropsContext } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { Routes } from "constants/routes";

interface Props {
  canUserEditRecipe: boolean;
  canUserSaveRecipe: boolean;
  recipe: Recipe;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export default function ViewRecipe({
  canUserEditRecipe,
  canUserSaveRecipe,
  recipe,
}: Props) {
  const router = useRouter();
  const recipeTags = getRecipeTags(recipe);

  async function cloneRecipe() {
    const resp = await recipesApi.copyForUserRecipe(recipe.id!);
    const newSlug = resp.data.slug;
    await router.push(Routes.ViewRecipe.replace("[id]", newSlug!));
    // TODO: show a toast upon successful clone
  }

  return (
    <div>
      <Head>
        <title>{recipe.name} | Merc Meals</title>
      </Head>
      <div className="mb-8">
        <h1>{recipe.name}</h1>
        <p className="text-sm">
          {/*TODO: swap this with "Save this recipe" if user is browsing someone else's recipe.
          If user is not logged in, add a `?` icon with tooltip that says they'll need to register
           a free account first*/}
          {canUserEditRecipe && (
            <Link href={`/recipes/${recipe.slug}/edit`}>
              <a className="inline-block mt-4 px-4 py-2 rounded-md bg-sky-500 text-sky-50">
                Edit this recipe
              </a>
            </Link>
          )}
          {canUserSaveRecipe && (
            <button
              className="mt-4 px-4 py-2 rounded-md bg-emerald-500 text-emerald-50"
              onClick={cloneRecipe}
            >
              Save Recipe to My Cookbook
            </button>
          )}
        </p>
      </div>
      {recipeTags?.length > 0 && (
        <div>
          <span>Tagged with</span>
          <ul className="flex">
            {recipeTags.map((tag) => (
              <li className="text-sm mr-2" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
      {recipe.ingredients && (
        <div className="mt-4">
          <h2 className="text-2xl mb-2">Ingredients</h2>
          <ItemList items={splitByNewline(recipe.ingredients)} />
        </div>
      )}
      {recipe.instructions && (
        <div className="mt-8">
          <h2 className="text-2xl mb-2">Instructions</h2>
          <ItemList
            items={splitByNewline(recipe.instructions)}
            showStepNum={true}
          />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // TODO: handle error state
  const { id } = context.params as Params;

  let options = {};
  if (context.req.headers.cookie) {
    options = {
      headers: { Cookie: context.req.headers.cookie },
    };
  }

  const res = await recipesApi.retrieveRecipe(id, options);
  const recipe = res.data;

  /**
   * Anonymous users should never see link to Edit Recipe.
   * If `session` is null, the user is anonymous.
   */
  let canUserEditRecipe = false;
  let canUserSaveRecipe = false;
  const session = getSession(context.req, context.res);
  if (session) {
    const canUserEditRecipeResp = await recipesApi.canUserEditRecipe(
      id,
      options
    );
    // @ts-ignore
    canUserEditRecipe = canUserEditRecipeResp.data["can_edit"];
    /**
     * The user can save (clone) a recipe if:
     * - they're logged in
     * - they're not editors (owners) of the recipe
     */
    canUserSaveRecipe = !canUserEditRecipe;
  }

  return { props: { recipe, canUserEditRecipe, canUserSaveRecipe } };
}
