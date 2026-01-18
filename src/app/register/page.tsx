import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { UserRegisterForm } from "@/components/UserRegisterForm";

export const metadata: Metadata = {
  title: "Register",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  return (
    <div>
      <PageTitle title="Create Account" subtitle="Register to save preferences and get updates." />
      <Container>
        <div className="mt-6 max-w-md md:mx-auto">
          <UserRegisterForm />
          <div className="mt-3 text-sm text-slate-700">
            Already have an account?{" "}
            <Link className="font-bold text-slate-900 hover:underline" href="/login">
              Login
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
