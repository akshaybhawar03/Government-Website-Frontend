import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Disclaimer",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div>
      <PageTitle title="Disclaimer" subtitle="Please read carefully before using the website." />
      <Container>
        <div className="mt-4 border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-800">
          <p className="font-semibold text-zinc-900">Disclaimer</p>
          <p className="mt-2">
            This is not a government website. Information is collected from official sources.
          </p>
          <p className="mt-3">
            We try to keep information accurate and up to date, however we do not guarantee completeness or correctness.
            Users must verify all details (eligibility, dates, fees, selection process, etc.) on the official
            notification and official website before applying.
          </p>
          <p className="mt-3">
            All trademarks and names belong to their respective owners. We do not use any government logos.
          </p>
        </div>
      </Container>
    </div>
  );
}
