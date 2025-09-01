"use client";

import { useEffect, useMemo, useState } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import { SearchBar } from "@/components/SearchBar";
import { listRecipes } from "@/lib/api";
import type { Recipe } from "@/types";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return recipes;
    return recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(term) ||
        (r.description || "").toLowerCase().includes(term) ||
        (r.tags || []).some((t) => t.toLowerCase().includes(term))
    );
  }, [q, recipes]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await listRecipes();
        if (mounted) setRecipes(data);
      } catch (e) {
        const err = e as Error;
        setError(err.message || "Failed to load recipes");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Browse Recipes</h1>
        <div className="w-full sm:w-96">
          <SearchBar value={q} onChange={setQ} />
        </div>
      </div>

      {error && (
        <div className="card p-4 border-red-200 bg-red-50 text-red-800">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-slate-500">Loading recipes…</div>
      ) : filtered.length === 0 ? (
        <div className="text-slate-500">No recipes found.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
