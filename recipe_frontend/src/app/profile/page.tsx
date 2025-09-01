"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

/**
 * PUBLIC_INTERFACE
 * ProfilePage displays basic info about the current user and actions.
 */
export default function ProfilePage() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <div className="card p-4">
          <p className="mb-3 text-slate-700">You are not signed in.</p>
          <Link className="btn btn-primary" href="/signin">Go to Sign in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="card p-4 space-y-2">
        <div><span className="font-medium">Email:</span> {user.email}</div>
        <div className="flex gap-2 pt-2">
          <Link className="btn btn-secondary" href="/recipes/new">Add Recipe</Link>
          <button className="btn btn-accent" onClick={signOut}>Sign out</button>
        </div>
      </div>
    </div>
  );
}
