import type { Metadata } from "next";
import Link from "next/link";
import { posts, formatDate } from "@/app/lib/data";
import { SubHeader } from "@/app/components/sub-header";
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
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-20">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
              Writing
            </p>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Notes &amp; essays
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Occasional writing on net-zero building research, building software, and life in Japan.
            </p>
          </Reveal>

          <div className="mt-10 border-t border-gray-100 dark:border-gray-800">
            {sorted.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <Link
                  href={`/writing/${post.slug}`}
                  className="group block border-b border-gray-100 dark:border-gray-800 py-6
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 rounded-md"
                >
                  <time className="font-mono text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                    {formatDate(post.date)}
                  </time>
                  <h2 className="mt-1.5 font-display text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-1.5 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {post.summary}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    Read
                    <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
