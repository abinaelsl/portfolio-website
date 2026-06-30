import type { ContentType } from "./types";

export const HERMES_API_VERSION = "1";

export const contentSchemas = {
  projects: {
    label: "Projects",
    file: "projects.json",
    idField: "slug",
    mediaDirectory: "projects",
    description: "Portfolio project case studies shown on the home page and /projects/[slug].",
    fields: {
      slug: "URL slug (unique identifier)",
      name: "Project name",
      tagline: "One-line tagline",
      description: "Short card description for the home page",
      href: "Live URL or external link",
      image: "Optional cover image path, e.g. /projects/screenshot.png",
      year: "Year or date range",
      role: "Your role on the project",
      status: "Current status",
      tags: "Array of tag strings",
      stack: "Array of technology strings",
      overview: "Longer intro paragraph on the detail page",
      highlights: "Array of { label, detail } objects",
    },
  },
  posts: {
    label: "Writing",
    file: "posts.json",
    idField: "slug",
    mediaDirectory: "writing",
    description: "Blog posts shown on /writing and /writing/[slug]. Body is Markdown.",
    fields: {
      slug: "URL slug (unique identifier)",
      title: "Post title",
      date: "ISO date (yyyy-mm-dd)",
      summary: "Short summary for the index page",
      body: "Markdown body. Embed images with ![alt](/writing/file.png)",
    },
  },
  research: {
    label: "Research",
    file: "research.json",
    idField: "index",
    mediaDirectory: "research",
    description: "Research papers shown in the home page research section.",
    fields: {
      title: "Paper title",
      authors: "Author list",
      venue: "Venue or degree program",
      href: "Link to paper (external URL or hosted file like /research/paper.pdf)",
      tags: "Array of tag strings",
    },
  },
} as const satisfies Record<
  ContentType,
  {
    label: string;
    file: string;
    idField: string;
    mediaDirectory: string;
    description: string;
    fields: Record<string, string>;
  }
>;

export const mediaRules = {
  projects: {
    directory: "projects",
    accept: "image/*",
    usage: "Set the project `image` field to the returned path for cover screenshots.",
  },
  writing: {
    directory: "writing",
    accept: "image/*",
    usage: "Embed in post `body` as Markdown: ![description](/writing/filename.png)",
  },
  research: {
    directory: "research",
    accept: "image/*,.pdf",
    usage: "Set the research entry `href` to the returned path to host a PDF or image.",
  },
} as const;

export function getHermesCapabilities() {
  const githubConfigured = Boolean(
    process.env.GITHUB_TOKEN?.trim() && process.env.GITHUB_REPO?.trim(),
  );

  return {
    version: HERMES_API_VERSION,
    persistence: githubConfigured ? "github" : "local-filesystem",
    autoDeploy: Boolean(process.env.VERCEL_DEPLOY_HOOK_URL?.trim()),
    contentTypes: contentSchemas,
    media: mediaRules,
    auth: {
      methods: ["Authorization: Bearer <HERMES_API_KEY>", "x-api-key: <HERMES_API_KEY>"],
    },
    endpoints: [
      { method: "GET", path: "/api/hermes", description: "API discovery and schema" },
      { method: "GET", path: "/api/hermes/content/{type}", description: "List all items" },
      { method: "PUT", path: "/api/hermes/content/{type}", description: "Replace entire collection" },
      { method: "POST", path: "/api/hermes/content/{type}", description: "Add a new item" },
      {
        method: "GET",
        path: "/api/hermes/content/{type}/{id}",
        description: "Get one item (slug for projects/posts, index for research)",
      },
      {
        method: "PATCH",
        path: "/api/hermes/content/{type}/{id}",
        description: "Partially update one item",
      },
      {
        method: "DELETE",
        path: "/api/hermes/content/{type}/{id}",
        description: "Delete one item",
      },
      {
        method: "POST",
        path: "/api/hermes/media",
        description: "Upload an image or PDF to public/projects|writing|research",
      },
    ],
  };
}
