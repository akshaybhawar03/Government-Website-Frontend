import { proxyToBackend } from "@/lib/proxyToBackend";

export async function GET(req: Request) {
  return proxyToBackend(req);
}
