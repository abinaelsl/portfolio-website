"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ThemeToggle } from "./theme-toggle";

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
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/80">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between gap-2">
        <a
          href="#top"
          className="font-display font-semibold text-sm tracking-tight text-gray-900 dark:text-gray-100
                     rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
        >
          Abinael S.L.
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
                  className="relative px-2 sm:px-3 py-1.5 text-[13px] sm:text-sm rounded-md transition-colors
                             text-gray-500 dark:text-gray-400
                             hover:text-gray-900 dark:hover:text-gray-100
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                >
                  <span className={isActive ? "text-indigo-600 dark:text-indigo-400 font-medium" : ""}>
                    {s.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId={reduce ? undefined : "nav-active"}
                      className="absolute left-2 right-2 sm:left-3 sm:right-3 -bottom-px h-[1.5px] rounded-full bg-indigo-500 dark:bg-indigo-400"
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
