import { safeHref } from "@/app/lib/safe-href";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Renders Markdown post bodies with styling that matches the site.
// Server component — markdown ends up in the HTML for SEO.
export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="mt-10 mb-3 font-heading text-xl font-bold uppercase tracking-wide text-ink">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 mb-2 font-heading text-lg font-bold text-ink">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="my-4 leading-[1.75] text-ink/85">{children}</p>
        ),
        a: ({ href, children }) => (
          <a
            href={safeHref(href)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="my-4 space-y-2 pl-5 list-disc marker:text-accent">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="my-4 space-y-2 pl-5 list-decimal marker:text-accent">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-ink/85 leading-relaxed pl-1">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-7 border-l-2 border-accent pl-5 text-lg italic text-muted">
            {children}
          </blockquote>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-ink">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        img: ({ src, alt }) => (
          // Markdown images (e.g. dropped in via the content studio) — plain <img>
          // keeps unknown dimensions simple; next/image needs explicit width/height.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={typeof src === "string" ? src : ""}
            alt={alt || ""}
            loading="lazy"
            className="my-7 w-full rounded-[var(--radius-panel)] border border-line"
          />
        ),
        code: ({ children }) => (
          <code className="font-mono text-[0.85em] px-1.5 py-0.5 rounded border border-line text-accent">
            {children}
          </code>
        ),
        hr: () => <hr className="my-8 border-line" />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
