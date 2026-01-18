import Link from "next/link";
import type { ReactNode } from "react";

type JobCardProps = {
  title: string;
  slug: string;
  department: string;
  state: string;
  qualification?: string;
  lastDate?: string | null;
  salary?: string | null;
};

function BriefcaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 7V6C9 4.9 9.9 4 11 4H13C14.1 4 15 4.9 15 6V7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M4 7H20V20H4V7Z" stroke="currentColor" strokeWidth="2" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function Row({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-600">
      <span className="text-slate-400">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}

export function JobCard({ title, slug, department, state, qualification, lastDate, salary }: JobCardProps) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
            <BriefcaseIcon />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-900/5">
                {department}
              </span>
              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
                Latest Opportunity
              </span>
            </div>

            <Link
              href={`/jobs/${slug}`}
              className="mt-2 block text-base font-extrabold leading-snug tracking-tight text-slate-900 hover:underline"
            >
              {title}
            </Link>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Row
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 21C16 18 19 15.2 19 11.5C19 7.9 16.3 5 12 5C7.7 5 5 7.9 5 11.5C5 15.2 8 18 12 21Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 13C13.1 13 14 12.1 14 11C14 9.9 13.1 9 12 9C10.9 9 10 9.9 10 11C10 12.1 10.9 13 12 13Z"
                      fill="currentColor"
                    />
                  </svg>
                }
                label={state.trim() ? state : "India"}
              />
              <Row
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 2H17V6H7V2Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M5 8H19V22H5V8Z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                }
                label={salary && salary.trim() ? salary : "Salary: As per rules"}
              />
              {lastDate ? (
                <Row
                  icon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M17 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M4 8H20" stroke="currentColor" strokeWidth="2" />
                      <path d="M5 5H19V21H5V5Z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  }
                  label={`Deadline: ${lastDate}`}
                />
              ) : null}
              {qualification && qualification.trim() ? (
                <Row
                  icon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3L2 8L12 13L22 8L12 3Z" stroke="currentColor" strokeWidth="2" />
                      <path d="M5 10V16C5 17.1 6 18.1 7.2 18.6C9.3 19.5 12 20 12 20C12 20 14.7 19.5 16.8 18.6C18 18.1 19 17.1 19 16V10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  }
                  label={qualification}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        <Link
          href={`/jobs/${slug}`}
          className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-orange-500 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}
