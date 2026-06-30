import { NextResponse } from "next/server";

export function getHermesApiKey(): string | undefined {
  return process.env.HERMES_API_KEY?.trim() || undefined;
}

export function extractApiKey(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (header?.startsWith("Bearer ")) {
    return header.slice("Bearer ".length).trim();
  }
  const apiKey = request.headers.get("x-api-key");
  return apiKey?.trim() || null;
}

export function requireHermesAuth(request: Request): NextResponse | null {
  const expected = getHermesApiKey();
  if (!expected) {
    return NextResponse.json(
      {
        error: "Hermes API is not configured",
        hint: "Set HERMES_API_KEY in the deployment environment.",
      },
      { status: 503 },
    );
  }

  const provided = extractApiKey(request);
  if (!provided || provided !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
