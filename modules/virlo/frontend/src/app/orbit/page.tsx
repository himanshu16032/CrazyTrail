import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import type { VideoCardData } from "@/types/schema";
import { executeOrbitSearch } from "@/lib/db";
import { ProductShell } from "../components/product/ProductShell";
import { PlatformFilters } from "../components/product/PlatformFilters";
import { VideoCard } from "../components/product/VideoCard";
import { EmptyState, VideoCardSkeleton } from "../components/product/ui";
import { BLUE, BLUE_DEEP, MUTED } from "../components/product/theme";
import {
  pillToPlatform,
  type PlatformPill,
} from "../components/product/platform";

export default function OrbitPage() {
  const [keyword, setKeyword] = useState("fitness");
  const [draft, setDraft] = useState("fitness");
  const [platformFilter, setPlatformFilter] = useState<PlatformPill>("All");
  const [videos, setVideos] = useState<VideoCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    executeOrbitSearch({
      keyword,
      platform: pillToPlatform(platformFilter),
      filters: { sortBy: "viral", limit: 24 },
    })
      .then((results) => {
        if (!cancelled) {
          setVideos(results);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [keyword, platformFilter]);

  return (
    <ProductShell title="Orbit Search">
      <h1
        className="font-semibold tracking-tight leading-[1.15] mb-2"
        style={{ fontFamily: "'Onest', sans-serif", fontSize: "clamp(28px, 4vw, 40px)" }}
      >
        Discover trends before they <span style={{ color: BLUE }}>explode</span>
      </h1>
      <p className="text-[15px] mb-5 max-w-2xl" style={{ color: MUTED }}>
        Real-time search across short-form video — powered by Orbit.
      </p>

      <form
        className="flex flex-col sm:flex-row gap-3 mb-4 max-w-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          setKeyword(draft.trim() || keyword);
        }}
      >
        <div
          className="flex flex-1 items-center gap-3 rounded-full px-5 py-3.5"
          style={{
            background: "rgba(255,255,255,0.92)",
            border: "1px solid rgba(147,197,253,0.45)",
            boxShadow: "0 10px 30px rgba(59,130,246,0.08)",
          }}
        >
          <Search size={18} style={{ color: BLUE }} className="flex-shrink-0" />
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Search keywords, creators, niches…"
            className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-[#94a3b8]"
          />
        </div>
        <button
          type="submit"
          className="rounded-full px-6 py-3 text-sm font-semibold text-white"
          style={{
            background: `linear-gradient(135deg, #38bdf8, ${BLUE_DEEP})`,
            boxShadow: "0 10px 24px rgba(59,130,246,0.28)",
          }}
        >
          Search
        </button>
      </form>

      <div className="mb-6">
        <PlatformFilters value={platformFilter} onChange={setPlatformFilter} />
      </div>

      <p className="text-sm mb-4" style={{ color: MUTED }}>
        {loading ? "Searching…" : `${videos.length} results for “${keyword}”`}
        <span className="ml-2 text-xs">· 50 credits / run</span>
      </p>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Orbit results"
          description="Try a broader keyword or switch platforms."
        />
      )}
    </ProductShell>
  );
}
