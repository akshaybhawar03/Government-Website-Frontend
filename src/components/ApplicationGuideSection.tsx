import { Container } from "@/components/Container";

function StepIcon({ n }: { n: number }) {
  return (
    <div className="relative">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-orange-500 text-sm font-extrabold text-white shadow-sm">
        {n}
      </div>
      <div className="absolute -inset-2 -z-10 rounded-full bg-orange-500/15" />
    </div>
  );
}

export function ApplicationGuideSection() {
  const steps = [
    {
      title: "Check Eligibility",
      body: "Read the notification carefully and confirm age limit, qualification and category requirements.",
    },
    {
      title: "Prepare Documents",
      body: "Keep photo, signature, ID proof and certificates ready as per the official guidelines.",
    },
    {
      title: "Register on Official Portal",
      body: "Create an account using your email/mobile and verify via OTP when required.",
    },
    {
      title: "Fill Application Form",
      body: "Enter details accurately, upload documents, pay fees (if any) and submit before the deadline.",
    },
  ];

  return (
    <section id="application-guide" className="py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-sm ring-1 ring-slate-900/10">
            <div className="relative h-80">
              <div className="absolute inset-0 bg-linear-to-br from-white/10 via-white/5 to-transparent" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="rounded-3xl bg-white/10 px-6 py-4 text-center text-white ring-1 ring-white/15 backdrop-blur">
                  <div className="text-sm font-bold tracking-wide text-white/80">APPLICATION GUIDE</div>
                  <div className="mt-1 text-2xl font-extrabold tracking-tight">Step-by-step process</div>
                  <div className="mt-2 text-xs text-white/75">Always apply through official portals</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-extrabold tracking-wide text-orange-700 ring-1 ring-orange-200">
              APPLICATION GUIDE
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Apply confidently with a clear checklist
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
              A quick workflow to avoid mistakes. Cross-check the official notification for exact instructions.
            </p>

            <div className="mt-8 grid gap-6">
              {steps.map((s, idx) => (
                <div key={s.title} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <StepIcon n={idx + 1} />
                    {idx !== steps.length - 1 ? (
                      <div className="mt-3 h-full w-px bg-slate-200" aria-hidden="true" />
                    ) : null}
                  </div>
                  <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
                    <div className="text-sm font-extrabold text-slate-900">{s.title}</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600">{s.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
