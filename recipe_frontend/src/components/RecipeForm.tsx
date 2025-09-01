"use client";

import { useState } from "react";
import type { Recipe, RecipeInput } from "@/types";

/**
 * PUBLIC_INTERFACE
 * RecipeForm collects recipe fields and emits a RecipeInput on submit.
 */
export function RecipeForm({
  initial,
  onSubmit,
}: {
  initial?: Recipe;
  onSubmit: (data: RecipeInput) => Promise<void> | void;
}) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [image, setImage] = useState(initial?.image || "");
  const [ingredients, setIngredients] = useState<string[]>(
    initial?.ingredients || [""]
  );
  const [steps, setSteps] = useState<string[]>(initial?.steps || [""]);
  const [tags, setTags] = useState<string>((initial?.tags || []).join(", "));
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const payload: RecipeInput = {
      title: title.trim(),
      description: description.trim() || undefined,
      image: image.trim() || undefined,
      ingredients: ingredients.map((s) => s.trim()).filter(Boolean),
      steps: steps.map((s) => s.trim()).filter(Boolean),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    if (!payload.title) {
      setErr("Title is required.");
      return;
    }
    try {
      setLoading(true);
      await onSubmit(payload);
    } catch (e) {
      const err = e as Error;
      setErr(err.message || "Failed to save recipe");
    } finally {
      setLoading(false);
    }
  };

  const updateArrayValue = (
    setter: (val: string[]) => void,
    list: string[],
    idx: number,
    val: string
  ) => {
    const next = [...list];
    next[idx] = val;
    setter(next);
  };

  const addRow = (setter: (val: string[]) => void, list: string[]) => {
    setter([...list, ""]);
  };

  const removeRow = (setter: (val: string[]) => void, list: string[], idx: number) => {
    const next = list.filter((_, i) => i !== idx);
    setter(next.length ? next : [""]);
  };

  return (
    <form className="card p-4 space-y-4" onSubmit={handleSubmit}>
      {err && <div className="border-red-200 bg-red-50 text-red-800 rounded p-2">{err}</div>}

      <div>
        <label className="mb-1 block text-sm font-medium">Title</label>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <textarea className="input min-h-24" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Image URL</label>
        <input className="input" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-sm font-medium">Ingredients</label>
            <button type="button" className="btn btn-secondary py-1" onClick={() => addRow(setIngredients, ingredients)}>Add</button>
          </div>
          <div className="space-y-2">
            {ingredients.map((it, idx) => (
              <div key={idx} className="flex gap-2">
                <input className="input flex-1" value={it} onChange={(e) => updateArrayValue(setIngredients, ingredients, idx, e.target.value)} />
                <button type="button" className="btn btn-accent" onClick={() => removeRow(setIngredients, ingredients, idx)}>Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-sm font-medium">Steps</label>
            <button type="button" className="btn btn-secondary py-1" onClick={() => addRow(setSteps, steps)}>Add</button>
          </div>
          <div className="space-y-2">
            {steps.map((it, idx) => (
              <div key={idx} className="flex gap-2">
                <input className="input flex-1" value={it} onChange={(e) => updateArrayValue(setSteps, steps, idx, e.target.value)} />
                <button type="button" className="btn btn-accent" onClick={() => removeRow(setSteps, steps, idx)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Tags (comma separated)</label>
        <input className="input" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="vegan, dinner, quick" />
      </div>

      <div className="flex justify-end">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
