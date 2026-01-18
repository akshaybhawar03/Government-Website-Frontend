import { proxyToBackend } from "@/lib/proxyToBackend";

export async function GET(req: Request) {
  return proxyToBackend(req);
}

export async function PUT(req: Request) {
  return proxyToBackend(req);
}

export async function DELETE(req: Request) {
  return proxyToBackend(req);
}
