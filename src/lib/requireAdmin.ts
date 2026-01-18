import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";

export type AdminSession = {
  sub: string;
  name?: string;
  email: string;
  role: "admin";
};

export async function getAdminSession() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  if (!cookieHeader) return null;

  const url = new URL("/api/auth/me", env.BACKEND_URL);
  const res = await fetch(url, { headers: { cookie: cookieHeader }, cache: "no-store" }).catch(() => null);
  if (!res || !res.ok) return null;

  const data = (await res.json().catch(() => null)) as any;
  if (!data?.authenticated) return null;
  if (data?.user?.role !== "admin") return null;

  return data.user as AdminSession;
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session as AdminSession;
}
