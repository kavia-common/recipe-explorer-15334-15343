"use client";

import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/types";

/**
 * PUBLIC_INTERFACE
 * RecipeCard displays a concise view of a recipe in a grid.
 */
export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="card card-hover block overflow-hidden">
      {recipe.image ? (
        <div className="relative aspect-video w-full">
          <Image src={recipe.image} alt={recipe.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        </div>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-slate-50 text-slate-400">
          No image
        </div>
      )}
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-1 text-lg font-semibold">{recipe.title}</h3>
        {recipe.description && (
          <p className="line-clamp-2 text-sm text-slate-600">{recipe.description}</p>
        )}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {recipe.tags.slice(0, 3).map((t) => (
              <span className="badge" key={t}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
