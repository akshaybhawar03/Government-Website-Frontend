import Link from "next/link";

export function ExamsSection() {
  const cards = [
    {
      tag: "Staff Selection",
      title: "SSC CGL",
      meta: ["8582 Vacancies", "July 2025"],
      href: "/latest-jobs?department=SSC",
    },
    {
      tag: "Civil Services",
      title: "UPSC CSE",
      meta: ["Exam Calendar", "2025"],
      href: "/latest-jobs?department=UPSC",
    },
    {
      tag: "Banking Sector",
      title: "IBPS PO",
      meta: ["Recruitments", "2025"],
      href: "/latest-jobs?department=Banking",
    },
  ];

  return (
    <section id="exams" className="py-16">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">Popular Government Exams</h2>
        <p className="mt-2 text-sm text-slate-600">Comprehensive information for all major competitive examinations</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="h-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-900/5">
            <div className="h-56 bg-slate-900/10" />
            <div className="p-6">
              <p className="text-sm font-bold text-slate-900">Exam Roadmaps</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Explore top exam categories and find the latest notifications, eligibility and official apply links.
              </p>
              <Link
                href="/latest-jobs"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"
              >
                Explore Exams
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:col-span-2">
          {cards.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group flex items-center gap-5 rounded-3xl bg-sky-50/60 p-6 shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:bg-sky-50"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 2H17V6H7V2Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M5 8H19V22H5V8Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-900/5">
                  {c.tag}
                </div>
                <div className="mt-2 text-lg font-extrabold tracking-tight text-slate-900 group-hover:underline">
                  {c.title}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                  {c.meta.map((m) => (
                    <span key={m} className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-400" aria-hidden="true" />
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
