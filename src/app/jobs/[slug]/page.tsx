import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { KeyValueTable } from "@/components/KeyValueTable";
import { PageTitle } from "@/components/PageTitle";
import { getJobBySlug } from "@/lib/jobQueries";

function formatDate(value?: Date | null) {
  if (!value) return null;
  try {
    return new Date(value).toLocaleDateString("en-IN");
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return {
      title: "Job Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = String((job as any).title);
  const department = String((job as any).department);
  const state = String((job as any).state);

  return {
    title,
    description: `${title} - ${department} (${state}). Check eligibility, dates and apply via official link.`,
    alternates: { canonical: `/jobs/${slug}` },
  };
}

export default async function JobDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const job = await getJobBySlug(slug);

  if (!job) notFound();

  const j = job as any;

  const rows = [
    { label: "Job Title", value: String(j.title ?? "") },
    { label: "Department", value: String(j.department ?? "") },
    { label: "State", value: String(j.state ?? "") },
    { label: "Qualification", value: String(j.qualification ?? "") },
    { label: "Eligibility", value: j.eligibility ? String(j.eligibility) : null },
    { label: "Age Limit", value: j.ageLimit ? String(j.ageLimit) : null },
    { label: "Vacancies", value: j.vacancies ? String(j.vacancies) : null },
    { label: "Salary", value: j.salary ? String(j.salary) : null },
    { label: "Application Fee", value: j.fees ? String(j.fees) : null },
    { label: "Start Date", value: formatDate(j.startDate) },
    { label: "Last Date", value: formatDate(j.lastDate) },
    { label: "Selection Process", value: j.selectionProcess ? String(j.selectionProcess) : null },
    { label: "Official Source", value: j.source?.url ? String(j.source.url) : null },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: String(j.title ?? ""),
    hiringOrganization: {
      "@type": "Organization",
      name: String(j.department ?? ""),
    },
    employmentType: "FULL_TIME",
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressRegion: String(j.state ?? ""),
        addressCountry: "IN",
      },
    },
    validThrough: j.lastDate ? new Date(j.lastDate).toISOString() : undefined,
    url: j.applyLink ? String(j.applyLink) : undefined,
  };

  return (
    <div>
      <PageTitle title={String(j.title)} subtitle="Verify details on official sources before applying." />

      <Container>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <KeyValueTable rows={rows} />

            <div className="mt-6 rounded-2xl bg-white p-5 text-sm text-slate-700 shadow-sm ring-1 ring-slate-900/5">
              <p className="text-sm font-extrabold text-slate-900">Important Notice</p>
              <p className="mt-2 leading-6">
                This is not a government website. Information is collected from official sources. Always confirm the
                latest details from the official notification and official apply link.
              </p>
            </div>
          </div>

          <aside className="md:sticky md:top-24">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
              <p className="text-sm font-extrabold text-slate-900">Quick Links</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Use only official links. Avoid third-party forms or unofficial portals.
              </p>

              <div className="mt-4 flex flex-col gap-2">
                {j.applyLink ? (
                  <a
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-orange-500 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
                    href={String(j.applyLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply on Official Portal
                  </a>
                ) : (
                  <span className="inline-flex h-11 items-center justify-center rounded-xl bg-orange-200 px-4 text-sm font-bold text-white/80">
                    Apply Link Unavailable
                  </span>
                )}
              {j.notificationPDF ? (
                <a
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50"
                  href={String(j.notificationPDF)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Notification PDF
                </a>
              ) : null}
              {j.source?.url ? (
                <a
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50"
                  href={String(j.source.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official Source Page
                </a>
              ) : null}
              <Link
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50"
                href="/latest-jobs"
              >
                Back to Latest Jobs
              </Link>
            </div>

              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-xs leading-5 text-slate-600 ring-1 ring-slate-900/5">
                Always verify dates, fees, eligibility, and instructions on the official notification.
              </div>
            </div>
          </aside>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Container>
    </div>
  );
}
