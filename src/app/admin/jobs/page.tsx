import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { JobsTable } from "@/components/admin/JobsTable";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { requireAdminSession } from "@/lib/requireAdmin";
import { fetchBackendServerJson } from "@/lib/backendServerFetch";

export const metadata: Metadata = {
  title: "Manage Jobs",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin/jobs" },
};

export default async function AdminJobsPage() {
  await requireAdminSession();

  const data = await fetchBackendServerJson<{ items: any[] }>("/api/admin/jobs").catch(() => ({ items: [] }));
  const items = Array.isArray(data.items) ? data.items : [];

  return (
    <AdminShell>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-bold text-zinc-900">Jobs / Results / Admit Cards</p>
          <p className="text-xs text-zinc-600">Showing latest 200 entries</p>
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

      <div className="mt-4">
        <JobsTable
          items={items.map((j: any) => ({
            _id: String(j._id),
            title: String(j.title),
            slug: String(j.slug),
            type: j.type,
            department: String(j.department),
            state: String(j.state),
            qualification: String(j.qualification),
            isExpired: Boolean(j.isExpired),
            createdAt: j.createdAt ? String(j.createdAt) : undefined,
          }))}
        />
      </div>
    </AdminShell>
  );
}
