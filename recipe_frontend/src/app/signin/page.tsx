"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

/**
 * PUBLIC_INTERFACE
 * SignInPage provides a simple email/password sign-in form.
 */
export default function SignInPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      setLoading(true);
      await signIn(email, password);
    } catch (e) {
      const err = e as Error;
      setErr(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      {err && <div className="card p-3 border-red-200 bg-red-50 text-red-800">{err}</div>}
      <form className="card p-4 space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary w-full" disabled={loading} type="submit">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
