"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/Container";
import { AuthActions } from "@/components/AuthActions";

export function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Exams", href: "/#exams" },
    { label: "Vacancies", href: "/#vacancies" },
    { label: "Study Materials", href: "/#study-materials" },
    { label: "Application Guide", href: "/#application-guide" },
    { label: "FAQs", href: "/#faqs" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L3 6.5V12.5C3 17.2 6.8 21.2 12 22C17.2 21.2 21 17.2 21 12.5V6.5L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M8.5 12L11 14.5L16 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <div className="leading-tight">
                <div className="text-sm font-extrabold tracking-tight text-slate-900 sm:text-base">
                  Indian Govt Jobs
                </div>
                <div className="hidden text-[11px] text-slate-500 sm:block">
                  Not a government website. Uses official sources.
                </div>
              </div>
            </Link>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-slate-900">
                {item.label}
              </Link>
            ))}
          </nav>

          <AuthActions variant="desktop" />

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {open ? (
          <div className="pb-4 md:hidden">
            <div className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-1 rounded-xl bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600">
                This is not a government website. Always verify details on the official notification and official apply
                link.
              </div>

              <div className="pt-1">
                <AuthActions variant="mobile" onNavigate={() => setOpen(false)} />
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
