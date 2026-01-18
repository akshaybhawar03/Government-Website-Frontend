import { NextResponse } from "next/server";
import { getTokenFromRequest, verifyAuthToken } from "@/lib/auth";

export function requireAdminApi(request: Request) {
  const token = getTokenFromRequest(request);
  if (!token) {
    return { ok: false as const, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  try {
    const payload = verifyAuthToken(token);
    if (payload.role !== "admin") {
      return { ok: false as const, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
    }
    return { ok: true as const, payload };
  } catch {
    return { ok: false as const, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
}
