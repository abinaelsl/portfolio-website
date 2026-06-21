// Minimal footer for sub-pages (writing, case studies). Server component.
export function PageFooter() {
  return (
    <footer className="border-t border-line mt-auto">
      <div className="max-w-3xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-2">
        <p className="label text-faint">
          © {new Date().getFullYear()} Abinael Sarungallo Lumempouw · All rights reserved
        </p>
        <span className="font-mono text-[11px] tracking-wider text-accent">@abinaelsl</span>
      </div>
    </footer>
  );
}
