"use client";

import { useMemo, useState } from "react";

type MaterialType = "all" | "notes" | "papers" | "videos";

type Material = {
  title: string;
  type: Exclude<MaterialType, "all">;
  tag: string;
  size: string;
  downloads: number;
  href: string;
};

function formatDownloads(n: number) {
  return n.toLocaleString("en-IN");
}

export function StudyMaterialsSection() {
  const [active, setActive] = useState<MaterialType>("all");

  const items: Material[] = [
    {
      title: "UPSC Prelims Complete Notes 2025",
      type: "notes",
      tag: "General Studies",
      size: "12.5 MB",
      downloads: 15420,
      href: "/resources/upsc-prelims-complete-notes-2025.txt",
    },
    {
      title: "SSC CGL Previous Year Papers",
      type: "papers",
      tag: "Mathematics",
      size: "8.2 MB",
      downloads: 22350,
      href: "/resources/ssc-cgl-previous-year-papers.txt",
    },
    {
      title: "Banking Awareness Video Lectures",
      type: "videos",
      tag: "Banking",
      size: "450 MB",
      downloads: 18750,
      href: "/resources/banking-awareness-video-lectures.txt",
    },
  ];

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((i) => i.type === active);
  }, [active, items]);

  const pill = (key: MaterialType, label: string) => {
    const isActive = active === key;
    return (
      <button
        key={key}
        type="button"
        onClick={() => setActive(key)}
        className={`inline-flex h-10 items-center rounded-full border px-4 text-sm font-semibold transition-all ${
          isActive
            ? "border-orange-200 bg-orange-500 text-white shadow-sm"
            : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
        }`}
      >
        {label}
      </button>
    );
  };

  const badge = (type: Material["type"]) => {
    const map: Record<Material["type"], string> = {
      notes: "Notes",
      papers: "Previous Papers",
      videos: "Video Lectures",
    };
    return map[type];
  };

  return (
    <section id="study-materials" className="py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-wide text-orange-600">FREE RESOURCES</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            <span className="text-orange-600">Free</span> Study Materials
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Curated notes and practice material to help you prepare effectively. Always cross-check with official
            sources.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">{[
          pill("all", "All"),
          pill("notes", "Notes"),
          pill("papers", "Previous Papers"),
          pill("videos", "Video Lectures"),
        ]}</div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {filtered.map((m) => (
          <div
            key={m.title}
            className="group relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
              {badge(m.type)}
            </div>
            <div className="h-36 bg-linear-to-br from-slate-50 to-slate-100" />
            <div className="p-6">
              <h3 className="text-base font-bold text-slate-900">{m.title}</h3>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-600">
                <span className="rounded-full bg-sky-50 px-2 py-1 font-semibold text-sky-700">{m.tag}</span>
                <span className="text-slate-400">•</span>
                <span className="font-medium">{formatDownloads(m.downloads)} downloads</span>
                <span className="text-slate-400">•</span>
                <span className="font-medium">{m.size}</span>
              </div>
              <a
                href={m.href}
                download
                className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-50 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/5 transition hover:bg-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 21H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
