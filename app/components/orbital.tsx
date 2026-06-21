import type { ReactNode, CSSProperties } from "react";

/* ================================================================== *
 *  ORBITAL — HUD primitives for the spacefaring command-center look.
 *  Presentational + server-safe (no hooks, no external deps).
 * ================================================================== */

function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/* ---- Film grain overlay (rendered once in the root layout) -------- */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function Grain({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cx(
        "pointer-events-none fixed inset-0 z-[70] opacity-[0.05] mix-blend-overlay dark:opacity-[0.07]",
        className,
      )}
      style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: "160px 160px" }}
    />
  );
}

/* ---- Registration cross-mark ------------------------------------- */
export function CrossMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={cx("h-2.5 w-2.5 text-faint", className)} aria-hidden>
      <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/* ---- Corner brackets (inside a relative parent) ------------------ */
export function Brackets({
  className,
  size = 12,
  inset = 8,
}: {
  className?: string;
  size?: number;
  inset?: number;
}) {
  const base = "absolute border-line-strong";
  const s: CSSProperties = { width: size, height: size };
  return (
    <span aria-hidden className={cx("pointer-events-none", className)}>
      <span className={cx(base, "border-l border-t")} style={{ ...s, top: inset, left: inset }} />
      <span className={cx(base, "border-r border-t")} style={{ ...s, top: inset, right: inset }} />
      <span className={cx(base, "border-l border-b")} style={{ ...s, bottom: inset, left: inset }} />
      <span className={cx(base, "border-r border-b")} style={{ ...s, bottom: inset, right: inset }} />
    </span>
  );
}

/* ---- Uppercase tracked micro-label ------------------------------- */
export function Label({
  children,
  className,
  dot = false,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span className={cx("label inline-flex items-center gap-1.5", className)}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
      {children}
    </span>
  );
}

/* ---- Deterministic SVG barcode ----------------------------------- */
export function Barcode({
  seed = "ABINAEL-SL",
  className,
  height = 28,
}: {
  seed?: string;
  className?: string;
  height?: number;
}) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (let i = 0; i < 48 && x < 100; i++) {
    h = Math.imul(h ^ (h >>> 15), 2246822519);
    const w = 0.4 + ((h >>> 8) % 7) * 0.32;
    if (i % 2 === 0) bars.push({ x, w });
    x += w + 0.5;
  }
  const total = x;
  return (
    <svg
      viewBox={`0 0 ${total} ${height}`}
      preserveAspectRatio="none"
      className={cx("text-ink", className)}
      style={{ height }}
      aria-hidden
    >
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y="0" width={b.w} height={height} fill="currentColor" />
      ))}
    </svg>
  );
}

/* ---- Wireframe globe --------------------------------------------- */
export function WireGlobe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={cx("text-line-strong", className)} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="0.6">
        <circle cx="50" cy="50" r="46" />
        <ellipse cx="50" cy="50" rx="15" ry="46" />
        <ellipse cx="50" cy="50" rx="31" ry="46" />
        <line x1="50" y1="4" x2="50" y2="96" />
        <line x1="4" y1="50" x2="96" y2="50" />
        <path d="M7 32 H93 M7 68 H93" />
        <path d="M15 18 H85 M15 82 H85" />
      </g>
    </svg>
  );
}

/* ---- Orbit rings ------------------------------------------------- */
export function OrbitRings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={cx("text-line-strong", className)} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="0.7">
        <circle cx="50" cy="50" r="6" className="fill-accent" stroke="none" />
        <ellipse cx="50" cy="50" rx="44" ry="18" strokeDasharray="2 3" transform="rotate(-24 50 50)" />
        <ellipse cx="50" cy="50" rx="34" ry="44" strokeDasharray="2 3" transform="rotate(18 50 50)" />
      </g>
      <circle cx="14" cy="40" r="1.6" className="fill-ink" />
    </svg>
  );
}

/* ================================================================== *
 *  Signature line-icon set (24x24, stroke = currentColor)
 * ================================================================== */
type IconProps = { className?: string; strokeWidth?: number };
function Svg({ children, className, strokeWidth = 1.5 }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("h-5 w-5", className)}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function IconStar4({ className, strokeWidth }: IconProps) {
  return (
    <Svg className={className} strokeWidth={strokeWidth}>
      <path d="M12 2c.5 5 .5 5 5.5 10C12.5 17 12.5 17 12 22 11.5 17 11.5 17 6.5 12 11.5 7 11.5 7 12 2Z" />
    </Svg>
  );
}

export function IconSaturn({ className, strokeWidth }: IconProps) {
  return (
    <Svg className={className} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="6" />
      <ellipse cx="12" cy="12" rx="11" ry="3.4" transform="rotate(-22 12 12)" />
    </Svg>
  );
}

export function IconGlobeGrid({ className, strokeWidth }: IconProps) {
  return (
    <Svg className={className} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="3.6" ry="9" />
      <path d="M3 12h18M4.5 7.5h15M4.5 16.5h15" />
    </Svg>
  );
}

export function IconTarget({ className, strokeWidth }: IconProps) {
  return (
    <Svg className={className} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 1v4M12 19v4M1 12h4M19 12h4" />
    </Svg>
  );
}
