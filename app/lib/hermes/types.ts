export const CONTENT_TYPES = ["projects", "posts", "research"] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const MEDIA_DIRECTORIES = ["projects", "writing", "research"] as const;
export type MediaDirectory = (typeof MEDIA_DIRECTORIES)[number];

export type ProjectHighlight = { label: string; detail: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
  tags: string[];
  year: string;
  role: string;
  status: string;
  image?: string;
  overview: string;
  highlights: ProjectHighlight[];
  stack: string[];
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string;
};

export type ResearchPaper = {
  title: string;
  authors: string;
  venue: string;
  href: string;
  tags: string[];
};

export type ContentItem = Project | Post | ResearchPaper;

export function isContentType(value: string): value is ContentType {
  return (CONTENT_TYPES as readonly string[]).includes(value);
}

export function isMediaDirectory(value: string): value is MediaDirectory {
  return (MEDIA_DIRECTORIES as readonly string[]).includes(value);
}

export function contentFilePath(type: ContentType): string {
  return `app/content/${type === "posts" ? "posts" : type}.json`;
}

export function mediaPublicPath(directory: MediaDirectory, filename: string): string {
  return `/public/${directory}/${filename}`;
}

export function mediaSitePath(directory: MediaDirectory, filename: string): string {
  return `/${directory}/${filename}`;
}
