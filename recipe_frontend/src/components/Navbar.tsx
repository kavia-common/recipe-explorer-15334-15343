"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

/**
 * PUBLIC_INTERFACE
 * Navbar renders the top navigation with routes and auth actions.
 */
export function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (href: string) =>
    pathname === href ? "text-[var(--color-primary)]" : "text-slate-600 hover:text-slate-900";

  return (
    <nav className="flex h-16 items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded bg-[var(--color-primary)]" />
        <Link href="/" className="text-lg font-semibold">Recipe Explorer</Link>
      </div>
      <div className="flex items-center gap-6">
        <Link href="/" className={isActive("/")}>Home</Link>
        <Link href="/profile" className={isActive("/profile")}>Profile</Link>
        {user ? (
          <Link href="/recipes/new" className="btn btn-primary">Add Recipe</Link>
        ) : (
          <Link href="/signin" className="btn btn-secondary">Sign in</Link>
        )}
      </div>
    </nav>
  );
}
