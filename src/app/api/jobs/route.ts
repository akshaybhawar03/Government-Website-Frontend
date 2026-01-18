import { proxyToBackend } from "@/lib/proxyToBackend";

export async function GET(req: Request) {
  return proxyToBackend(req);
}

export async function POST(req: Request) {
  return proxyToBackend(req);
}
