import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Job Alerts",
  alternates: { canonical: "/job-alerts" },
};

export default function JobAlertsPage() {
  return (
    <div>
      <PageTitle title="Job Alerts" subtitle="Get notified when new jobs are added." />
      <Container>
        <div className="mt-4 border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-800">
          <p className="font-semibold text-zinc-900">Coming soon</p>
          <p className="mt-2">
            Job Alerts will help you track new notifications by category (State, Qualification, Department, etc.).
          </p>
          <p className="mt-3 text-xs text-zinc-600">
            We will add email/WhatsApp alerts later. No sign-up is required today.
          </p>
        </div>
      </Container>
    </div>
  );
}
