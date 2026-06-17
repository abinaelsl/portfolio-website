"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import avatar from "@/public/avatar.jpg";
import { research, projects, channels, posts, formatDate } from "@/app/lib/data";
import { Reveal, Stagger, StaggerItem } from "@/app/lib/motion";
import { SiteNav } from "@/app/components/site-nav";
import { SocialRow } from "@/app/components/social-row";
import { CopyEmail } from "@/app/components/copy-email";

const spring = { type: "spring" as const, stiffness: 300, damping: 26 };

// Quiet structural eyebrow used to title each section.
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span aria-hidden className="h-px w-6 bg-indigo-400/70 dark:bg-indigo-500/70" />
      <h2 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
        {children}
      </h2>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" className="relative max-w-3xl mx-auto px-6 pt-20 pb-16">
      {/* Subtle ambient glow — adds depth without leaving the minimal direction. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 -z-10"
        style={{
          background:
            "radial-gradient(55% 55% at 50% 0%, rgba(99,102,241,0.10), transparent 72%)",
        }}
      />
      <Stagger className="flex flex-col sm:flex-row sm:items-center gap-7">
        <StaggerItem className="shrink-0">
          <div
            className="w-28 h-28 rounded-2xl overflow-hidden
                       border border-gray-200 dark:border-gray-700
                       ring-4 ring-transparent hover:ring-indigo-200/70 dark:hover:ring-indigo-800/60
                       transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5"
          >
            <Image
              src={avatar}
              alt="Abinael Sarungallo Lumempouw"
              placeholder="blur"
              priority
              sizes="112px"
              className="object-cover w-full h-full"
            />
          </div>
        </StaggerItem>

        <div className="flex-1 min-w-0">
          <StaggerItem>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              福岡 / Fukuoka, Japan
            </p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-2 font-display text-4xl sm:text-[2.75rem] font-bold tracking-tight leading-[1.05] text-gray-900 dark:text-gray-100">
              Abinael Sarungallo
              <br className="hidden sm:block" /> Lumempouw
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Student at{" "}
              <span className="text-gray-900 dark:text-gray-100 font-medium">Kyushu University</span>{" "}
              · Founder of{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">StatusMaxx</span>{" "}
              · Researching{" "}
              <span className="text-gray-900 dark:text-gray-100 font-medium">net-zero buildings</span>.
            </p>
          </StaggerItem>
          <StaggerItem>
            <SocialRow className="mt-5 flex items-center gap-3.5" />
          </StaggerItem>
        </div>
      </Stagger>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section
      id="about"
      className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100 dark:border-gray-800"
    >
      <Reveal>
        <SectionLabel>About</SectionLabel>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
          Currently a 4th-year undergraduate at Kyushu University, where my research focuses on
          sustainable building design and energy-efficient systems. Specifically, I investigate
          pathways to net-zero carbon emissions in residential buildings, with an emphasis on
          mass-market deployment through affordable housing typologies. I am supervised by{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">Professor Hazarika Hemanta</span>{" "}
          and{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">Professor Hironobu Kan</span>,
          and am a member of the{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">Geodisaster Prevention Lab</span>{" "}
          in the Faculty of Civil Engineering.
        </p>
        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-base">
          Outside academia, I founded{" "}
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">StatusMaxx</span> — a
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
    <section
      id="research"
      className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100 dark:border-gray-800"
    >
      <Reveal>
        <SectionLabel>Research</SectionLabel>
      </Reveal>
      <div className="space-y-6">
        {research.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block pl-4 border-l-2 border-gray-200 dark:border-gray-700
                         hover:border-indigo-400 dark:hover:border-indigo-500
                         transition-colors duration-200
                         rounded-r-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
            >
              <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                {p.title}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{p.authors}</p>
              <p className="font-mono text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.venue}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] px-2 py-0.5 rounded-md
                               bg-indigo-50 dark:bg-indigo-950/60
                               text-indigo-600 dark:text-indigo-400"
                  >
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
    <section
      id="projects"
      className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100 dark:border-gray-800"
    >
      <Reveal>
        <SectionLabel>Projects</SectionLabel>
      </Reveal>
      <div className="space-y-5">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <motion.div
              whileHover={reduce ? undefined : { y: -3 }}
              transition={spring}
              className="group rounded-xl border border-gray-200 dark:border-gray-800 p-5
                         hover:border-indigo-300 dark:hover:border-indigo-600/80
                         hover:shadow-lg hover:shadow-indigo-500/5
                         transition-colors duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                  >
                    <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {p.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                    {p.tagline}
                  </p>
                </div>
                {p.href !== "#" && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 text-xs font-medium
                               text-indigo-600 dark:text-indigo-400
                               border border-indigo-200 dark:border-indigo-800 rounded-full px-3 py-1
                               hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:border-indigo-400
                               transition-colors duration-200
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                  >
                    Visit
                    <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                )}
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {p.description}
              </p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2 py-0.5 rounded-md
                                 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projects/${p.slug}`}
                  className="shrink-0 inline-flex items-center gap-1 text-xs font-medium
                             text-gray-500 dark:text-gray-400
                             hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors
                             rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
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
    <section
      id="writing"
      className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100 dark:border-gray-800"
    >
      <Reveal>
        <div className="flex items-center justify-between">
          <SectionLabel>Writing</SectionLabel>
          <Link
            href="/writing"
            className="mb-5 inline-flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400
                       hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group
                       rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
          >
            All writing
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </Reveal>
      <div className="divide-y divide-gray-100 dark:divide-gray-800/80 border-y border-gray-100 dark:border-gray-800/80">
        {latest.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.06}>
            <Link
              href={`/writing/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3.5
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 rounded-md"
            >
              <time className="font-mono text-xs text-gray-500 dark:text-gray-400 shrink-0 sm:w-24 tabular-nums">
                {formatDate(post.date)}
              </time>
              <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
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
    <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100 dark:border-gray-800">
      <Reveal>
        <SectionLabel>Content</SectionLabel>
      </Reveal>
      <div className="grid sm:grid-cols-3 gap-4">
        {channels.map((c, i) => (
          <Reveal key={c.platform} delay={i * 0.06}>
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`block rounded-xl border p-4 h-full
                          hover:-translate-y-0.5 hover:shadow-md
                          transition-[transform,box-shadow,border-color,background-color] duration-200
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50
                          ${c.light} ${c.dark}`}
            >
              <p className="font-semibold">{c.platform}</p>
              <p className="font-mono text-xs mt-0.5 opacity-70">{c.handle}</p>
              <p className="mt-2 text-sm opacity-80 leading-relaxed">{c.description}</p>
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
    <footer id="contact" className="border-t border-gray-100 dark:border-gray-800 mt-auto">
      <Reveal>
        <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="font-display font-semibold text-gray-900 dark:text-gray-100">
              Abinael Sarungallo Lumempouw
            </p>
            <div className="mt-1 text-sm">
              <CopyEmail />
            </div>
          </div>
          <SocialRow className="flex items-center gap-4" />
        </div>
        <div className="max-w-3xl mx-auto px-6 pb-7">
          <p className="font-mono text-xs text-gray-500 dark:text-gray-500 tabular-nums">
            © {new Date().getFullYear()} Abinael Sarungallo Lumempouw
          </p>
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
