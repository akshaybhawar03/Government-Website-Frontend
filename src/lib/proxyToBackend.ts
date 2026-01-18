import { env } from "@/lib/env";

function isBodyAllowed(method: string) {
  const m = method.toUpperCase();
  return m !== "GET" && m !== "HEAD";
}

export async function proxyToBackend(req: Request) {
  const incoming = new URL(req.url);
  const target = new URL(incoming.pathname + incoming.search, env.BACKEND_URL);

  const headers = new Headers(req.headers);
  // Remove hop-by-hop / connection-specific headers that can break the proxy call.
  headers.delete("host");
  headers.delete("connection");
  headers.delete("content-length");
  headers.delete("accept-encoding");

  const body = isBodyAllowed(req.method) ? await req.arrayBuffer() : undefined;

  let res: Response;
  try {
    res = await fetch(target, {
      method: req.method,
      headers,
      body,
      redirect: "manual",
    });
  } catch {
    return new Response(JSON.stringify({ error: "Backend unavailable" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }

  const outHeaders = new Headers(res.headers);
  return new Response(res.body, {
    status: res.status,
    headers: outHeaders,
  });
}
