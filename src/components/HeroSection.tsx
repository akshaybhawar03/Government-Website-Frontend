import Link from "next/link";
import { Container } from "@/components/Container";

export function HeroSection({
  headline,
  subheading,
  ctaPrimary,
  ctaSecondary,
  stats,
}: {
  headline: string;
  subheading: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  stats: Array<{ value: string; label: string }>;
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: "url(/hero-bg.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-linear-to-b from-black/45 via-black/45 to-black/65" />

      <Container>
        <div className="relative grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              {headline}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/85 md:text-base">
              {subheading}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={ctaPrimary.href}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-orange-500 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
              >
                {ctaPrimary.label}
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link
                href={ctaSecondary.href}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                {ctaSecondary.label}
              </Link>
            </div>

            <p className="mt-6 max-w-xl text-xs leading-5 text-white/70">
              This is not a government website. We link only to official sources. Always verify details on the official
              notification and official apply link.
            </p>
          </div>

          <div className="grid gap-3 md:justify-items-end">
            {stats.map((s) => (
              <div
                key={s.label}
                className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur shadow-sm"
              >
                <div className="text-3xl font-extrabold tracking-tight text-white">{s.value}</div>
                <div className="mt-1 text-xs font-semibold tracking-wide text-white/75">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
