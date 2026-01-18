import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Saved Jobs",
  alternates: { canonical: "/saved-jobs" },
};

export default function SavedJobsPage() {
  return (
    <div>
      <PageTitle title="Saved Jobs" subtitle="Quick access to jobs you want to revisit." />
      <Container>
        <div className="mt-4 border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-800">
          <p className="font-semibold text-zinc-900">Coming soon</p>
          <p className="mt-2">
            Saved Jobs will let you keep a shortlist of notifications you are interested in. This feature is under
            development.
          </p>
          <p className="mt-3">
            For now, you can bookmark job detail pages in your browser.
          </p>
          <p className="mt-3">
            Browse: <Link href="/latest-jobs" className="font-semibold text-slate-900 underline">
              Latest Jobs
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
