import { proxyToBackend } from "@/lib/proxyToBackend";

export async function POST(req: Request) {
  return proxyToBackend(req);
}
