import { Container } from "@/components/Container";

export function StatsBand({
  eyebrow,
  title,
  stats,
}: {
  eyebrow: string;
  title: string;
  stats: Array<{ value: string; label: string }>;
}) {
  return (
    <section className="py-16">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-900/5">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white p-8 md:p-10">
              <div className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-extrabold tracking-wide text-orange-700 ring-1 ring-orange-200">
                {eyebrow}
              </div>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl">
                {title}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
                Verified listings with official apply links. Save time, stay updated, and prepare confidently.
              </p>
            </div>

            <div className="bg-orange-50/60 p-8 md:p-10">
              <div className="grid gap-8 sm:grid-cols-3">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-extrabold tracking-tight text-orange-600 md:text-4xl">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs font-semibold tracking-wide text-slate-700">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
