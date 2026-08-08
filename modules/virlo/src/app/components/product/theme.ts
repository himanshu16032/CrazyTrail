/** Shared visual tokens for product surfaces — mirrors existing Dashboard theme (no global CSS changes). */

export const CAPTURE = "#0284c7";
export const VIRAL = "#e11d48";
export const BLUE = "#3b82f6";
export const BLUE_DEEP = "#2563eb";
export const INK = "#0f172a";
export const MUTED = "#64748b";

export const productBg =
  "linear-gradient(165deg, #dbeafe 0%, #eff6ff 32%, #f8fbff 68%, #ffffff 100%)";

export const glassPanel = {
  background: "rgba(255,255,255,0.92)",
  border: "1px solid rgba(147,197,253,0.4)",
  boxShadow: "0 16px 40px rgba(59,130,246,0.1)",
} as const;

export const btnRaised =
  "inline-flex items-center justify-center gap-2 text-white font-semibold rounded-full transition-all hover:-translate-y-0.5";

export const btnRaisedStyle = {
  background: "linear-gradient(#4285f4, #1a73e8)",
  border: "1px solid rgba(66,133,244,0.35)",
  boxShadow:
    "inset 0 1px rgba(255,255,255,0.25), 0 4px 12px rgba(66,133,244,0.28), 0 2px 4px rgba(0,0,0,0.08)",
} as const;
