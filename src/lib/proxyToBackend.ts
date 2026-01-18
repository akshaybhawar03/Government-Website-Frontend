import { env } from "@/lib/env";

function isBodyAllowed(method: string) {
  const m = method.toUpperCase();
  return m !== "GET" && m !== "HEAD";
}

export async function proxyToBackend(req: Request) {
  const incoming = new URL(req.url);
  const target = new URL(incoming.pathname + incoming.search, env.BACKEND_URL);

  const headers = new Headers(req.headers);

  const body = isBodyAllowed(req.method) ? await req.arrayBuffer() : undefined;

  const res = await fetch(target, {
    method: req.method,
    headers,
    body,
    redirect: "manual",
  });

  const outHeaders = new Headers(res.headers);
  return new Response(res.body, {
    status: res.status,
    headers: outHeaders,
  });
}
