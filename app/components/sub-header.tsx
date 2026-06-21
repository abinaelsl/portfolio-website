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
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-line">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href={backHref}
          className="label group inline-flex items-center gap-1.5
                     text-muted hover:text-ink transition-colors
                     rounded-md focus-visible:outline-none"
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
