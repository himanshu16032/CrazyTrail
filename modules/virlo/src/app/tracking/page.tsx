import { useEffect, useState } from "react";
import { Bell, Hash, Radio, UserRound, Layers } from "lucide-react";
import type { DashboardMetrics, TrackingList } from "@/types/schema";
import { getOverviewMetrics, getTrackingLists } from "@/lib/db";
import { ProductShell } from "../components/product/ProductShell";
import { MetricsSkeleton, PageSpinner } from "../components/product/ui";
import { BLUE, BLUE_DEEP, glassPanel, MUTED } from "../components/product/theme";
import { formatCount, platformLabel } from "../components/product/platform";
import type { VideoPlatform } from "@/types/schema";

function trackerIcon(type: TrackingList["type"]) {
  switch (type) {
    case "creator":
      return UserRound;
    case "hashtag":
      return Hash;
    case "niche":
      return Layers;
    case "competitor":
    default:
      return Radio;
  }
}

function platformText(platform: TrackingList["platform"]) {
  if (platform === "all") return "All platforms";
  return platformLabel(platform as VideoPlatform);
}

export default function TrackingPage() {
  const [lists, setLists] = useState<TrackingList[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all([getTrackingLists(), getOverviewMetrics()])
      .then(([nextLists, nextMetrics]) => {
        if (cancelled) return;
        setLists(nextLists);
        setMetrics(nextMetrics);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ProductShell title="Tracking Center">
      <h1
        className="font-semibold tracking-tight leading-[1.15] mb-2"
        style={{ fontFamily: "'Onest', sans-serif", fontSize: "clamp(28px, 4vw, 40px)" }}
      >
        Everything you track, in <span style={{ color: BLUE }}>one place</span>
      </h1>
      <p className="text-[15px] mb-8 max-w-2xl" style={{ color: MUTED }}>
        Monitor creators, niches, hashtags, and competitors — alerts when metrics spike.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {loading || !metrics ? (
          <>
            <MetricsSkeleton />
            <MetricsSkeleton />
            <MetricsSkeleton />
          </>
        ) : (
          [
            { label: "Active trackers", value: String(metrics.activeTrackers) },
            {
              label: "Creators tracked",
              value: formatCount(metrics.creatorsTracked ?? 0),
            },
            {
              label: "Viral videos",
              value: String(metrics.viralVideoCount ?? 0),
            },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-3xl p-5" style={glassPanel}>
              <p className="text-xs font-medium mb-2" style={{ color: MUTED }}>
                {kpi.label}
              </p>
              <p
                className="font-bold leading-none"
                style={{ fontSize: 28, color: BLUE_DEEP, fontFamily: "'Onest', sans-serif" }}
              >
                {kpi.value}
              </p>
            </div>
          ))
        )}
      </div>

      {loading ? (
        <PageSpinner label="Loading trackers…" />
      ) : (
        <div className="flex flex-col gap-3">
          {lists.map((item) => {
            const Icon = trackerIcon(item.type);
            return (
              <div
                key={item.id}
                className="rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
                style={glassPanel}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: item.isActive ? "#dbeafe" : "#f1f5f9" }}
                >
                  <Icon size={18} style={{ color: item.isActive ? BLUE_DEEP : MUTED }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[15px] truncate">{item.name}</p>
                  <p className="text-sm truncate" style={{ color: MUTED }}>
                    {item.target} · {platformText(item.platform)} · {item.type}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {item.lastAlertAt ? (
                    <span
                      className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ background: "#eff6ff", color: BLUE_DEEP }}
                    >
                      <Bell size={12} />
                      Alerted
                    </span>
                  ) : null}
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: item.isActive ? "rgba(220,252,231,0.95)" : "#f1f5f9",
                      color: item.isActive ? "#15803d" : MUTED,
                    }}
                  >
                    {item.isActive ? "Active" : "Paused"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ProductShell>
  );
}
