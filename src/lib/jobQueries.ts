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
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export async function getLatestJobs(opts?: { limit?: number; type?: JobType }) {
  const limit = Math.min(Math.max(opts?.limit ?? 20, 1), 50);
  const type = opts?.type ?? "job";

  try {
    const data = await fetchJson(
      `/api/jobs/latest?limit=${encodeURIComponent(String(limit))}&type=${encodeURIComponent(type)}`
    );
    return Array.isArray(data?.items) ? data.items : [];
  } catch {
    return [];
  }
}

export async function getJobBySlug(slug: string) {
  try {
    const data = await fetchJson(`/api/jobs/slug/${encodeURIComponent(slug)}`);
    return data?.item ?? null;
  } catch {
    return null;
  }
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

  try {
    const data = await fetchJson(
      `/api/jobs?x=1${type}${q}${state}${qualification}${department}${includeExpired}${page}${limit}`
    );
    return {
      items: Array.isArray(data?.items) ? data.items : [],
      page: typeof data?.page === "number" ? data.page : Number(params.page ?? 1) || 1,
      totalPages: typeof data?.totalPages === "number" ? data.totalPages : 1,
      total: typeof data?.total === "number" ? data.total : 0,
    };
  } catch {
    return {
      items: [],
      page: Number(params.page ?? 1) || 1,
      totalPages: 1,
      total: 0,
    };
  }
}

export async function getStateCounts(type: JobType = "job") {
  try {
    const data = await fetchJson(`/api/jobs/counts/state?type=${encodeURIComponent(type)}`);
    return Array.isArray(data?.rows) ? data.rows : [];
  } catch {
    return [];
  }
}

export async function getQualificationCounts(type: JobType = "job") {
  try {
    const data = await fetchJson(`/api/jobs/counts/qualification?type=${encodeURIComponent(type)}`);
    return Array.isArray(data?.rows) ? data.rows : [];
  } catch {
    return [];
  }
}

export async function getDepartmentCounts(type: JobType = "job") {
  try {
    const data = await fetchJson(`/api/jobs/counts/department?type=${encodeURIComponent(type)}`);
    return Array.isArray(data?.rows) ? data.rows : [];
  } catch {
    return [];
  }
}
