const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

/** Allow only safe link targets from static JSON content. */
export function safeHref(href: string | undefined | null): string {
  if (!href || href === "#") return "#";

  if (href.startsWith("/") && !href.startsWith("//")) return href;

  try {
    const url = new URL(href);
    if (ALLOWED_PROTOCOLS.has(url.protocol)) return href;
  } catch {
    // Invalid URL — fall back to inert link.
  }

  return "#";
}
