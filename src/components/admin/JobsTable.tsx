"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type AdminJobRow = {
  _id: string;
  title: string;
  slug: string;
  type: "job" | "result" | "admit-card";
  department: string;
  state: string;
  qualification: string;
  isExpired: boolean;
  createdAt?: string;
};

export function JobsTable({ items }: { items: AdminJobRow[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function deleteJob(id: string) {
    const ok = window.confirm("Delete this item?");
    if (!ok) return;

    setDeletingId(id);
    setError(null);

    const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setDeletingId(null);
      setError(data?.error || "Failed to delete");
      return;
    }

    setDeletingId(null);
    router.refresh();
  }

  return (
    <div className="overflow-hidden border border-zinc-200 bg-white">
      {error ? <div className="border-b border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</div> : null}

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-zinc-50 text-left">
            <th className="px-3 py-2 font-semibold text-zinc-900">Title</th>
            <th className="px-3 py-2 font-semibold text-zinc-900">Type</th>
            <th className="px-3 py-2 font-semibold text-zinc-900">State</th>
            <th className="px-3 py-2 font-semibold text-zinc-900">Expired</th>
            <th className="px-3 py-2 font-semibold text-zinc-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((j) => (
            <tr key={j._id} className="border-t border-zinc-200">
              <td className="px-3 py-2">
                <Link className="font-semibold text-zinc-900 hover:underline" href={`/jobs/${j.slug}`} target="_blank">
                  {j.title}
                </Link>
                <div className="text-xs text-zinc-600">{j.department} • {j.qualification}</div>
              </td>
              <td className="px-3 py-2 text-zinc-700">{j.type}</td>
              <td className="px-3 py-2 text-zinc-700">{j.state}</td>
              <td className="px-3 py-2 text-zinc-700">{j.isExpired ? "Yes" : "No"}</td>
              <td className="px-3 py-2">
                <div className="flex flex-wrap gap-2">
                  <Link
                    className="inline-flex h-9 items-center border border-zinc-300 bg-white px-3 font-semibold text-zinc-900"
                    href={`/admin/jobs/${j._id}/edit`}
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteJob(j._id)}
                    disabled={deletingId === j._id}
                    className="inline-flex h-9 items-center border border-red-300 bg-white px-3 font-semibold text-red-700 disabled:opacity-60"
                  >
                    {deletingId === j._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
