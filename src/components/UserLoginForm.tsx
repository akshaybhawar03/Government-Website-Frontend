"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export function UserLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  function validate() {
    const nextErrors: { email?: string; password?: string } = {};

    const trimmedEmail = email.trim();
    if (!trimmedEmail) nextErrors.email = "Email is required";
    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) nextErrors.email = "Enter a valid email";
    if (!password) nextErrors.password = "Password is required";
    if (password && password.length < 8) nextErrors.password = "Password must be at least 8 characters";

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setLoading(false);
      setError(data?.error || "Invalid email or password");
      return;
    }

    setLoading(false);
    router.refresh();
    router.push(next === "/" ? "/?msg=welcome" : next);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
      {error ? (
        <div className="mb-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</div>
      ) : null}

      <div className="grid gap-3">
        <label className="text-sm">
          <span className="block font-semibold text-slate-900">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 shadow-sm outline-none ring-orange-500/30 focus:ring-4"
            placeholder="you@example.com"
            autoComplete="email"
          />
          {fieldErrors.email ? <div className="mt-1 text-xs font-semibold text-red-700">{fieldErrors.email}</div> : null}
        </label>

        <label className="text-sm">
          <span className="block font-semibold text-slate-900">Password</span>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 shadow-sm outline-none ring-orange-500/30 focus:ring-4"
            placeholder="Your password"
            autoComplete="current-password"
          />
          <div className="mt-1 text-xs font-semibold text-slate-600">Minimum 8 characters</div>
          {fieldErrors.password ? (
            <div className="mt-1 text-xs font-semibold text-red-700">{fieldErrors.password}</div>
          ) : null}
        </label>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-orange-500 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 disabled:opacity-60"
        >
          {loading ? "Please wait..." : "Login"}
        </button>
      </div>
    </form>
  );
}
