import type { VideoFilterOptions, VideoPlatform } from "@/types/schema";

export type PlatformPill = "All" | "TikTok" | "YouTube" | "Reels";

export const PLATFORM_PILLS: PlatformPill[] = ["All", "TikTok", "YouTube", "Reels"];

export function pillToPlatform(pill: PlatformPill): VideoPlatform | "all" {
  switch (pill) {
    case "TikTok":
      return "tiktok";
    case "YouTube":
      return "youtube_shorts";
    case "Reels":
      return "instagram_reels";
    default:
      return "all";
  }
}

export function platformLabel(platform: VideoPlatform): string {
  switch (platform) {
    case "tiktok":
      return "TikTok";
    case "youtube_shorts":
      return "YouTube";
    case "instagram_reels":
      return "Reels";
  }
}

export function platformBadgeStyle(platform: VideoPlatform): { bg: string; fg: string; border: string } {
  switch (platform) {
    case "tiktok":
      return { bg: "rgba(254,226,226,0.95)", fg: "#dc2626", border: "rgba(252,165,165,0.55)" };
    case "youtube_shorts":
      return { bg: "rgba(219,234,254,0.95)", fg: "#2563eb", border: "rgba(147,197,253,0.55)" };
    case "instagram_reels":
      return { bg: "rgba(254,243,199,0.95)", fg: "#d97706", border: "rgba(252,211,77,0.55)" };
  }
}

export type SortOption = "Most Views" | "Fastest Growing" | "Most Recent" | "Most Viral";

export const SORT_OPTIONS: SortOption[] = [
  "Most Views",
  "Fastest Growing",
  "Most Recent",
  "Most Viral",
];

export function sortToFilter(sort: SortOption): VideoFilterOptions["sortBy"] {
  switch (sort) {
    case "Most Views":
      return "views";
    case "Fastest Growing":
      return "growth";
    case "Most Recent":
      return "recent";
    case "Most Viral":
    default:
      return "viral";
  }
}

export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return `${n}`;
}

export function viralLabel(score: number): string {
  if (score >= 8) return "Hot";
  if (score >= 5) return "Rising";
  return "Quiet";
}

export function captureLabel(score: number): string {
  if (score >= 8) return "High potential";
  if (score >= 5) return "Open lane";
  return "Saturated";
}
