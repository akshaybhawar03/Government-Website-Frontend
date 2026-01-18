import Link from "next/link";
import { Container } from "@/components/Container";
import type { ReactNode } from "react";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="border-b border-zinc-200 bg-white">
        <Container>
          <div className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-bold text-zinc-900">Admin Panel</p>
              <p className="text-xs text-zinc-600">Manage jobs, results and admit cards</p>
            </div>
            <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link className="text-zinc-900 hover:underline" href="/admin">
                Dashboard
              </Link>
              <Link className="text-zinc-900 hover:underline" href="/admin/jobs">
                Jobs
              </Link>
              <Link className="text-zinc-900 hover:underline" href="/latest-jobs" target="_blank">
                View Site
              </Link>
            </nav>
          </div>
        </Container>
      </div>
      <Container>
        <div className="py-6">{children}</div>
      </Container>
    </div>
  );
}
