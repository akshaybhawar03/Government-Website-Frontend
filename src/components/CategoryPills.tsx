"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

export type CategoryPill = {
  label: string;
  value: string;
  icon?: ReactNode;
};

function pillIcon(type: string) {
  const common = "h-4 w-4";
  switch (type) {
    case "UPSC":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 6.5V12.5C3 17.2 6.8 21.2 12 22C17.2 21.2 21 17.2 21 12.5V6.5L12 2Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "SSC":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 2H17V6H7V2Z" stroke="currentColor" strokeWidth="2" />
          <path d="M5 8H19V22H5V8Z" stroke="currentColor" strokeWidth="2" />
          <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "Banking":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L2 8H22L12 3Z" stroke="currentColor" strokeWidth="2" />
          <path d="M4 10V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 10V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 10V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 10V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 10V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M3 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "Railway":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 3H17V15H7V3Z" stroke="currentColor" strokeWidth="2" />
          <path d="M7 11H17" stroke="currentColor" strokeWidth="2" />
          <path d="M9 19L7 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 19L17 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 19H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "Defence":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L20 7V12C20 17 16.5 20.7 12 21C7.5 20.7 4 17 4 12V7L12 3Z" stroke="currentColor" strokeWidth="2" />
          <path d="M12 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8.5 10.5H15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "Teaching":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20V16H4V6Z" stroke="currentColor" strokeWidth="2" />
          <path d="M8 20H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 16V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "Police":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L19 6V13C19 17.4 16 21 12 22C8 21 5 17.4 5 13V6L12 2Z" stroke="currentColor" strokeWidth="2" />
          <path d="M12 7L13.4 10.2L16.9 10.6L14.3 12.8L15.1 16.2L12 14.4L8.9 16.2L9.7 12.8L7.1 10.6L10.6 10.2L12 7Z" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export function CategoryPills({ basePath = "/latest-jobs", queryKey = "department" }: { basePath?: string; queryKey?: string }) {
  const pathname = usePathname();
  const search = useSearchParams();
  const active = search.get(queryKey) ?? "";

  const categories: CategoryPill[] = [
    { label: "UPSC", value: "UPSC" },
    { label: "SSC", value: "SSC" },
    { label: "Banking", value: "Banking" },
    { label: "Railway", value: "Railway" },
    { label: "Defence", value: "Defence" },
    { label: "Teaching", value: "Teaching" },
    { label: "Police", value: "Police" },
  ];

  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div className="flex w-max gap-3 pb-1">
        {categories.map((c) => {
          const isActive = pathname.startsWith(basePath) && active === c.value;
          const href = `${basePath}?${queryKey}=${encodeURIComponent(c.value)}`;
          return (
            <Link
              key={c.value}
              href={href}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? "border-orange-200 bg-orange-50 text-orange-700 shadow-sm"
                  : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className={`${isActive ? "text-orange-600" : "text-orange-500"}`}>{pillIcon(c.label)}</span>
              {c.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
