import { NextResponse } from "next/server";
import { requireHermesAuth } from "@/app/lib/hermes/auth";
import { getContentItem, updateContentItem } from "@/app/lib/hermes/content";
import {
  saveMediaFile,
  uniqueFilename,
  validateMediaUpload,
} from "@/app/lib/hermes/media";
import type { MediaDirectory, Post } from "@/app/lib/hermes/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type JsonUploadBody = {
  directory: string;
  filename?: string;
  contentBase64: string;
  mimeType?: string;
  commitMessage?: string;
  attach?: {
    contentType: "projects" | "posts" | "research";
    id: string;
    field?: string;
    markdownAlt?: string;
  };
};

async function handleUpload(
  directory: MediaDirectory,
  originalName: string,
  bytes: Uint8Array,
  mimeType: string,
  commitMessage?: string,
  attach?: JsonUploadBody["attach"],
) {
  const validation = validateMediaUpload(directory, mimeType, bytes.byteLength);
  if ("error" in validation) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const filename = await uniqueFilename(directory, originalName);
  const saved = await saveMediaFile(directory, filename, bytes, commitMessage);

  const response: Record<string, unknown> = {
    ok: true,
    ...saved,
    markdown: `![${originalName.replace(/\.[^.]+$/, "")}](${saved.path})`,
  };

  if (attach) {
    if (attach.contentType === "projects") {
      const item = await updateContentItem(
        "projects",
        attach.id,
        { image: saved.path },
        commitMessage || `chore(hermes): set cover image for ${attach.id}`,
      );
      response.attached = { contentType: "projects", id: attach.id, field: "image", item };
    } else if (attach.contentType === "research") {
      const field = attach.field || "href";
      const item = await updateContentItem(
        "research",
        attach.id,
        { [field]: saved.path },
        commitMessage || `chore(hermes): attach research file for entry ${attach.id}`,
      );
      response.attached = { contentType: "research", id: attach.id, field, item };
    } else if (attach.contentType === "posts") {
      const found = await getContentItem("posts", attach.id);
      if (!found) {
        return NextResponse.json({ error: `Post "${attach.id}" not found.` }, { status: 404 });
      }
      const alt = attach.markdownAlt || originalName.replace(/\.[^.]+$/, "");
      const post = found.item as Post;
      const embed = `\n\n![${alt}](${saved.path})\n\n`;
      const item = await updateContentItem(
        "posts",
        attach.id,
        { body: `${post.body || ""}${embed}` },
        commitMessage || `chore(hermes): embed image in post ${attach.id}`,
      );
      response.attached = { contentType: "posts", id: attach.id, field: "body", item };
    }
  }

  return NextResponse.json(response, { status: 201 });
}

export async function POST(request: Request) {
  const authError = requireHermesAuth(request);
  if (authError) return authError;

  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const directory = String(form.get("directory") || "");
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "multipart body must include a `file` field." }, { status: 400 });
    }

    const attachRaw = form.get("attach");
    let attach: JsonUploadBody["attach"];
    if (typeof attachRaw === "string" && attachRaw.trim()) {
      try {
        attach = JSON.parse(attachRaw);
      } catch {
        return NextResponse.json({ error: "Invalid JSON in `attach` field." }, { status: 400 });
      }
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    return handleUpload(
      directory as MediaDirectory,
      file.name,
      bytes,
      file.type || "application/octet-stream",
      String(form.get("commitMessage") || ""),
      attach,
    );
  }

  let body: JsonUploadBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.directory || !body.contentBase64) {
    return NextResponse.json(
      { error: "JSON body must include `directory` and `contentBase64`." },
      { status: 400 },
    );
  }

  const bytes = Uint8Array.from(Buffer.from(body.contentBase64, "base64"));
  const originalName = body.filename || `upload-${Date.now()}`;
  const mimeType = body.mimeType || "application/octet-stream";

  return handleUpload(
    body.directory as MediaDirectory,
    originalName,
    bytes,
    mimeType,
    body.commitMessage,
    body.attach,
  );
}
