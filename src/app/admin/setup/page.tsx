import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { SetupForm } from "@/components/admin/SetupForm";

export const metadata: Metadata = {
  title: "Admin Setup",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin/setup" },
};

export default function AdminSetupPage() {
  return (
    <div>
      <PageTitle title="Admin Setup" subtitle="Create the first admin (requires setup token)." />
      <Container>
        <div className="mt-4 max-w-md">
          <SetupForm />
        </div>
      </Container>
    </div>
  );
}
