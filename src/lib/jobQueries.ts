import { env } from "@/lib/env";

export type JobType = "job" | "result" | "admit-card";

export type JobSearchParams = {
  q?: string;
  state?: string;
  qualification?: string;
  department?: string;
  type?: JobType;
  page?: number;
  limit?: number;
  includeExpired?: boolean;
};

async function fetchJson(path: string) {
  const url = new URL(path, env.BACKEND_URL);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

export async function getLatestJobs(opts?: { limit?: number; type?: JobType }) {
  const limit = Math.min(Math.max(opts?.limit ?? 20, 1), 50);
  const type = opts?.type ?? "job";

  const data = await fetchJson(`/api/jobs/latest?limit=${encodeURIComponent(String(limit))}&type=${encodeURIComponent(type)}`);
  return data.items;
}

export async function getJobBySlug(slug: string) {
  const data = await fetchJson(`/api/jobs/slug/${encodeURIComponent(slug)}`);
  return data.item;
}

export async function searchJobs(params: JobSearchParams) {
  const q = params.q ? `&q=${encodeURIComponent(params.q)}` : "";
  const state = params.state ? `&state=${encodeURIComponent(params.state)}` : "";
  const qualification = params.qualification ? `&qualification=${encodeURIComponent(params.qualification)}` : "";
  const department = params.department ? `&department=${encodeURIComponent(params.department)}` : "";
  const type = params.type ? `&type=${encodeURIComponent(params.type)}` : "";
  const page = `&page=${encodeURIComponent(String(params.page ?? 1))}`;
  const limit = `&limit=${encodeURIComponent(String(params.limit ?? 20))}`;
  const includeExpired = params.includeExpired ? "&includeExpired=1" : "";

  return fetchJson(`/api/jobs?x=1${type}${q}${state}${qualification}${department}${includeExpired}${page}${limit}`);
}

export async function getStateCounts(type: JobType = "job") {
  const data = await fetchJson(`/api/jobs/counts/state?type=${encodeURIComponent(type)}`);
  return data.rows;
}

export async function getQualificationCounts(type: JobType = "job") {
  const data = await fetchJson(`/api/jobs/counts/qualification?type=${encodeURIComponent(type)}`);
  return data.rows;
}

export async function getDepartmentCounts(type: JobType = "job") {
  const data = await fetchJson(`/api/jobs/counts/department?type=${encodeURIComponent(type)}`);
  return data.rows;
}
