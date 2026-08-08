import type { ReactNode } from "react";
import { BLUE, BLUE_DEEP, INK, MUTED, VIRAL } from "./theme";

export function CaptureBubble({ score }: { score: number }) {
  const display = Math.min(99, Math.round(score * 10 + Math.max(0, score - 5)));
  return (
    <div
      className="rounded-2xl px-3 py-2 text-left"
      style={{
        background: "rgba(219,234,254,0.9)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(147,197,253,0.6)",
        boxShadow: "0 8px 20px rgba(59,130,246,0.12)",
      }}
    >
      <p
        className="font-bold tabular-nums leading-none"
        style={{ fontSize: 28, color: BLUE_DEEP, fontFamily: "'Onest', sans-serif" }}
      >
        {display}
      </p>
      <p
        className="text-[9px] font-semibold tracking-[0.14em] uppercase mt-0.5"
        style={{ color: BLUE }}
      >
        Capture
      </p>
    </div>
  );
}

export function ViralBubble({ score }: { score: number }) {
  const rounded = Math.round(score * 10) / 10;
  return (
    <div
      className="rounded-2xl px-3 py-2 text-left min-w-[64px]"
      style={{
        background: "rgba(255,241,242,0.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(253,164,175,0.65)",
        boxShadow: "0 8px 20px rgba(244,63,94,0.12)",
      }}
    >
      <div className="flex items-center gap-1.5">
        <div
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: 28,
            height: 28,
            background: "rgba(255,255,255,0.75)",
            boxShadow: "inset 0 0 0 2px rgba(244,63,94,0.2)",
          }}
        >
          <svg width={28} height={28} className="absolute inset-0 overflow-visible">
            <circle
              cx={14}
              cy={14}
              r={11}
              fill="none"
              stroke="rgba(251,113,133,0.35)"
              strokeWidth={2.2}
            />
            <circle
              cx={14}
              cy={14}
              r={11}
              fill="none"
              stroke={VIRAL}
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 11}
              strokeDashoffset={2 * Math.PI * 11 * (1 - Math.max(0, Math.min(10, score)) / 10)}
              transform="rotate(-90 14 14)"
              style={{ filter: "drop-shadow(0 0 4px rgba(244,63,94,0.45))" }}
            />
          </svg>
          <span
            className="relative font-bold tabular-nums leading-none"
            style={{ fontSize: 11, color: VIRAL, fontFamily: "'Onest', sans-serif" }}
          >
            {rounded}
          </span>
        </div>
        <p
          className="text-[9px] font-semibold tracking-[0.14em] uppercase leading-none"
          style={{ color: VIRAL }}
        >
          Viral
        </p>
      </div>
    </div>
  );
}

export function TagChip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-full"
      style={{
        color: BLUE_DEEP,
        background: "rgba(239,246,255,0.92)",
        border: "1px solid rgba(147,197,253,0.45)",
      }}
    >
      {label}
    </span>
  );
}

export function VideoCardSkeleton() {
  return (
    <div
      className="overflow-hidden animate-pulse"
      style={{
        borderRadius: 20,
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(191,219,254,0.7)",
        boxShadow: "0 8px 24px rgba(59,130,246,0.08)",
      }}
    >
      <div className="aspect-[4/5]" style={{ background: "rgba(226,232,240,0.9)" }} />
      <div className="px-3.5 py-3.5 flex flex-col gap-2">
        <div className="h-3.5 rounded-full w-5/6" style={{ background: "#e2e8f0" }} />
        <div className="h-3 rounded-full w-2/3" style={{ background: "#e2e8f0" }} />
        <div className="flex justify-between mt-1">
          <div className="h-2.5 rounded-full w-20" style={{ background: "#e2e8f0" }} />
          <div className="h-2.5 rounded-full w-12" style={{ background: "#e2e8f0" }} />
        </div>
      </div>
    </div>
  );
}

export function MetricsSkeleton() {
  return (
    <div
      className="rounded-3xl p-5 animate-pulse"
      style={{
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(147,197,253,0.4)",
      }}
    >
      <div className="h-3 w-16 rounded-full mb-4" style={{ background: "#e2e8f0" }} />
      <div className="h-8 w-28 rounded-full mb-2" style={{ background: "#e2e8f0" }} />
      <div className="h-3 w-20 rounded-full mb-3" style={{ background: "#e2e8f0" }} />
      <div className="h-12 w-full rounded-xl" style={{ background: "#e2e8f0" }} />
    </div>
  );
}

export function PageSpinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <div
        className="w-9 h-9 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: `${BLUE}55`, borderTopColor: BLUE_DEEP }}
      />
      <p className="text-sm" style={{ color: MUTED }}>
        {label}
      </p>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center py-20 px-6">
      <h3
        className="font-medium text-lg mb-1"
        style={{ fontFamily: "'Onest', sans-serif", color: INK }}
      >
        {title}
      </h3>
      <p className="text-sm mb-5" style={{ color: MUTED }}>
        {description}
      </p>
      {children}
    </div>
  );
}
