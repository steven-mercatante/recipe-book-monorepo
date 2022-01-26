import React, { useState } from "react";
import { useRouter } from "next/router";
import {DeleteRecipeDialog, TextField, TextareaField} from "ui";
import { recipesApi } from "../api";
import { Form, Formik } from "formik";
import { Recipe } from "recipe-book-api-client";
import { Routes } from "../constants/routes";

interface Props {
  recipe?: Recipe;
}

interface SubmitValues {
  name: string;
  ingredients: string;
  instructions: string;
}

export default function RecipeForm({ recipe }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();

  const showDeleteBtn = router.pathname === Routes.EditRecipe;

  async function handleSubmit(values: SubmitValues) {
    if (recipe?.id) {
      await recipesApi.updateRecipe(recipe?.id!, {
        name: values.name,
        ingredients: values.ingredients,
        instructions: values.instructions,
      });
      await router.push(Routes.ViewRecipe.replace("[id]", recipe.slug!));
    } else {
      const resp = await recipesApi.createRecipe({
        name: values.name,
        ingredients: values.ingredients,
        instructions: values.instructions,
      });
      await router.push(Routes.ViewRecipe.replace("[id]", resp.data.slug!));
    }
  }

  function handleDeleteCancel() {
    setShowDeleteDialog(false);
  }

  async function handleDeleteConfirm() {
    setShowDeleteDialog(false);
    await recipesApi.destroyRecipe(recipe?.id!);
    router.push(Routes.ViewRecipes);
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
