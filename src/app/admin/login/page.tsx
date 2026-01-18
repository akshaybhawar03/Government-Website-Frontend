import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin/login" },
};

export default function AdminLoginPage() {
  return (
    <div>
      <PageTitle title="Admin Login" subtitle="Authorized access only." />
      <Container>
        <div className="mt-4 max-w-md">
          <LoginForm />
          <div className="mt-3 text-sm">
            <Link className="font-semibold text-zinc-900 hover:underline" href="/admin/setup">
              First-time setup
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
