import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { requireAdminSession } from "@/lib/requireAdmin";
import { fetchBackendServerJson } from "@/lib/backendServerFetch";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin" },
};

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();

  const stats = await fetchBackendServerJson<{ jobs: number; results: number; admitCards: number }>("/api/admin/stats").catch(
    () => ({ jobs: 0, results: 0, admitCards: 0 })
  );

  return (
    <AdminShell>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-zinc-700">Signed in as</p>
          <p className="text-base font-semibold text-zinc-900">{session.email}</p>
        </div>
        <div className="flex gap-2">
          <Link
            className="inline-flex h-10 items-center justify-center bg-zinc-900 px-4 text-sm font-semibold text-white"
            href="/admin/jobs/new"
          >
            Add New
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="border border-zinc-200 bg-white p-4">
          <p className="text-sm font-semibold text-zinc-900">Active Jobs</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">{stats.jobs}</p>
        </div>
        <div className="border border-zinc-200 bg-white p-4">
          <p className="text-sm font-semibold text-zinc-900">Active Results</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">{stats.results}</p>
        </div>
        <div className="border border-zinc-200 bg-white p-4">
          <p className="text-sm font-semibold text-zinc-900">Active Admit Cards</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">{stats.admitCards}</p>
        </div>
      </div>

      <div className="mt-6 border border-zinc-200 bg-white p-4 text-sm text-zinc-800">
        <p className="font-semibold text-zinc-900">Notes</p>
        <p className="mt-2 leading-6">
          Add only public information and official source links. This portal must clearly state it is not a government
          website.
        </p>
      </div>
    </AdminShell>
  );
}
