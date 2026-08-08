import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import type { NicheCategory } from "@/types/schema";
import { getNicheCategories } from "@/lib/db";
import { ProductShell } from "../components/product/ProductShell";
import { PageSpinner, TagChip } from "../components/product/ui";
import { BLUE, BLUE_DEEP, glassPanel, MUTED } from "../components/product/theme";
import { formatCount } from "../components/product/platform";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function NichesPage() {
  const [niches, setNiches] = useState<NicheCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getNicheCategories()
      .then((data) => {
        if (!cancelled) {
          setNiches(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ProductShell title="Custom Niches">
      <h1
        className="font-semibold tracking-tight leading-[1.15] mb-2"
        style={{ fontFamily: "'Onest', sans-serif", fontSize: "clamp(28px, 4vw, 40px)" }}
      >
        Own your corner of the <span style={{ color: BLUE }}>internet</span>
      </h1>
      <p className="text-[15px] mb-8 max-w-2xl" style={{ color: MUTED }}>
        Track verticals with category-specific benchmarks — fitness, finance, beauty, and more.
      </p>

      {loading ? (
        <PageSpinner label="Loading niches…" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {niches.map((niche) => (
            <article
              key={niche.id}
              className="overflow-hidden rounded-3xl transition-shadow hover:shadow-lg"
              style={glassPanel}
            >
              <div className="relative aspect-[16/9] overflow-hidden" style={{ background: "#e2e8f0" }}>
                {niche.thumbnailUrl ? (
                  <ImageWithFallback
                    src={niche.thumbnailUrl}
                    alt={niche.name}
                    className="w-full h-full object-cover"
                  />
                ) : null}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(15,23,42,0.55) 100%)",
                  }}
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                  <h2
                    className="font-semibold text-lg text-white"
                    style={{ fontFamily: "'Onest', sans-serif" }}
                  >
                    {niche.name}
                  </h2>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.92)", color: BLUE_DEEP }}
                  >
                    <TrendingUp size={12} /> {niche.trendScore.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm mb-3" style={{ color: MUTED }}>
                  {formatCount(niche.videoCount)} videos indexed
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(niche.hashtags ?? []).slice(0, 3).map((tag) => (
                    <TagChip key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </ProductShell>
  );
}
