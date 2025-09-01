"use client";

import { useRouter } from "next/navigation";
import { RecipeForm } from "@/components/RecipeForm";
import { createRecipe } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { RecipeInput } from "@/types";

/**
 * PUBLIC_INTERFACE
 * NewRecipePage renders the form to create a recipe.
 */
export default function NewRecipePage() {
  const router = useRouter();
  const { token } = useAuth();

  const handleSubmit = async (data: RecipeInput) => {
    if (!token) return;
    const created = await createRecipe(data, token);
    router.push(`/recipes/${created.id}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add Recipe</h1>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
}
