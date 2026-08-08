import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ExternalLink, Search, TrendingUp, X, Eye } from "lucide-react";
import type { DashboardMetrics, VideoCardData } from "@/types/schema";
import { getOverviewMetrics, getTrendingVideos } from "@/lib/db";
import { ProductShell } from "../components/product/ProductShell";
import { PlatformFilters } from "../components/product/PlatformFilters";
import { VideoCard } from "../components/product/VideoCard";
import {
  CaptureBubble,
  EmptyState,
  MetricsSkeleton,
  TagChip,
  VideoCardSkeleton,
  ViralBubble,
} from "../components/product/ui";
import { BLUE, BLUE_DEEP, CAPTURE, glassPanel, INK, MUTED, VIRAL } from "../components/product/theme";
import {
  captureLabel,
  formatCount,
  pillToPlatform,
  platformLabel,
  SORT_OPTIONS,
  sortToFilter,
  viralLabel,
  type PlatformPill,
  type SortOption,
} from "../components/product/platform";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function DashboardPage() {
  const [platformFilter, setPlatformFilter] = useState<PlatformPill>("All");
  const [sortBy, setSortBy] = useState<SortOption>("Most Viral");
  const [searchQuery, setSearchQuery] = useState("");
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [videos, setVideos] = useState<VideoCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all([
      getOverviewMetrics(),
      getTrendingVideos({
        platform: pillToPlatform(platformFilter),
        sortBy: sortToFilter(sortBy),
        limit: 40,
      }),
    ])
      .then(([nextMetrics, nextVideos]) => {
        if (cancelled) return;
        setMetrics(nextMetrics);
        setVideos(nextVideos);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [platformFilter, sortBy]);

  const filteredVideos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return videos;
    return videos.filter((v) => {
      const haystack = [v.title, v.creatorHandle ?? "", ...v.tags, v.nicheId ?? ""]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [videos, searchQuery]);

  const selected = filteredVideos.find((v) => v.id === selectedId) ?? null;

  return (
    <ProductShell title="Overview">
      <div className="grid lg:grid-cols-[1fr_240px] gap-6 mb-6 items-start">
        <div>
          <h1
            className="font-semibold tracking-tight leading-[1.15] mb-2"
            style={{ fontFamily: "'Onest', sans-serif", fontSize: "clamp(28px, 4vw, 40px)" }}
          >
            Ride the wave of what&apos;s <span style={{ color: BLUE }}>trending</span>
          </h1>
          <p className="text-[15px] mb-5" style={{ color: MUTED }}>
            Smart insights for creators who move first.
          </p>

          <div
            className="flex items-center gap-3 rounded-full px-5 py-3.5 mb-4 max-w-2xl"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(147,197,253,0.45)",
              boxShadow: "0 10px 30px rgba(59,130,246,0.08)",
            }}
          >
            <Search size={18} style={{ color: BLUE }} className="flex-shrink-0" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search creators, niches, sounds…"
              className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-[#94a3b8]"
            />
          </div>

          <PlatformFilters value={platformFilter} onChange={setPlatformFilter} />
        </div>

        {loading || !metrics ? (
          <MetricsSkeleton />
        ) : (
          <div className="rounded-3xl p-5" style={glassPanel}>
            <p className="text-xs font-medium mb-3" style={{ color: MUTED }}>
              This week
            </p>
            <p
              className="font-bold leading-none mb-1"
              style={{ fontSize: 32, color: BLUE_DEEP, fontFamily: "'Onest', sans-serif" }}
            >
              {formatCount(metrics.totalViews)}
            </p>
            <p className="text-sm mb-1" style={{ color: MUTED }}>
              Total views
            </p>
            <p
              className="text-xs font-medium flex items-center gap-1 mb-2"
              style={{ color: "#0ea5e9" }}
            >
              <TrendingUp size={12} /> +{metrics.viewTrendPercentage}% vs last week
            </p>
            <p className="text-xs" style={{ color: MUTED }}>
              {metrics.activeTrackers} active trackers
              {metrics.viralVideoCount != null ? ` · ${metrics.viralVideoCount} viral videos` : ""}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="text-sm" style={{ color: MUTED }}>
          {loading ? "…" : filteredVideos.length} videos
          {searchQuery.trim() ? ` for “${searchQuery.trim()}”` : ""}
        </p>
        <div className="relative inline-flex items-center text-sm" style={{ color: MUTED }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-transparent outline-none cursor-pointer appearance-none pr-5"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-0" />
        </div>
      </div>

      <div className="relative">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredVideos.length > 0 ? (
          <div
            className={`grid gap-4 transition-all ${
              selected
                ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pr-0 lg:pr-[380px]"
                : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {filteredVideos.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                active={selectedId === v.id}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No videos found"
            description="Try another niche or clear your filters."
          >
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["fitness", "finance", "beauty", "tech"].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setSearchQuery(n);
                    setPlatformFilter("All");
                  }}
                  className="text-sm px-4 py-1.5 rounded-full"
                  style={{ background: "#dbeafe", color: BLUE_DEEP }}
                >
                  {n}
                </button>
              ))}
            </div>
          </EmptyState>
        )}

        {selected && (
          <>
            <div
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: "rgba(15,23,42,0.28)" }}
              onClick={() => setSelectedId(null)}
            />
            <aside
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[380px] overflow-y-auto"
              style={{
                background: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(16px)",
                boxShadow: "-8px 0 32px rgba(59,130,246,0.12)",
                borderLeft: "1px solid rgba(147,197,253,0.4)",
              }}
            >
              <div
                className="sticky top-0 z-10 h-14 flex items-center justify-between px-4"
                style={{
                  background: "rgba(255,255,255,0.94)",
                  borderBottom: "1px solid rgba(147,197,253,0.35)",
                }}
              >
                <span className="text-sm font-medium">Video insight</span>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#eff6ff]"
                  aria-label="Close details"
                  style={{ color: MUTED }}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden" style={{ background: "#e2e8f0" }}>
                <ImageWithFallback
                  src={selected.thumbnail}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 flex flex-col gap-5">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {selected.tags.map((tag) => (
                      <TagChip key={tag} label={tag} />
                    ))}
                  </div>
                  <p className="text-xs mb-0.5" style={{ color: MUTED }}>
                    {platformLabel(selected.platform)}
                  </p>
                  <h2
                    className="font-medium text-[16px] leading-snug"
                    style={{ fontFamily: "'Onest', sans-serif", color: INK }}
                  >
                    {selected.title}
                  </h2>
                  <p className="text-xs mt-1 flex items-center gap-2" style={{ color: MUTED }}>
                    <span>{selected.creatorHandle}</span>
                    <span className="inline-flex items-center gap-1">
                      <Eye size={11} /> {formatCount(selected.views)}
                    </span>
                  </p>
                </div>

                <div className="flex gap-2.5">
                  <div
                    className="flex-1 rounded-2xl px-3 py-2.5"
                    style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
                  >
                    <p
                      className="text-[10px] font-semibold tracking-wide uppercase mb-1"
                      style={{ color: BLUE }}
                    >
                      Capture score
                    </p>
                    <p className="text-2xl font-bold" style={{ color: BLUE_DEEP }}>
                      {selected.captureScore}
                      <span className="text-sm font-medium" style={{ color: MUTED }}>
                        /10
                      </span>
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: CAPTURE }}>
                      {captureLabel(selected.captureScore)}
                    </p>
                  </div>
                  <div
                    className="flex-1 rounded-2xl px-3 py-2.5 flex flex-col justify-center"
                    style={{
                      background: "rgba(255,241,242,0.95)",
                      border: "1px solid rgba(253,164,175,0.65)",
                    }}
                  >
                    <ViralBubble score={selected.viralRating} />
                    <p className="text-[11px] mt-2" style={{ color: VIRAL }}>
                      {viralLabel(selected.viralRating)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center scale-90 origin-left">
                  <CaptureBubble score={selected.captureScore} />
                </div>

                <a
                  href={selected.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-full text-white"
                  style={{
                    background: `linear-gradient(135deg, #38bdf8, ${BLUE_DEEP})`,
                    boxShadow: "0 10px 24px rgba(59,130,246,0.28)",
                  }}
                >
                  View on {platformLabel(selected.platform)} <ExternalLink size={13} />
                </a>
              </div>
            </aside>
          </>
        )}
      </div>
    </ProductShell>
  );
}
