/** Shared visual tokens — Virlo-inspired marketing + product surfaces. */

export const CAPTURE = "#0284c7";
export const VIRAL = "#e11d48";
export const BLUE = "#4285f4";
export const BLUE_DEEP = "#1a73e8";
export const BLUE_SOFT = "#8ab4f8";
export const INK = "#202124";
export const MUTED = "#5f6368";

export const productBg =
  "linear-gradient(165deg, #dbeafe 0%, #eff6ff 32%, #f8fbff 68%, #ffffff 100%)";

export const marketingGlow =
  "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(66,133,244,0.18) 0%, rgba(66,133,244,0.06) 42%, transparent 72%)";

export const glassPanel = {
  background: "rgba(255,255,255,0.92)",
  border: "1px solid rgba(147,197,253,0.4)",
  boxShadow: "0 16px 40px rgba(59,130,246,0.1)",
} as const;

export const pricingCardShadow =
  "0 1px 2px rgba(60,64,67,0.04), 0 8px 24px rgba(66,133,244,0.08), 0 24px 48px rgba(60,64,67,0.06)";

export const pricingCardShadowHover =
  "0 2px 4px rgba(60,64,67,0.06), 0 16px 40px rgba(66,133,244,0.14), 0 32px 64px rgba(60,64,67,0.08)";

export const btnRaised =
  "inline-flex items-center justify-center gap-2 text-white font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0";

export const btnRaisedStyle = {
  background: "linear-gradient(#4285f4, #1a73e8)",
  border: "1px solid rgba(66,133,244,0.35)",
  boxShadow:
    "inset 0 1px rgba(255,255,255,0.25), 0 4px 12px rgba(66,133,244,0.28), 0 2px 4px rgba(0,0,0,0.08)",
} as const;

export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium border border-[rgba(60,64,67,0.14)] bg-white text-[#202124] transition-all duration-200 hover:bg-[#f8f9fa] hover:border-[rgba(60,64,67,0.22)] hover:-translate-y-0.5";
