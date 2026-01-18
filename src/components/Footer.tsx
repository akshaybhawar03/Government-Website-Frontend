"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="mt-16 bg-[#0b1e52] text-white">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L3 6.5V12.5C3 17.2 6.8 21.2 12 22C17.2 21.2 21 17.2 21 12.5V6.5L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M8.5 12L11 14.5L16 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <div>
                <div className="text-sm font-extrabold tracking-tight">Indian Govt Jobs</div>
                <div className="text-xs text-white/70">Premium exam + vacancy portal UI</div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/80">
              This is not a government website. Information is collected from official sources. Always verify details
              on the official notification and official apply link.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white/90 ring-1 ring-white/10 transition hover:bg-white/15"
                href="#"
                aria-label="Twitter"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 7.5C19.4 7.8 18.8 8 18.1 8.1C18.8 7.7 19.3 7 19.5 6.2C18.9 6.6 18.2 6.9 17.4 7.1C16.8 6.5 16 6 15 6C13.1 6 11.6 7.6 11.6 9.4C11.6 9.7 11.6 10 11.7 10.2C8.9 10 6.4 8.7 4.7 6.7C4.4 7.2 4.2 7.8 4.2 8.4C4.2 9.6 4.8 10.6 5.8 11.2C5.2 11.2 4.6 11 4.1 10.7V10.8C4.1 12.5 5.3 13.9 6.9 14.2C6.6 14.3 6.3 14.3 6 14.3C5.8 14.3 5.6 14.3 5.4 14.2C5.8 15.6 7.1 16.7 8.7 16.8C7.5 17.8 6 18.4 4.4 18.4C4.1 18.4 3.9 18.4 3.6 18.4C5.2 19.4 7 20 8.9 20C15 20 18.4 15 18.4 10.7V10.3C19.1 9.8 19.6 9.2 20 8.5"
                    fill="currentColor"
                    fillOpacity="0.9"
                  />
                </svg>
              </a>
              <a
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white/90 ring-1 ring-white/10 transition hover:bg-white/15"
                href="#"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 8.5V7C14 6.2 14.7 5.5 15.5 5.5H17V3H15.5C13.1 3 11 5.1 11 7.5V8.5H9V11H11V21H14V11H16.5L17 8.5H14Z"
                    fill="currentColor"
                    fillOpacity="0.9"
                  />
                </svg>
              </a>
              <a
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white/90 ring-1 ring-white/10 transition hover:bg-white/15"
                href="#"
                aria-label="YouTube"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21.6 8.2C21.4 7.4 20.8 6.8 20 6.6C18.7 6.2 12 6.2 12 6.2C12 6.2 5.3 6.2 4 6.6C3.2 6.8 2.6 7.4 2.4 8.2C2 9.5 2 12 2 12C2 12 2 14.5 2.4 15.8C2.6 16.6 3.2 17.2 4 17.4C5.3 17.8 12 17.8 12 17.8C12 17.8 18.7 17.8 20 17.4C20.8 17.2 21.4 16.6 21.6 15.8C22 14.5 22 12 22 12C22 12 22 9.5 21.6 8.2ZM10.5 14.5V9.5L15 12L10.5 14.5Z"
                    fill="currentColor"
                    fillOpacity="0.9"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold tracking-wide">Quick Links</p>
            <div className="mt-4 grid gap-2 text-sm text-white/80">
              <Link className="hover:text-white" href="/latest-jobs">
                Latest Jobs
              </Link>
              <Link className="hover:text-white" href="/state-wise-jobs">
                State Wise Jobs
              </Link>
              <Link className="hover:text-white" href="/qualification-wise-jobs">
                Qualification Wise Jobs
              </Link>
              <Link className="hover:text-white" href="/results">
                Results
              </Link>
              <Link className="hover:text-white" href="/admit-cards">
                Admit Cards
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold tracking-wide">Resources</p>
            <div className="mt-4 grid gap-2 text-sm text-white/80">
              <Link className="hover:text-white" href="/about">
                About
              </Link>
              <Link className="hover:text-white" href="/contact">
                Contact
              </Link>
              <Link className="hover:text-white" href="/disclaimer">
                Disclaimer
              </Link>
              <Link className="hover:text-white" href="/privacy-policy">
                Privacy Policy
              </Link>
              <Link className="hover:text-white" href="/admin/login">
                Admin
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold tracking-wide">Contact Info</p>
            <div className="mt-4 grid gap-3 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 8V18C21 19.1 20.1 20 19 20H5C3.9 20 3 19.1 3 18V8" stroke="currentColor" strokeWidth="2" />
                    <path d="M21 8L12 13L3 8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M3 6C3 4.9 3.9 4 5 4H19C20.1 4 21 4.9 21 6V8H3V6Z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
                <div>
                  <div className="font-semibold text-white">Email</div>
                  <div className="text-white/70">Use the Contact page for enquiries.</div>
                </div>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 text-xs leading-5 text-white/75 ring-1 ring-white/10">
                Disclaimer: This portal aggregates information for convenience and links to official sources.
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-xs text-white/70">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Indian Government Jobs Portal</p>
            <p>Made for candidates • Always verify on official websites</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
