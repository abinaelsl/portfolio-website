import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts, formatDate } from "@/app/lib/data";
import { SubHeader } from "@/app/components/sub-header";
import { PageFooter } from "@/app/components/page-footer";
import { Markdown } from "@/app/components/markdown";
import { Reveal } from "@/app/lib/motion";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: `${post.title} · Abinael S.L.`,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <SubHeader backHref="/writing" backLabel="Writing" />
      <main className="flex-1">
        <article className="max-w-2xl mx-auto px-6 pt-16 pb-20">
          <Reveal>
            <time className="label text-accent tabular-nums">
              {formatDate(post.date)}
            </time>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl uppercase tracking-tight leading-[0.95] text-ink">
              {post.title}
            </h1>
            <p className="mt-3 text-lg text-muted leading-relaxed">
              {post.summary}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 border-t border-line pt-6 text-base">
              <Markdown>{post.body}</Markdown>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-12 border-t border-line pt-8">
              <Link
                href="/writing"
                className="label group inline-flex items-center gap-1 text-muted hover:text-accent transition-colors rounded-md focus-visible:outline-none"
              >
                <span aria-hidden className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
                All writing
              </Link>
            </div>
          </Reveal>
        </article>
      </main>
      <PageFooter />
    </>
  );
}
