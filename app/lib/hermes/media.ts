import path from "node:path";
import {
  isMediaDirectory,
  mediaPublicPath,
  mediaSitePath,
  type MediaDirectory,
} from "./types";
import {
  getGitHubFileMeta,
  isGitHubPersistenceEnabled,
  triggerDeployHook,
  writeGitHubFile,
} from "./github";
import { writeLocalFile } from "./local";

const MAX_MEDIA_BYTES = 4 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const ALLOWED_RESEARCH_TYPES = new Set([...ALLOWED_IMAGE_TYPES, "application/pdf"]);

export function slugifyFilename(name: string): string {
  const ext = path.extname(name).toLowerCase();
  const base = path.basename(name, ext);
  const safeBase = base
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${safeBase || "file"}${ext}`;
}

export function validateMediaUpload(
  directory: string,
  mimeType: string,
  size: number,
): { directory: MediaDirectory } | { error: string } {
  if (!isMediaDirectory(directory)) {
    return {
      error: `Invalid directory "${directory}". Use one of: projects, writing, research.`,
    };
  }

  if (size > MAX_MEDIA_BYTES) {
    return { error: `File too large. Maximum size is ${MAX_MEDIA_BYTES} bytes.` };
  }

  const allowed =
    directory === "research" ? ALLOWED_RESEARCH_TYPES : ALLOWED_IMAGE_TYPES;

  if (!allowed.has(mimeType)) {
    return { error: `Unsupported file type "${mimeType}" for ${directory}.` };
  }

  return { directory };
}

export function decodeBase64Payload(input: string): Uint8Array {
  const cleaned = input.trim().replace(/^data:[^;]+;base64,/, "").replace(/\s/g, "");
  if (!cleaned) {
    throw new Error("contentBase64 is empty.");
  }

  const buffer = Buffer.from(cleaned, "base64");
  if (buffer.length === 0) {
    throw new Error("contentBase64 did not decode to any bytes.");
  }

  return Uint8Array.from(buffer);
}

async function fileExistsLocally(filePath: string): Promise<boolean> {
  try {
    const fs = await import("node:fs/promises");
    await fs.access(path.join(process.cwd(), filePath));
    return true;
  } catch {
    return false;
  }
}

export async function uniqueFilename(
  directory: MediaDirectory,
  originalName: string,
): Promise<string> {
  const ext = path.extname(originalName).toLowerCase();
  const base = slugifyFilename(originalName).replace(ext, "");
  let attempt = 0;

  while (attempt < 100) {
    const candidate = attempt === 0 ? `${base}${ext}` : `${base}-${attempt}${ext}`;
    const filePath = mediaPublicPath(directory, candidate);
    const exists = isGitHubPersistenceEnabled()
      ? (await getGitHubFileMeta(filePath)).exists
      : await fileExistsLocally(filePath);

    if (!exists) return candidate;
    attempt += 1;
  }

  throw new Error("Could not allocate a unique filename.");
}

export async function saveMediaFile(
  directory: MediaDirectory,
  filename: string,
  bytes: Uint8Array,
  commitMessage?: string,
): Promise<{ path: string; filename: string; directory: MediaDirectory; deploy: Awaited<ReturnType<typeof triggerDeployHook>> }> {
  const filePath = mediaPublicPath(directory, filename);
  const message = commitMessage || `chore(hermes): add media ${directory}/${filename}`;

  if (isGitHubPersistenceEnabled()) {
    const existing = await getGitHubFileMeta(filePath);
    await writeGitHubFile(filePath, bytes, message, existing.sha);
  } else {
    await writeLocalFile(filePath, bytes);
  }

  const deploy = isGitHubPersistenceEnabled() ? await triggerDeployHook() : { triggered: false };

  return {
    directory,
    filename,
    path: mediaSitePath(directory, filename),
    deploy,
  };
}
