import { NextResponse } from "next/server";
import { requireHermesAuth } from "@/app/lib/hermes/auth";
import { getHermesCapabilities } from "@/app/lib/hermes/schema";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authError = requireHermesAuth(request);
  if (authError) return authError;

  return NextResponse.json({
    ok: true,
    site: "abinael.xyz portfolio CMS",
    ...getHermesCapabilities(),
  });
}
