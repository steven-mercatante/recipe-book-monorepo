import React, { useState } from "react";
import { useRouter } from "next/router";
import {DeleteRecipeDialog } from "./DeleteRecipeDialog";
import { TextField} from "./TextField";
import {TextareaField} from "./TextareaField";
import { Form, Formik } from "formik";
import { Recipe } from "recipe-book-api-client";

// TODO: can the api method types be imported from the library instead of manually writing them here?
interface Props {
  createRecipe: (recipe: Recipe) => any, // TODO: real type
  updateRecipe: (id: string, recipe: Recipe) => any, // TODO: real type
  destroyRecipe: (id: string) => any, // TODO: real type
  recipe?: Recipe;
  routes: any; // TODO: real type
}

interface SubmitValues {
  name: string;
  ingredients: string;
  instructions: string;
}

export function RecipeForm({ createRecipe, destroyRecipe, recipe, updateRecipe, routes }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();

  const showDeleteBtn = router.pathname === routes.EditRecipe;

  async function handleSubmit(values: SubmitValues) {
    if (recipe?.id) {
      await updateRecipe(recipe?.id!, {
        name: values.name,
        ingredients: values.ingredients,
        instructions: values.instructions,
      });
      await router.push(routes.ViewRecipe.replace("[id]", recipe.slug!));
    } else {
      const resp = createRecipe({
        name: values.name,
        ingredients: values.ingredients,
        instructions: values.instructions,
      });
      await router.push(routes.ViewRecipe.replace("[id]", resp.data.slug!));
    }
  }

  function handleDeleteCancel() {
    setShowDeleteDialog(false);
  }

  async function handleDeleteConfirm() {
    setShowDeleteDialog(false);
    await destroyRecipe(recipe?.id!);
    router.push(routes.ViewRecipes);
  }

  return (
    <div className="recipe-form">
      <Formik
        initialValues={{
          name: recipe?.name ?? "",
          ingredients: recipe?.ingredients ?? "",
          instructions: recipe?.instructions ?? "",
        }}
        onSubmit={handleSubmit}
      >
        <Form id="recipe-form">
          <TextField name="name" label="Name" />
          <TextareaField name="ingredients" label="Ingredients" />
          <TextareaField name="instructions" label="Instructions" />
          {showDeleteBtn && (
            <button
              className="bg-red-700 rounded-md px-6 py-2 text-white mr-4"
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete Recipe
            </button>
          )}
          <button
            className="px-6 py-2 bg-green-300 text-green-900 rounded-md"
            type="submit"
          >
            <strong>Save</strong>
          </button>
        </Form>
      </Formik>

      {showDeleteDialog && (
        <DeleteRecipeDialog
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
