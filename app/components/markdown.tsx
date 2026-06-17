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
          <h2 className="mt-10 mb-3 font-display text-xl font-semibold text-gray-900 dark:text-gray-100">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 mb-2 font-display text-lg font-semibold text-gray-900 dark:text-gray-100">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="my-4 leading-[1.75] text-gray-700 dark:text-gray-300">{children}</p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 underline underline-offset-4 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="my-4 space-y-2 pl-5 list-disc marker:text-indigo-400 dark:marker:text-indigo-500">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="my-4 space-y-2 pl-5 list-decimal marker:text-indigo-400 dark:marker:text-indigo-500">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-gray-700 dark:text-gray-300 leading-relaxed pl-1">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-7 border-l-2 border-indigo-400 dark:border-indigo-500 pl-5 text-lg italic text-gray-700 dark:text-gray-300">
            {children}
          </blockquote>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        code: ({ children }) => (
          <code className="font-mono text-[0.85em] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400">
            {children}
          </code>
        ),
        hr: () => <hr className="my-8 border-gray-200 dark:border-gray-800" />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
