import postsData from "@/app/content/posts.json";
import projectsData from "@/app/content/projects.json";
import researchData from "@/app/content/research.json";
import {
  contentFilePath,
  isContentType,
  type ContentItem,
  type ContentType,
  type Post,
  type Project,
  type ResearchPaper,
} from "./types";
import { isGitHubPersistenceEnabled, readGitHubFile, triggerDeployHook, writeGitHubFile } from "./github";
import { readLocalFile, writeLocalFile } from "./local";

const bundledContent: Record<ContentType, ContentItem[]> = {
  projects: projectsData as Project[],
  posts: postsData as Post[],
  research: researchData as ResearchPaper[],
};

function cleanCollection(type: ContentType, items: ContentItem[]): ContentItem[] {
  return items.map((item) => {
    const out = JSON.parse(JSON.stringify(item)) as ContentItem;

    if (type === "projects") {
      const project = out as Project;
      project.tags = (project.tags || []).filter(Boolean);
      project.stack = (project.stack || []).filter(Boolean);
      project.highlights = (project.highlights || []).filter((h) => h.label || h.detail);
    }

    if (type === "posts") {
      const post = out as Post;
      post.summary = post.summary || "";
      post.body = post.body || "";
    }

    if (type === "research") {
      const paper = out as ResearchPaper;
      paper.tags = (paper.tags || []).filter(Boolean);
    }

    return out;
  });
}

async function readRawCollection(type: ContentType): Promise<{ items: ContentItem[]; sha?: string }> {
  const filePath = contentFilePath(type);

  if (isGitHubPersistenceEnabled()) {
    const { content, sha } = await readGitHubFile(filePath);
    if (!content) {
      return { items: bundledContent[type], sha };
    }
    return { items: JSON.parse(content) as ContentItem[], sha };
  }

  try {
    const content = await readLocalFile(filePath);
    return { items: JSON.parse(content) as ContentItem[] };
  } catch {
    return { items: bundledContent[type] };
  }
}

async function writeRawCollection(
  type: ContentType,
  items: ContentItem[],
  sha?: string,
  commitMessage?: string,
): Promise<void> {
  const filePath = contentFilePath(type);
  const payload = `${JSON.stringify(cleanCollection(type, items), null, 2)}\n`;
  const message = commitMessage || `chore(hermes): update ${type}`;

  if (isGitHubPersistenceEnabled()) {
    await writeGitHubFile(filePath, payload, message, sha);
    await triggerDeployHook();
    return;
  }

  await writeLocalFile(filePath, payload);
}

export async function listContent(type: ContentType): Promise<ContentItem[]> {
  const { items } = await readRawCollection(type);
  return items;
}

export async function replaceContent(
  type: ContentType,
  items: ContentItem[],
  commitMessage?: string,
): Promise<ContentItem[]> {
  if (!Array.isArray(items)) {
    throw new Error("Expected an array of content items.");
  }

  const { sha } = await readRawCollection(type);
  const cleaned = cleanCollection(type, items);
  await writeRawCollection(type, cleaned, sha, commitMessage);
  return cleaned;
}

function getItemId(type: ContentType, item: ContentItem, index: number): string {
  if (type === "research") return String(index);
  return (item as Project | Post).slug;
}

export async function getContentItem(
  type: ContentType,
  id: string,
): Promise<{ item: ContentItem; index: number } | null> {
  const items = await listContent(type);

  if (type === "research") {
    const index = Number(id);
    if (!Number.isInteger(index) || index < 0 || index >= items.length) return null;
    return { item: items[index], index };
  }

  const index = items.findIndex((item) => (item as Project | Post).slug === id);
  if (index === -1) return null;
  return { item: items[index], index };
}

export async function createContentItem(
  type: ContentType,
  item: ContentItem,
  commitMessage?: string,
): Promise<ContentItem> {
  const { items, sha } = await readRawCollection(type);
  const next = [...items, item];

  if (type !== "research") {
    const slug = (item as Project | Post).slug;
    if (!slug) throw new Error("slug is required.");
    if (items.some((existing) => (existing as Project | Post).slug === slug)) {
      throw new Error(`An item with slug "${slug}" already exists.`);
    }
  }

  const cleaned = cleanCollection(type, next);
  await writeRawCollection(type, cleaned, sha, commitMessage);
  return item;
}

export async function updateContentItem(
  type: ContentType,
  id: string,
  patch: Partial<ContentItem>,
  commitMessage?: string,
): Promise<ContentItem> {
  const found = await getContentItem(type, id);
  if (!found) throw new Error(`Item "${id}" not found in ${type}.`);

  const { items, sha } = await readRawCollection(type);
  const current = { ...found.item, ...patch } as ContentItem;

  if (type !== "research") {
    const slug = (current as Project | Post).slug;
    if (!slug) throw new Error("slug is required.");
    const duplicate = items.findIndex(
      (item, index) => index !== found.index && (item as Project | Post).slug === slug,
    );
    if (duplicate !== -1) {
      throw new Error(`Another item already uses slug "${slug}".`);
    }
  }

  const next = [...items];
  next[found.index] = current;
  const cleaned = cleanCollection(type, next);
  await writeRawCollection(type, cleaned, sha, commitMessage);
  return current;
}

export async function deleteContentItem(
  type: ContentType,
  id: string,
  commitMessage?: string,
): Promise<ContentItem> {
  const found = await getContentItem(type, id);
  if (!found) throw new Error(`Item "${id}" not found in ${type}.`);

  const { items, sha } = await readRawCollection(type);
  const next = items.filter((_, index) => index !== found.index);
  const cleaned = cleanCollection(type, next);
  await writeRawCollection(type, cleaned, sha, commitMessage);
  return found.item;
}

export function summarizeCollection(type: ContentType, items: ContentItem[]) {
  return items.map((item, index) => ({
    id: getItemId(type, item, index),
    ...(type === "projects"
      ? {
          slug: (item as Project).slug,
          name: (item as Project).name,
          image: (item as Project).image || "",
        }
      : {}),
    ...(type === "posts"
      ? {
          slug: (item as Post).slug,
          title: (item as Post).title,
          date: (item as Post).date,
        }
      : {}),
    ...(type === "research"
      ? {
          index,
          title: (item as ResearchPaper).title,
          href: (item as ResearchPaper).href,
        }
      : {}),
  }));
}

export function parseContentType(value: string): ContentType | null {
  return isContentType(value) ? value : null;
}
