import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

// Minimal header for sub-pages (case studies, writing). Server component;
// the theme toggle is the only client island.
export function SubHeader({
  backHref = "/",
  backLabel = "Abinael S.L.",
}: {
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/80">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href={backHref}
          className="group inline-flex items-center gap-1.5 text-sm font-medium
                     text-gray-600 dark:text-gray-400
                     hover:text-gray-900 dark:hover:text-gray-100 transition-colors
                     rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
        >
          <span aria-hidden className="transition-transform duration-200 group-hover:-translate-x-0.5">
            &larr;
          </span>
          {backLabel}
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
