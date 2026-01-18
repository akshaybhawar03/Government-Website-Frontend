import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const email = env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <div>
      <PageTitle title="Contact" subtitle="Report an issue or request a correction." />
      <Container>
        <div className="mt-4 border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-800">
          <p className="font-semibold text-zinc-900">Contact</p>
          <p className="mt-2">
            If you find incorrect information, broken official links, or missing notifications, please contact the site
            administrator.
          </p>
          <p className="mt-3">
            Email: <span className="font-semibold">{email ?? "Not configured"}</span>
          </p>
          <p className="mt-3 text-xs text-zinc-600">
            Use an email address you control when deploying. Do not share passwords or sensitive personal information.
          </p>
        </div>
      </Container>
    </div>
  );
}
