import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { getStateCounts } from "@/lib/jobQueries";

export const metadata: Metadata = {
  title: "State Wise Jobs",
  alternates: { canonical: "/state-wise-jobs" },
};

export default async function StateWiseJobsPage() {
  const rows = await getStateCounts("job");

  return (
    <div>
      <PageTitle title="State Wise Jobs" subtitle="Browse latest job notifications by state." />

      <Container>
        <div className="mt-4 overflow-hidden border border-zinc-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 text-left">
                <th className="px-3 py-2 font-semibold text-zinc-900">State</th>
                <th className="px-3 py-2 font-semibold text-zinc-900">Jobs</th>
                <th className="px-3 py-2 font-semibold text-zinc-900">Open</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r: { state: string; count: number }) => (
                <tr key={r.state} className="border-t border-zinc-200">
                  <td className="px-3 py-2 text-zinc-900">{r.state || "Other"}</td>
                  <td className="px-3 py-2 text-zinc-700">{r.count}</td>
                  <td className="px-3 py-2">
                    <Link className="font-semibold text-zinc-900 hover:underline" href={`/latest-jobs?state=${encodeURIComponent(r.state)}`}>
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
