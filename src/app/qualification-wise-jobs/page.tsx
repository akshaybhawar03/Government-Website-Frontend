import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { getQualificationCounts } from "@/lib/jobQueries";

export const metadata: Metadata = {
  title: "Qualification Wise Jobs",
  alternates: { canonical: "/qualification-wise-jobs" },
};

export default async function QualificationWiseJobsPage() {
  const rows = await getQualificationCounts("job");

  return (
    <div>
      <PageTitle title="Qualification Wise Jobs" subtitle="Browse latest job notifications by qualification." />

      <Container>
        <div className="mt-4 overflow-hidden border border-zinc-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 text-left">
                <th className="px-3 py-2 font-semibold text-zinc-900">Qualification</th>
                <th className="px-3 py-2 font-semibold text-zinc-900">Jobs</th>
                <th className="px-3 py-2 font-semibold text-zinc-900">Open</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r: { qualification: string; count: number }) => (
                <tr key={r.qualification} className="border-t border-zinc-200">
                  <td className="px-3 py-2 text-zinc-900">{r.qualification || "Other"}</td>
                  <td className="px-3 py-2 text-zinc-700">{r.count}</td>
                  <td className="px-3 py-2">
                    <Link
                      className="font-semibold text-zinc-900 hover:underline"
                      href={`/latest-jobs?qualification=${encodeURIComponent(r.qualification)}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}
