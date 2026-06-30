import type { ReactNode } from "react";
import postsData from "@/app/content/posts.json";
import projectsData from "@/app/content/projects.json";
import researchData from "@/app/content/research.json";
import siteData from "@/app/content/site.json";

// ── Social links ──────────────────────────────────────────────────────────────
// Icons live in code (they carry SVG); everything editable lives in app/content/*.json.
export type Social = { label: string; href: string; icon: ReactNode };

export const socials: Social[] = [
  {
    label: "GitHub",
    href: "https://github.com/abinaelsl",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abinaelsl24/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@abinaelsl",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/abinaelsl",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Abinael-Lumempouw",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
        <path d="M19.586 0H4.414A4.414 4.414 0 0 0 0 4.414v15.172A4.414 4.414 0 0 0 4.414 24h15.172A4.414 4.414 0 0 0 24 19.586V4.414A4.414 4.414 0 0 0 19.586 0zM9.748 16.27H7.894V9.255h1.854v7.016zm-.927-7.977a1.074 1.074 0 1 1 0-2.147 1.074 1.074 0 0 1 0 2.147zm8.43 7.977h-1.698l-1.915-3.186-1.913 3.186H10.03l2.684-4.012-2.428-3.004h1.699l1.657 2.768 1.656-2.768h1.7l-2.428 3.004 2.686 4.012z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@abinaelsl",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:abinaelad@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export const EMAIL = "abinaelad@gmail.com";

// ── Site ────────────────────────────────────────────────────────────────────────
export type Site = {
  avatar: string;
};

export const site: Site = siteData as Site;

export const avatarPath = site.avatar;

// ── Research ────────────────────────────────────────────────────────────────────
export type Paper = {
  title: string;
  authors: string;
  venue: string;
  href: string;
  tags: string[];
};

export const research: Paper[] = researchData as Paper[];

// ── Projects ──────────────────────────────────────────────────────────────────
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

export const projects: Project[] = projectsData as Project[];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

// ── Content channels ────────────────────────────────────────────────────────────
export type Channel = {
  platform: string;
  handle: string;
  href: string;
  description: string;
  light: string;
  dark: string;
};

export const channels: Channel[] = [
  {
    platform: "YouTube",
    handle: "@abinaelsl",
    href: "https://www.youtube.com/@abinaelsl",
    description: "Videos on tech, startups, and student life in Japan.",
    light: "bg-red-50 text-red-600 border-red-100 hover:border-red-300 hover:bg-red-100",
    dark: "dark:bg-red-950/40 dark:text-red-400 dark:border-red-900 dark:hover:border-red-700",
  },
  {
    platform: "Instagram",
    handle: "@abinaelsl",
    href: "https://instagram.com/abinaelsl",
    description: "Photos and reels from Japan and everyday life.",
    light: "bg-pink-50 text-pink-600 border-pink-100 hover:border-pink-300 hover:bg-pink-100",
    dark: "dark:bg-pink-950/40 dark:text-pink-400 dark:border-pink-900 dark:hover:border-pink-700",
  },
  {
    platform: "TikTok",
    handle: "@abinaelsl",
    href: "https://www.tiktok.com/@abinaelsl",
    description: "Short-form content on productivity and Japan life.",
    light: "bg-gray-50 text-gray-800 border-gray-200 hover:border-gray-400 hover:bg-gray-100",
    dark: "dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:border-gray-500",
  },
];

// ── Writing ─────────────────────────────────────────────────────────────────────
// Post bodies are Markdown strings — edit them in the content studio, no code needed.
export type Post = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  summary: string;
  body: string;
};

export const posts: Post[] = postsData as Post[];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
