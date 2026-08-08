import { Eye, Play } from "lucide-react";
import type { VideoCardData } from "@/types/schema";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { BLUE, BLUE_DEEP, INK, MUTED } from "./theme";
import { formatCount, platformBadgeStyle, platformLabel } from "./platform";
import { CaptureBubble, TagChip, ViralBubble } from "./ui";

export function VideoCard({
  video,
  active,
  onSelect,
}: {
  video: VideoCardData;
  active?: boolean;
  onSelect?: (id: string) => void;
}) {
  const badge = platformBadgeStyle(video.platform);

  return (
    <button
      type="button"
      onClick={() => onSelect?.(video.id)}
      className="group text-left overflow-hidden transition-all w-full"
      style={{
        borderRadius: 20,
        background: "rgba(255,255,255,0.92)",
        border: active ? `2px solid ${BLUE}` : "1px solid rgba(191,219,254,0.7)",
        boxShadow: active
          ? "0 14px 36px rgba(59,130,246,0.18)"
          : "0 8px 24px rgba(59,130,246,0.08)",
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden" style={{ background: "#e2e8f0" }}>
        <ImageWithFallback
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,23,42,0.08) 0%, transparent 35%, rgba(15,23,42,0.35) 100%)",
          }}
        />

        <div className="absolute top-2.5 left-2.5">
          <CaptureBubble score={video.captureScore} />
        </div>

        <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1.5">
          <ViralBubble score={video.viralRating} />
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: badge.bg,
              color: badge.fg,
              border: `1px solid ${badge.border}`,
            }}
          >
            {platformLabel(video.platform)}
          </span>
        </div>

        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-wrap items-center gap-1.5">
          {video.tags.slice(0, 2).map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 10px 24px rgba(15,23,42,0.2)",
            }}
          >
            <Play size={15} style={{ color: BLUE_DEEP }} className="fill-current" />
          </div>
        </div>
      </div>

      <div className="px-3.5 py-3.5">
        <p
          className="text-[14px] leading-snug line-clamp-2 mb-2.5 font-semibold"
          style={{ color: INK }}
        >
          {video.title}
        </p>
        <div
          className="flex items-center justify-between gap-2 text-[12px]"
          style={{ color: MUTED }}
        >
          <span className="truncate">
            {video.creatorHandle?.startsWith("@")
              ? video.creatorHandle
              : `@${video.creatorHandle ?? "creator"}`}
          </span>
          <span className="flex-shrink-0 flex items-center gap-1 font-medium">
            <Eye size={12} /> {formatCount(video.views)}
          </span>
        </div>
      </div>
    </button>
  );
}
