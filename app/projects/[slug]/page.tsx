import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/app/lib/data";
import { SubHeader } from "@/app/components/sub-header";
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
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
              {project.role} · {project.year}
            </p>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {project.name}
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {project.tagline}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.href !== "#" && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium
                             bg-indigo-600 text-white hover:bg-indigo-500
                             transition-colors duration-200
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
                >
                  Visit live
                  <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              )}
              <span className="font-mono text-xs px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                {project.status}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-10 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.overview}
            </p>
          </Reveal>

          {project.image && (
            <Reveal delay={0.08}>
              <figure className="mt-10 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                <Image
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  width={1600}
                  height={948}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="w-full h-auto"
                />
              </figure>
            </Reveal>
          )}

          <div className="mt-10 border-t border-gray-100 dark:border-gray-800 pt-8 space-y-7">
            {project.highlights.map((h) => (
              <Reveal key={h.label}>
                <div className="grid sm:grid-cols-[150px_1fr] gap-1.5 sm:gap-6">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-indigo-600 dark:text-indigo-400 pt-0.5">
                    {h.label}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{h.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 border-t border-gray-100 dark:border-gray-800 pt-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400 mb-3">
                Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-12 border-t border-gray-100 dark:border-gray-800 pt-8 flex items-center justify-between gap-4 text-sm">
              <Link
                href="/#projects"
                className="group inline-flex items-center gap-1 font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
              >
                <span aria-hidden className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
                All projects
              </Link>
              {hasNext && (
                <Link
                  href={`/projects/${next.slug}`}
                  className="group inline-flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-right rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                >
                  {next.name}
                  <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
              )}
            </div>
          </Reveal>
        </article>
      </main>
    </>
  );
}
