import Link from "next/link";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Recipe } from "recipe-book-api-client";
import { recipesApi } from "api";

interface Props {
  recipes: Recipe[];
}

function RecipesList({ recipes }: Props) {
  return (
    <div className="recipes-list">
      <ul>
        {recipes.map((recipe: Recipe) => (
          <li key={recipe.id}>
            <Link href={`/recipes/${recipe.slug}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// See: https://github.com/auth0/nextjs-auth0/issues/524
export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    // TODO: handle error state
    // TODO: if I'm gonna pass Cookie header, I don't think I need to wrap this in withPageAuthRequired
    // but it'd be nice to _not_ have to pass Cookie header...
    // See: https://stackoverflow.com/questions/68056181/nextjs-auth0-get-data-in-getserversideprops
    const res = await recipesApi.listRecipes({
      headers: { Cookie: context.req.headers.cookie! },
    });
    const recipes = res.data;
    return { props: { recipes } };
  },
});

export default RecipesList;
