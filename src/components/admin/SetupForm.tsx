"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function SetupForm() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const res = await fetch("/api/admin/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setLoading(false);
      setError(data?.error || "Setup failed");
      return;
    }

    setLoading(false);
    setSuccess("Admin created. You can now log in.");
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="border border-zinc-200 bg-white p-4">
      {error ? <div className="mb-3 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</div> : null}
      {success ? <div className="mb-3 border border-green-200 bg-green-50 p-3 text-sm text-green-800">{success}</div> : null}

      <div className="grid gap-3">
        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">Setup Token</span>
          <input
            required
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
            placeholder="ADMIN_SETUP_TOKEN"
          />
        </label>

        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">Admin Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
          />
        </label>

        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">Admin Password</span>
          <input
            type="password"
            required
            minLength={10}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="h-10 w-full bg-zinc-900 px-4 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </div>
    </form>
  );
}
