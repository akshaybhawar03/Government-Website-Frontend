import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { JobForm } from "@/components/admin/JobForm";
import { requireAdminSession } from "@/lib/requireAdmin";
import { fetchBackendServerJson } from "@/lib/backendServerFetch";

export const metadata: Metadata = {
  title: "Edit",
  robots: { index: false, follow: false },
};

function toYmd(d?: Date | null) {
  if (!d) return "";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "";
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default async function AdminJobEditPage({ params }: { params: { id: string } }) {
  await requireAdminSession();

  const data = await fetchBackendServerJson<{ item: any }>(`/api/admin/jobs/${encodeURIComponent(params.id)}`).catch(() => null);
  const j: any = data?.item;
  if (!j) notFound();

  return (
    <AdminShell>
      <p className="text-lg font-bold text-zinc-900">Edit</p>
      <p className="mt-1 text-sm text-zinc-700">Update details. Keep official links correct.</p>

      <div className="mt-4">
        <JobForm
          mode="edit"
          id={String(j._id)}
          initial={{
            type: j.type,
            title: j.title,
            department: j.department,
            state: j.state,
            qualification: j.qualification,
            eligibility: j.eligibility,
            ageLimit: j.ageLimit,
            vacancies: j.vacancies,
            salary: j.salary,
            fees: j.fees,
            startDate: toYmd(j.startDate),
            lastDate: toYmd(j.lastDate),
            selectionProcess: j.selectionProcess,
            applyLink: j.applyLink,
            notificationPDF: j.notificationPDF,
            sourceName: j.source?.name,
            sourceUrl: j.source?.url,
            isExpired: Boolean(j.isExpired),
          }}
        />
      </div>
    </AdminShell>
  );
}
