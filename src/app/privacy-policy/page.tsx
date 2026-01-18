import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageTitle title="Privacy Policy" subtitle="How this website handles data." />
      <Container>
        <div className="mt-4 border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-800">
          <p className="font-semibold text-zinc-900">Privacy Policy</p>
          <p className="mt-2">
            This website is designed to provide links to official government notifications. We do not ask for sensitive
            personal information to browse job listings.
          </p>
          <p className="mt-3">
            Server logs may record basic request information for security and performance monitoring. If you contact us
            via email, your email address and message will be used only to respond.
          </p>
          <p className="mt-3">
            Always use official websites for applications and payments. Do not share passwords or OTPs with anyone.
          </p>
        </div>
      </Container>
    </div>
  );
}
