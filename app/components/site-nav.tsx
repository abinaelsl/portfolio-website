"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ThemeToggle } from "./theme-toggle";
import { IconSaturn } from "./orbital";

const sections = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
];

export function SiteNav() {
  const [active, setActive] = useState<string>("about");
  const reduce = useReducedMotion();

  // Scroll-spy: highlight the section currently crossing the viewport's middle band.
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-line">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between gap-2">
        <a
          href="#top"
          className="group inline-flex items-center gap-2 rounded-md focus-visible:outline-none"
        >
          <IconSaturn className="h-4 w-4 text-accent transition-transform group-hover:rotate-12" />
          <span className="font-heading text-sm font-extrabold uppercase tracking-[0.18em] text-ink">
            Abinael S.L.
          </span>
        </a>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <nav className="flex items-center">
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="label relative px-2 sm:px-3 py-2 rounded-md transition-colors
                             text-muted hover:text-ink
                             focus-visible:outline-none"
                >
                  <span className={isActive ? "text-accent" : ""}>
                    {s.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId={reduce ? undefined : "nav-active"}
                      className="absolute left-2 right-2 sm:left-3 sm:right-3 -bottom-px h-[1.5px] bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
          <div className="pl-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
