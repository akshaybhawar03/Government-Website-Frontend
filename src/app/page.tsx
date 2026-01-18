import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { CategoryPills } from "@/components/CategoryPills";
import { ExamsSection } from "@/components/ExamsSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { HeroSection } from "@/components/HeroSection";
import { JobCard } from "@/components/JobCard";
import { StatsBand } from "@/components/StatsBand";
import { StudyMaterialsSection } from "@/components/StudyMaterialsSection";
import { SearchFilters } from "@/components/SearchFilters";
import { ApplicationGuideSection } from "@/components/ApplicationGuideSection";
import { FlashMessage } from "@/components/FlashMessage";
import { getLatestJobs } from "@/lib/jobQueries";

function formatDate(value?: Date | null) {
  if (!value) return null;
  try {
    return new Date(value).toLocaleDateString("en-IN");
  } catch {
    return null;
  }
}

export default async function Home() {
  const latest = await getLatestJobs({ limit: 12, type: "job" });

  const faqs = [
    {
      question: "Is this an official government website?",
      answer:
        "No. This portal is not a government website. We collect information from official sources and provide links to the official notification/apply pages.",
    },
    {
      question: "Where should I apply for a vacancy?",
      answer:
        "Always apply only through the official apply link mentioned on the job detail page. Verify details on the official notification before submitting.",
    },
    {
      question: "How often are jobs updated?",
      answer:
        "Jobs are updated daily via automation. Timing can vary by source. If you see a mismatch, rely on the official website as the final authority.",
    },
    {
      question: "How do I find jobs by department or exam category?",
      answer:
        "Use the category pills (UPSC/SSC/Banking/Railway etc.) or use the Department filter in the search bar.",
    },
    {
      question: "Do you guarantee accuracy?",
      answer:
        "We do our best, but we do not guarantee accuracy. Always verify eligibility, dates, fees and instructions from the official notification.",
    },
  ];

  return (
    <div>
      <div className="pt-4">
        <Container>
          <Suspense fallback={null}>
            <FlashMessage />
          </Suspense>
        </Container>
      </div>
      <HeroSection
        headline="Your Gateway to Government Career Success"
        subheading="Access exam details, latest vacancies and free study materials — with official source links."
        ctaPrimary={{ label: "Explore Exams", href: "/#exams" }}
        ctaSecondary={{ label: "View Vacancies", href: "/#vacancies" }}
        stats={[
          { value: `${Math.max(latest.length, 1)}+`, label: "Active Vacancies" },
          { value: "156", label: "Upcoming Exams" },
          { value: "50K+", label: "Study Resources" },
        ]}
      />

      <Container>
        <ExamsSection />

        <section id="vacancies" className="py-16">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-extrabold tracking-wide text-orange-700 ring-1 ring-orange-200">
                LATEST OPPORTUNITIES
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                Current Government Vacancies
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Browse recent notifications and apply via official links only.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Suspense fallback={null}>
              <CategoryPills basePath="/latest-jobs" queryKey="department" />
            </Suspense>
          </div>

          <div className="mt-6">
            <SearchFilters action="/latest-jobs" />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {latest.map((job: any) => (
              <JobCard
                key={String(job._id)}
                title={String(job.title)}
                slug={String(job.slug)}
                department={String(job.department)}
                state={String(job.state)}
                qualification={job.qualification ? String(job.qualification) : undefined}
                salary={job.salary ? String(job.salary) : null}
                lastDate={formatDate(job.lastDate)}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"
              href="/latest-jobs"
            >
              View All Vacancies
            </Link>
            <Link
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50"
              href="/state-wise-jobs"
            >
              Browse by State
            </Link>
            <Link
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50"
              href="/qualification-wise-jobs"
            >
              Browse by Qualification
            </Link>
          </div>
        </section>
      </Container>

      <StatsBand
        eyebrow="PORTAL STATS"
        title="Trusted updates for candidates across India"
        stats={[
          { value: "2,847+", label: "Active Positions Available" },
          { value: "156+", label: "Departments Hiring" },
          { value: "45,000+", label: "Applications Processed" },
        ]}
      />

      <Container>
        <StudyMaterialsSection />
      </Container>

      <ApplicationGuideSection />

      <section id="faqs" className="py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">FAQs</h2>
            <p className="mt-2 text-sm text-slate-600">Quick answers to common questions</p>
          </div>

          <div className="mt-10">
            <FAQAccordion items={faqs} />
          </div>
        </Container>
      </section>
    </div>
  );
}
