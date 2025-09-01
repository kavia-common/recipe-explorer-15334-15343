"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RecipeForm } from "@/components/RecipeForm";
import { getRecipe, updateRecipe } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { Recipe, RecipeInput } from "@/types";

/**
 * PUBLIC_INTERFACE
 * EditRecipePage renders the form to edit an existing recipe.
 */
export default function EditRecipePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { token } = useAuth();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getRecipe(id);
        if (mounted) setRecipe(data);
      } catch (e: any) {
        setErr(e?.message || "Failed to load recipe");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleSubmit = async (data: RecipeInput) => {
    if (!token || !recipe) return;
    const updated = await updateRecipe(recipe.id!, data, token);
    router.push(`/recipes/${updated.id}`);
  };

  if (loading) return <div className="text-slate-500">Loading…</div>;
  if (err) return <div className="card p-4 border-red-200 bg-red-50 text-red-800">{err}</div>;
  if (!recipe) return <div className="text-slate-500">Recipe not found.</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit Recipe</h1>
      <RecipeForm initial={recipe} onSubmit={handleSubmit} />
    </div>
  );
}
