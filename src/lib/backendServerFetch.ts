import { cookies } from "next/headers";
import { env } from "@/lib/env";

function buildCookieHeader(list: Array<{ name: string; value: string }>) {
  return list.map((c) => `${c.name}=${c.value}`).join("; ");
}

export async function fetchBackendServer(path: string, init?: RequestInit) {
  const cookieStore = await cookies();
  const cookieHeader = buildCookieHeader(cookieStore.getAll());

  const url = new URL(path, env.BACKEND_URL);
  const headers = new Headers(init?.headers);

  if (cookieHeader) headers.set("cookie", cookieHeader);

  return fetch(url, {
    ...init,
    headers,
    cache: init?.cache ?? "no-store",
  });
}

export async function fetchBackendServerJson<T = any>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetchBackendServer(path, init);
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error("Backend request failed");
  return data as T;
}
