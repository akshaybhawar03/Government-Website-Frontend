import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div>
      <PageTitle title="About" subtitle="What this portal is and how information is sourced." />
      <Container>
        <div className="mt-4 border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-800">
          <p className="font-semibold text-zinc-900">Indian Government Jobs Portal</p>
          <p className="mt-2">
            This portal helps you discover Indian government job notifications, results, and admit cards in one place.
            We publish only public information and link to official sources for verification and applications.
          </p>
          <p className="mt-3">
            We do not represent any government department and we do not use government logos. Always verify the latest
            updates on the official website before taking any action.
          </p>
        </div>
      </Container>
    </div>
  );
}
