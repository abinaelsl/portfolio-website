import type { Metadata } from "next";
import Link from "next/link";
import { posts, formatDate } from "@/app/lib/data";
import { SubHeader } from "@/app/components/sub-header";
import { PageFooter } from "@/app/components/page-footer";
import { Reveal } from "@/app/lib/motion";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on net-zero building research, building software, and life in Japan.",
};

export default function WritingIndex() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <SubHeader backHref="/" backLabel="Abinael S.L." />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 pt-14 pb-20">
          <Reveal>
            <p className="label text-accent">// Transmission Log</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl uppercase tracking-tight text-ink">
              Notes &amp; essays
            </h1>
            <p className="mt-3 text-lg text-muted leading-relaxed">
              Occasional writing on net-zero building research, building software, and life in Japan.
            </p>
          </Reveal>

          <div className="mt-10 border-t border-line">
            {sorted.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <Link
                  href={`/writing/${post.slug}`}
                  className="group block border-b border-line py-6
                             focus-visible:outline-none rounded-md"
                >
                  <time className="font-mono text-xs text-faint tabular-nums">
                    {formatDate(post.date)}
                  </time>
                  <h2 className="mt-1.5 font-heading text-xl font-bold text-ink group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-1.5 text-muted leading-relaxed">
                    {post.summary}
                  </p>
                  <span className="label mt-3 inline-flex items-center gap-1 text-accent">
                    Read
                    <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <PageFooter />
    </>
  );
}
