import { BLUE, MUTED } from "./theme";
import type { PlatformPill } from "./platform";
import { PLATFORM_PILLS } from "./platform";

export function PlatformFilters({
  value,
  onChange,
}: {
  value: PlatformPill;
  onChange: (pill: PlatformPill) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {PLATFORM_PILLS.map((p) => {
        const active = value === p;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className="text-sm px-4 py-1.5 rounded-full transition-colors"
            style={
              active
                ? {
                    background: BLUE,
                    color: "#ffffff",
                    fontWeight: 500,
                    boxShadow: "0 6px 16px rgba(59,130,246,0.28)",
                  }
                : {
                    background: "rgba(255,255,255,0.8)",
                    color: MUTED,
                    border: "1px solid rgba(148,163,184,0.35)",
                  }
            }
          >
            {p}
          </button>
        );
      })}
    </div>
  );
}
