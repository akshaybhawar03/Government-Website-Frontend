import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { FlashMessage } from "@/components/FlashMessage";
import { UserLoginForm } from "@/components/UserLoginForm";

export const metadata: Metadata = {
  title: "Login",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return (
    <div>
      <PageTitle title="Login" subtitle="Sign in to access personalized updates." />
      <Container>
        <div className="mt-6 max-w-md md:mx-auto">
          <div className="mb-3">
            <Suspense fallback={null}>
              <FlashMessage />
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <UserLoginForm />
          </Suspense>
          <div className="mt-3 text-sm text-slate-700">
            New here?{" "}
            <Link className="font-bold text-slate-900 hover:underline" href="/register">
              Create an account
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
