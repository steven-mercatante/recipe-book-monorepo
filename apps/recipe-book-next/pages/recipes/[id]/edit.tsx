import { recipesApi } from "api";
import { Recipe } from "recipe-book-api-client";
import { ParsedUrlQuery } from "querystring";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import RecipeForm from "components/RecipeForm";

interface Props {
  recipe: Recipe;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export default function EditRecipe({ recipe }: Props) {
  return (
    <div>
      <RecipeForm recipe={recipe} />
    </div>
  );
}

// TODO: the below is shared with RecipeView; it should be DRY
export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    // TODO: handle error state
    // TODO: if I'm gonna pass Cookie header, I don't think I need to wrap this in withPageAuthRequired
    // but it'd be nice to _not_ have to pass Cookie header...
    // See: https://stackoverflow.com/questions/68056181/nextjs-auth0-get-data-in-getserversideprops
    const { id } = context.params as Params;
    const res = await recipesApi.retrieveRecipe(id, {
      headers: { Cookie: context.req.headers.cookie! },
    });
    const recipe = res.data;
    return { props: { recipe } };
  },
});
