import { NextResponse } from "next/server";
import { requireHermesAuth } from "@/app/lib/hermes/auth";
import {
  createContentItem,
  listContent,
  parseContentType,
  replaceContent,
  summarizeCollection,
} from "@/app/lib/hermes/content";
import type { ContentItem } from "@/app/lib/hermes/types";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ type: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const authError = requireHermesAuth(request);
  if (authError) return authError;

  const { type } = await context.params;
  const contentType = parseContentType(type);
  if (!contentType) {
    return NextResponse.json({ error: `Unknown content type "${type}".` }, { status: 404 });
  }

  const items = await listContent(contentType);
  return NextResponse.json({
    type: contentType,
    count: items.length,
    items,
    summary: summarizeCollection(contentType, items),
  });
}

export async function PUT(request: Request, context: RouteContext) {
  const authError = requireHermesAuth(request);
  if (authError) return authError;

  const { type } = await context.params;
  const contentType = parseContentType(type);
  if (!contentType) {
    return NextResponse.json({ error: `Unknown content type "${type}".` }, { status: 404 });
  }

  let body: { items?: ContentItem[]; commitMessage?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!Array.isArray(body.items)) {
    return NextResponse.json({ error: "Body must include an `items` array." }, { status: 400 });
  }

  try {
    const { items, deploy } = await replaceContent(contentType, body.items, body.commitMessage);
    return NextResponse.json({
      ok: true,
      type: contentType,
      count: items.length,
      items,
      ...(deploy.warning ? { deploy } : {}),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to replace content." },
      { status: 400 },
    );
  }
}

export async function POST(request: Request, context: RouteContext) {
  const authError = requireHermesAuth(request);
  if (authError) return authError;

  const { type } = await context.params;
  const contentType = parseContentType(type);
  if (!contentType) {
    return NextResponse.json({ error: `Unknown content type "${type}".` }, { status: 404 });
  }

  let body: { item?: ContentItem; commitMessage?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.item || typeof body.item !== "object") {
    return NextResponse.json({ error: "Body must include an `item` object." }, { status: 400 });
  }

  try {
    const { item, deploy } = await createContentItem(contentType, body.item, body.commitMessage);
    return NextResponse.json(
      { ok: true, type: contentType, item, ...(deploy.warning ? { deploy } : {}) },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create item." },
      { status: 400 },
    );
  }
}
