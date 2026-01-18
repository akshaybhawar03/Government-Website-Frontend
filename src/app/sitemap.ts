import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

  let jobs: any[] = [];
  try {
    const url = new URL("/api/jobs?type=job&includeExpired=0&page=1&limit=1000", env.BACKEND_URL);
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json().catch(() => ({ items: [] }));
    jobs = Array.isArray(data.items) ? data.items : [];
  } catch {
    jobs = [];
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/latest-jobs`, lastModified: new Date() },
    { url: `${base}/state-wise-jobs`, lastModified: new Date() },
    { url: `${base}/qualification-wise-jobs`, lastModified: new Date() },
    { url: `${base}/results`, lastModified: new Date() },
    { url: `${base}/admit-cards`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
    { url: `${base}/disclaimer`, lastModified: new Date() },
    { url: `${base}/privacy-policy`, lastModified: new Date() },
  ];

  const jobRoutes: MetadataRoute.Sitemap = jobs.map((j: any) => ({
    url: `${base}/jobs/${String(j.slug)}`,
    lastModified: j.updatedAt ? new Date(j.updatedAt) : new Date(),
  }));

  return [...staticRoutes, ...jobRoutes];
}
