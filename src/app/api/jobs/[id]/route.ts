import { proxyToBackend } from "@/lib/proxyToBackend";

export async function DELETE(req: Request) {
  return proxyToBackend(req);
}
