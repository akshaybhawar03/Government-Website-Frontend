import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { JobCard } from "@/components/JobCard";
import { PageTitle } from "@/components/PageTitle";
import { Pagination } from "@/components/Pagination";
import { SearchFilters } from "@/components/SearchFilters";
import { searchJobs } from "@/lib/jobQueries";

export const metadata: Metadata = {
  title: "Admit Cards",
  alternates: { canonical: "/admit-cards" },
};

function getParam(searchParams: Record<string, string | string[] | undefined>, key: string) {
  const value = searchParams[key];
  if (Array.isArray(value)) return value[0];
  return value;
}

function formatDate(value?: Date | null) {
  if (!value) return null;
  try {
    return new Date(value).toLocaleDateString("en-IN");
  } catch {
    return null;
  }
}

export default async function AdmitCardsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const q = getParam(searchParams, "q");
  const state = getParam(searchParams, "state");
  const qualification = getParam(searchParams, "qualification");
  const department = getParam(searchParams, "department");
  const page = Number(getParam(searchParams, "page") ?? "1") || 1;

  const result = await searchJobs({ q, state, qualification, department, page, type: "admit-card" });

  return (
    <div>
      <PageTitle title="Admit Cards" subtitle="Official admit card updates (verify via official source links)." />

      <div className="py-4">
        <SearchFilters action="/admit-cards" q={q} state={state} qualification={qualification} department={department} />
      </div>

      <Container>
        <div className="grid gap-4 md:grid-cols-2">
          {result.items.map((job: any) => (
            <JobCard
              key={String(job._id)}
              title={String(job.title)}
              slug={String(job.slug)}
              department={String(job.department)}
              state={String(job.state)}
              qualification={String(job.qualification)}
              salary={job.salary ? String(job.salary) : null}
              lastDate={formatDate(job.lastDate)}
            />
          ))}
        </div>

        <Pagination
          basePath="/admit-cards"
          page={result.page}
          totalPages={result.totalPages}
          query={{ q, state, qualification, department }}
        />
      </Container>
    </div>
  );
}
