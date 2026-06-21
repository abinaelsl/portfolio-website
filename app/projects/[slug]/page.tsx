import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/app/lib/data";
import { SubHeader } from "@/app/components/sub-header";
import { PageFooter } from "@/app/components/page-footer";
import { Brackets } from "@/app/components/orbital";
import { Reveal } from "@/app/lib/motion";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: `${project.name} · Abinael S.L.`,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const hasNext = next && next.slug !== slug;

  return (
    <>
      <SubHeader backHref="/#projects" backLabel="Projects" />
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 pt-16 pb-20">
          <Reveal>
            <p className="label text-accent">
              {project.role} · {project.year}
            </p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl uppercase tracking-tight text-ink">
              {project.name}
            </h1>
            <p className="mt-3 text-lg text-muted leading-relaxed">
              {project.tagline}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.href !== "#" && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-md px-4 py-2 font-heading text-xs font-bold uppercase tracking-[0.12em]
                             bg-accent text-bg hover:opacity-90
                             transition-all duration-200 active:scale-[0.98]
                             focus-visible:outline-none"
                >
                  Visit live
                  <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              )}
              <span className="font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded border border-line text-muted">
                {project.status}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-10 text-lg text-ink/85 leading-relaxed">
              {project.overview}
            </p>
          </Reveal>

          {project.image && (
            <Reveal delay={0.08}>
              <figure className="relative mt-10 overflow-hidden rounded-[var(--radius-panel)] border border-line">
                <Image
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  width={1600}
                  height={948}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="w-full h-auto"
                />
                <Brackets className="text-accent/50" />
              </figure>
            </Reveal>
          )}

          <div className="mt-10 border-t border-line pt-8 space-y-7">
            {project.highlights.map((h) => (
              <Reveal key={h.label}>
                <div className="grid sm:grid-cols-[150px_1fr] gap-1.5 sm:gap-6">
                  <p className="label text-accent pt-0.5">
                    {h.label}
                  </p>
                  <p className="text-ink/85 leading-relaxed">{h.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 border-t border-line pt-8">
              <p className="label text-faint mb-3">Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[11px] px-2 py-0.5 rounded border border-line text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-12 border-t border-line pt-8 flex items-center justify-between gap-4">
              <Link
                href="/#projects"
                className="label group inline-flex items-center gap-1 text-muted hover:text-accent transition-colors rounded-md focus-visible:outline-none"
              >
                <span aria-hidden className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
                All projects
              </Link>
              {hasNext && (
                <Link
                  href={`/projects/${next.slug}`}
                  className="label group inline-flex items-center gap-1 text-ink hover:text-accent transition-colors text-right rounded-md focus-visible:outline-none"
                >
                  {next.name}
                  <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
              )}
            </div>
          </Reveal>
        </article>
      </main>
      <PageFooter />
    </>
  );
}
