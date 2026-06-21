"use client";

import { motion } from "motion/react";
import { socials } from "@/app/lib/data";

export function SocialRow({ className }: { className?: string }) {
  return (
    <div className={className}>
      {socials.map((s) => (
        <motion.a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          target={s.href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          whileHover={{ scale: 1.18, y: -2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="text-muted hover:text-accent
                     transition-colors duration-150 cursor-pointer rounded-md
                     focus-visible:outline-none"
        >
          {s.icon}
        </motion.a>
      ))}
    </div>
  );
}
