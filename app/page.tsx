"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import avatar from "@/public/avatar.jpg";
import { research, projects, channels, posts, formatDate } from "@/app/lib/data";
import { safeHref } from "@/app/lib/safe-href";
import { Reveal, Stagger, StaggerItem } from "@/app/lib/motion";
import { SiteNav } from "@/app/components/site-nav";
import { SocialRow } from "@/app/components/social-row";
import { CopyEmail } from "@/app/components/copy-email";
import {
  Barcode,
  Brackets,
  CrossMark,
  Label,
  OrbitRings,
} from "@/app/components/orbital";

const spring = { type: "spring" as const, stiffness: 300, damping: 26 };

// HUD section header — crosshair + tracked label + extending rule + index.
function SectionLabel({ children, index }: { children: React.ReactNode; index: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <CrossMark className="text-accent" />
      <h2 className="label text-accent shrink-0">{children}</h2>
      <span aria-hidden className="h-px flex-1 bg-line" />
      <span className="label text-faint shrink-0">{index}</span>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      {/* Lunar backdrop, faded into the page */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image src="/orbital/moon-surface.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-[0.16] dark:opacity-[0.22]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/60 to-bg" />
      </div>
      <div aria-hidden className="hud-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.3]" />

      <div className="max-w-3xl mx-auto px-6 pt-12 pb-14">
        {/* Status strip */}
        <div className="mb-8 flex items-center justify-between">
          <Label dot>Portfolio · @abinaelsl</Label>
          <span className="label text-faint hidden sm:inline">33.59°N / 130.21°E</span>
        </div>

        <Stagger className="flex flex-col sm:flex-row sm:items-center gap-7">
          <StaggerItem className="shrink-0">
            <div className="relative w-28 h-28">
              <div className="w-28 h-28 rounded-lg overflow-hidden border border-line-strong">
                <Image
                  src={avatar}
                  alt="Abinael Sarungallo Lumempouw"
                  placeholder="blur"
                  priority
                  sizes="112px"
                  className="object-cover w-full h-full grayscale-[0.2] contrast-[1.05]"
                />
              </div>
              <Brackets inset={-4} size={10} className="text-accent/60" />
            </div>
          </StaggerItem>

          <div className="flex-1 min-w-0">
            <StaggerItem>
              <p className="label text-muted">福岡 / Fukuoka, Japan</p>
            </StaggerItem>
            <StaggerItem>
              <h1 className="mt-3 font-display text-5xl sm:text-6xl uppercase tracking-tight leading-[0.92] text-ink">
                Abinael<br className="hidden sm:block" /> Sarungallo<br className="hidden sm:block" /> Lumempouw
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
                Student at{" "}
                <span className="text-ink font-medium">Kyushu University</span>{" "}
                · Founder of{" "}
                <span className="text-accent font-medium">StatusMaxx</span>{" "}
                · Researching{" "}
                <span className="text-ink font-medium">net-zero buildings</span>.
              </p>
            </StaggerItem>
            <StaggerItem>
              <SocialRow className="mt-5 flex items-center gap-3.5" />
            </StaggerItem>
          </div>
        </Stagger>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="max-w-3xl mx-auto px-6 py-12 border-t border-line">
      <Reveal>
        <SectionLabel index="01 / About">About</SectionLabel>
        <p className="text-muted leading-relaxed text-base">
          Currently a 4th-year undergraduate at Kyushu University, where my research focuses on
          sustainable building design and energy-efficient systems. Specifically, I investigate
          pathways to net-zero carbon emissions in residential buildings, with an emphasis on
          mass-market deployment through affordable housing typologies. I am supervised by{" "}
          <span className="text-ink font-medium">Professor Hazarika Hemanta</span>{" "}
          and{" "}
          <span className="text-ink font-medium">Professor Hironobu Kan</span>,
          and am a member of the{" "}
          <span className="text-ink font-medium">Geodisaster Prevention Lab</span>{" "}
          in the Faculty of Civil Engineering.
        </p>
        <p className="mt-4 text-muted leading-relaxed text-base">
          Outside academia, I founded{" "}
          <span className="text-accent font-medium">StatusMaxx</span> — a
          fintech app that helps users find the best membership card to use at any given merchant,
          with proximity-based promo discovery built in. We&apos;re on a roadmap to launch in July
          2026. I also create content on YouTube, Instagram, and TikTok covering life in Japan, tech,
          startups, university life, and personal finance.
        </p>
      </Reveal>
    </section>
  );
}

// ── Research ────────────────────────────────────────────────────────────────────
function Research() {
  return (
    <section id="research" className="max-w-3xl mx-auto px-6 py-12 border-t border-line">
      <Reveal>
        <SectionLabel index="02 / Research">Research</SectionLabel>
      </Reveal>
      <div className="space-y-6">
        {research.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <a
              href={safeHref(p.href)}
              target="_blank"
              rel="noopener noreferrer"
              className="group block pl-4 border-l-2 border-line
                         hover:border-accent transition-colors duration-200
                         rounded-r-md focus-visible:outline-none"
            >
              <p className="font-medium text-ink group-hover:text-accent transition-colors leading-snug">
                {p.title}
              </p>
              <p className="mt-1 text-sm text-muted">{p.authors}</p>
              <p className="font-mono text-xs text-faint mt-0.5">{p.venue}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="font-mono text-[11px] px-2 py-0.5 rounded border border-accent/30 text-accent">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Projects ────────────────────────────────────────────────────────────────────
function Projects() {
  const reduce = useReducedMotion();
  return (
    <section id="projects" className="max-w-3xl mx-auto px-6 py-12 border-t border-line">
      <Reveal>
        <SectionLabel index="03 / Projects">Projects</SectionLabel>
      </Reveal>
      <div className="space-y-5">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <motion.div
              whileHover={reduce ? undefined : { y: -3 }}
              transition={spring}
              className="group relative rounded-[var(--radius-panel)] border border-line bg-surface/60 backdrop-blur-sm p-5
                         hover:border-line-strong transition-colors duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <Link href={`/projects/${p.slug}`} className="rounded-md focus-visible:outline-none">
                    <h3 className="font-heading font-bold uppercase tracking-wide text-lg text-ink group-hover:text-accent transition-colors">
                      {p.name}
                    </h3>
                  </Link>
                  <p className="label text-accent mt-1">{p.tagline}</p>
                </div>
                {p.href !== "#" && (
                  <a
                    href={safeHref(p.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label shrink-0 inline-flex items-center gap-1
                               text-accent border border-accent/40 rounded px-3 py-1.5
                               hover:bg-accent-soft transition-colors duration-200
                               focus-visible:outline-none"
                  >
                    Visit
                    <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </a>
                )}
              </div>
              <p className="mt-3 text-sm text-muted leading-relaxed">{p.description}</p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="font-mono text-[11px] px-2 py-0.5 rounded border border-line text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projects/${p.slug}`}
                  className="label shrink-0 inline-flex items-center gap-1
                             text-muted hover:text-accent transition-colors
                             rounded-md focus-visible:outline-none"
                >
                  Case study
                  <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Writing ─────────────────────────────────────────────────────────────────────
function Writing() {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return (
    <section id="writing" className="max-w-3xl mx-auto px-6 py-12 border-t border-line">
      <Reveal>
        <div className="flex items-center justify-between gap-3 mb-6">
          <CrossMark className="text-accent" />
          <h2 className="label text-accent shrink-0">Writing</h2>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <Link
            href="/writing"
            className="label shrink-0 inline-flex items-center gap-1 text-faint
                       hover:text-accent transition-colors group
                       rounded-md focus-visible:outline-none"
          >
            All
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </Reveal>
      <div className="divide-y divide-line border-y border-line">
        {latest.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.06}>
            <Link
              href={`/writing/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3.5
                         focus-visible:outline-none rounded-md"
            >
              <time className="font-mono text-xs text-faint shrink-0 sm:w-24 tabular-nums">
                {formatDate(post.date)}
              </time>
              <span className="font-medium text-ink group-hover:text-accent transition-colors">
                {post.title}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Content ─────────────────────────────────────────────────────────────────────
function Content() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 border-t border-line">
      <Reveal>
        <SectionLabel index="04 / Channels">Content</SectionLabel>
      </Reveal>
      <div className="grid sm:grid-cols-3 gap-4">
        {channels.map((c, i) => (
          <Reveal key={c.platform} delay={i * 0.06}>
            <a
              href={safeHref(c.href)}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-[var(--radius-panel)] border border-line bg-surface/60 backdrop-blur-sm p-4 h-full
                         hover:-translate-y-0.5 hover:border-line-strong
                         transition-[transform,border-color] duration-200
                         focus-visible:outline-none"
            >
              <p className="font-heading font-bold uppercase tracking-wide text-ink group-hover:text-accent transition-colors">{c.platform}</p>
              <p className="font-mono text-xs mt-0.5 text-faint">{c.handle}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">{c.description}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Footer / Contact ──────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contact" className="border-t border-line mt-auto relative overflow-hidden">
      <Reveal>
        <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="font-heading font-bold uppercase tracking-wide text-ink">
              Abinael Sarungallo Lumempouw
            </p>
            <div className="mt-1.5 text-sm">
              <CopyEmail />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <OrbitRings className="h-10 w-10" />
            <SocialRow className="flex items-center gap-4" />
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-6 pb-8 flex items-end justify-between gap-4">
          <p className="label text-faint">
            © {new Date().getFullYear()} Abinael Sarungallo Lumempouw · All rights reserved · @abinaelsl
          </p>
          <Barcode seed="ABINAEL-SL-2026" height={22} className="w-28 text-ink/60" />
        </div>
      </Reveal>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <About />
        <Research />
        <Projects />
        <Writing />
        <Content />
      </main>
      <Footer />
    </>
  );
}
