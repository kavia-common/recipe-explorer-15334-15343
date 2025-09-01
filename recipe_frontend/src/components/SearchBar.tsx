"use client";

/**
 * PUBLIC_INTERFACE
 * SearchBar is a controlled input for filtering recipes.
 */
export function SearchBar({
  value,
  onChange,
  placeholder = "Search recipes…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <input
        className="input pl-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search recipes"
      />
      <svg
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        width="18" height="18" viewBox="0 0 24 24" fill="none"
        aria-hidden="true"
      >
        <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
}
