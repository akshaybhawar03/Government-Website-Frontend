import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { JobForm } from "@/components/admin/JobForm";
import { requireAdminSession } from "@/lib/requireAdmin";

export const metadata: Metadata = {
  title: "Add New",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin/jobs/new" },
};

export default async function AdminJobNewPage() {
  await requireAdminSession();

  return (
    <AdminShell>
      <p className="text-lg font-bold text-zinc-900">Add New</p>
      <p className="mt-1 text-sm text-zinc-700">Add a job, result or admit card with official source links.</p>

      <div className="mt-4">
        <JobForm mode="create" />
      </div>
    </AdminShell>
  );
}
