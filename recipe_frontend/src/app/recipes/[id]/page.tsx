"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getRecipe, deleteRecipe } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { Recipe } from "@/types";
import { useRouter } from "next/navigation";

/**
 * PUBLIC_INTERFACE
 * RecipeDetailPage shows a single recipe with ingredients and steps.
 */
export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getRecipe(id);
        if (mounted) setRecipe(data);
      } catch (e) {
        const err = e as Error;
        setErr(err.message || "Failed to load recipe");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const onDelete = async () => {
    if (!token || !recipe) return;
    if (!confirm(`Delete recipe "${recipe.title}"?`)) return;
    try {
      await deleteRecipe(recipe.id!, token);
      router.push("/");
    } catch (e) {
      const err = e as Error;
      alert(err.message || "Failed to delete");
    }
  };

  if (loading) return <div className="text-slate-500">Loading…</div>;
  if (err) return <div className="card p-4 border-red-200 bg-red-50 text-red-800">{err}</div>;
  if (!recipe) return <div className="text-slate-500">Recipe not found.</div>;

  return (
    <article className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl font-semibold">{recipe.title}</h1>
        <div className="flex gap-2">
          {user && (
            <>
              <Link className="btn btn-secondary" href={`/recipes/${recipe.id}/edit`}>Edit</Link>
              <button className="btn btn-accent" onClick={onDelete}>Delete</button>
            </>
          )}
          <Link className="btn btn-primary" href="/">Back</Link>
        </div>
      </div>

      {recipe.image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      {recipe.description && <p className="text-slate-700">{recipe.description}</p>}

      {recipe.tags && recipe.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((t) => (
            <span key={t} className="badge">{t}</span>
          ))}
        </div>
      )}

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card p-4">
          <h2 className="mb-2 text-xl font-semibold">Ingredients</h2>
          <ul className="list-disc pl-6 text-slate-700">
            {(recipe.ingredients || []).map((ing, i) => (
              <li key={i}>{ ing }</li>
            ))}
          </ul>
        </div>
        <div className="card p-4">
          <h2 className="mb-2 text-xl font-semibold">Steps</h2>
          <ol className="list-decimal pl-6 text-slate-700 space-y-1">
            {(recipe.steps || []).map((step, i) => (
              <li key={i}>{ step }</li>
            ))}
          </ol>
        </div>
      </section>
    </article>
  );
}
