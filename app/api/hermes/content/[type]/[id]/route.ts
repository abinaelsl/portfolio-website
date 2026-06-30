import { NextResponse } from "next/server";
import { requireHermesAuth } from "@/app/lib/hermes/auth";
import {
  deleteContentItem,
  getContentItem,
  parseContentType,
  updateContentItem,
} from "@/app/lib/hermes/content";
import type { ContentItem } from "@/app/lib/hermes/types";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ type: string; id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const authError = requireHermesAuth(request);
  if (authError) return authError;

  const { type, id } = await context.params;
  const contentType = parseContentType(type);
  if (!contentType) {
    return NextResponse.json({ error: `Unknown content type "${type}".` }, { status: 404 });
  }

  const found = await getContentItem(contentType, decodeURIComponent(id));
  if (!found) {
    return NextResponse.json({ error: `Item "${id}" not found.` }, { status: 404 });
  }

  return NextResponse.json({
    type: contentType,
    id: decodeURIComponent(id),
    index: found.index,
    item: found.item,
  });
}

export async function PATCH(request: Request, context: RouteContext) {
  const authError = requireHermesAuth(request);
  if (authError) return authError;

  const { type, id } = await context.params;
  const contentType = parseContentType(type);
  if (!contentType) {
    return NextResponse.json({ error: `Unknown content type "${type}".` }, { status: 404 });
  }

  let body: { patch?: Partial<ContentItem>; commitMessage?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.patch || typeof body.patch !== "object") {
    return NextResponse.json({ error: "Body must include a `patch` object." }, { status: 400 });
  }

  try {
    const item = await updateContentItem(
      contentType,
      decodeURIComponent(id),
      body.patch,
      body.commitMessage,
    );
    return NextResponse.json({ ok: true, type: contentType, id: decodeURIComponent(id), item });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update item.";
    const status = message.includes("not found") ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const authError = requireHermesAuth(request);
  if (authError) return authError;

  const { type, id } = await context.params;
  const contentType = parseContentType(type);
  if (!contentType) {
    return NextResponse.json({ error: `Unknown content type "${type}".` }, { status: 404 });
  }

  let commitMessage: string | undefined;
  try {
    const body = await request.json();
    commitMessage = body?.commitMessage;
  } catch {
    // no body is fine
  }

  try {
    const item = await deleteContentItem(contentType, decodeURIComponent(id), commitMessage);
    return NextResponse.json({ ok: true, type: contentType, id: decodeURIComponent(id), item });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete item.";
    const status = message.includes("not found") ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
