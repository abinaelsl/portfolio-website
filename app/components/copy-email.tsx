"use client";

import { motion } from "motion/react";
import { toast } from "sonner";
import { EMAIL } from "@/app/lib/data";

export function CopyEmail({ className }: { className?: string }) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.success("Email copied to clipboard", { description: EMAIL });
    } catch {
      // Clipboard unavailable (e.g. insecure context) — fall back to mail client.
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <motion.button
      type="button"
      onClick={copy}
      whileTap={{ scale: 0.97 }}
      title="Click to copy"
      className={`group inline-flex items-center gap-1.5 cursor-pointer
                  font-mono text-accent rounded-md
                  hover:opacity-80 transition-opacity
                  focus-visible:outline-none ${className ?? ""}`}
    >
      <span className="underline-offset-4 group-hover:underline">{EMAIL}</span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-70 group-hover:translate-x-0"
        aria-hidden
      >
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path strokeLinecap="round" d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    </motion.button>
  );
}
