/**
 * Phase 1 Global UI Data Contracts
 *
 * Derived from `site_blueprint.json` routes covering marketing + product surfaces:
 * `/`, `/pricing`, `/features`, `/solutions`, `/resources`, `/api`, `/mcp`,
 * `/dashboard`, `/orbit`, `/tracking`, `/niches`, `/login`, `/signup`,
 * and feature/solution deep links (tracking-center, outliers, content-research-agent, etc.).
 *
 * UI components should import types from here only — never query MongoDB / Vector DB directly.
 */

/** Short-form platforms surfaced across hero, Orbit, Tracking, and Outliers. */
export type VideoPlatform = "tiktok" | "youtube_shorts" | "instagram_reels";

/** Display labels matching marketing copy (TikTok, YouTube Shorts, Instagram Reels). */
export type VideoPlatformLabel = "TikTok" | "YouTube Shorts" | "Instagram Reels";

/**
 * Video card payload for dashboard grids, Orbit search results, Outliers,
 * Tracking Center feeds, and niche browsing (`/dashboard`, `/orbit`, `/tracking`, `/niches`).
 * Maps to Vector DB video documents in later phases.
 */
export interface VideoCardData {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  views: number;
  /** Virlo capture / potential score (0–10). */
  captureScore: number;
  /** Viral rating / outlier strength (0–10). */
  viralRating: number;
  platform: VideoPlatform;
  tags: string[];
  creatorHandle?: string;
  nicheId?: string;
  publishedAt?: string;
}

/**
 * Overview KPIs for `/dashboard` and Tracking Center summaries.
 * Backed by MongoDB aggregates in later phases.
 */
export interface DashboardMetrics {
  totalViews: number;
  viewTrendPercentage: number;
  activeTrackers: number;
  avgEngagementRate?: number;
  viralVideoCount?: number;
  creatorsTracked?: number;
}

/**
 * Pricing tier for `/pricing` (and CTA copy mirrored on `/`, `/mcp`).
 * Starter / Pro / Enterprise with trial CTAs ("Start for $0", "Book a Demo").
 */
export interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number | null;
  annualPrice?: number | null;
  credits: number | null;
  features: string[];
  ctaLabel: string;
  description?: string;
  highlighted?: boolean;
  trialDays?: number;
}

/**
 * Custom niche category for `/niches`, Content Research Agent, and Tracking Center.
 */
export interface NicheCategory {
  id: string;
  name: string;
  videoCount: number;
  trendScore: number;
  slug?: string;
  hashtags?: string[];
  thumbnailUrl?: string;
}

/**
 * Orbit Search request (`/orbit`, MCP Orbit tools, pricing credit notes: 50 credits/run).
 */
export interface OrbitSearchQuery {
  keyword: string;
  platform?: VideoPlatform | "all";
  filters?: OrbitSearchFilters;
}

export interface OrbitSearchFilters {
  minViews?: number;
  maxDaysAgo?: number;
  nicheId?: string;
  sortBy?: "relevance" | "views" | "viral" | "recent" | "growth";
  limit?: number;
}

/**
 * Authenticated user for `/login`, `/signup`, and workspace-scoped product routes.
 * Persisted in MongoDB in later phases.
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  workspaceId: string;
  avatarUrl?: string;
  planId?: string;
  createdAt?: string;
}

/** Optional filters for trending / outlier video lists. */
export interface VideoFilterOptions {
  platform?: VideoPlatform | "all";
  nicheId?: string;
  minViralRating?: number;
  minCaptureScore?: number;
  tags?: string[];
  sortBy?: "views" | "viral" | "recent" | "growth";
  limit?: number;
}

/** MongoDB-backed workspace container for collections, trackers, and history. */
export interface Workspace {
  id: string;
  name: string;
  ownerId: string;
  planId: string;
  memberCount: number;
}

/** Tracking Center list (`/tracking`, `/features/tracking-center`). */
export interface TrackingList {
  id: string;
  workspaceId: string;
  name: string;
  type: "creator" | "niche" | "hashtag" | "competitor";
  target: string;
  platform: VideoPlatform | "all";
  isActive: boolean;
  lastAlertAt?: string;
}

/** Saved / collection item (Outliers "Save to Collections"). */
export interface CollectionItem {
  id: string;
  workspaceId: string;
  videoId: string;
  collectionName: string;
  savedAt: string;
  notes?: string;
}

/** Orbit / dashboard search history (MongoDB). */
export interface SearchHistoryEntry {
  id: string;
  workspaceId: string;
  userId: string;
  query: OrbitSearchQuery;
  resultCount: number;
  creditsUsed: number;
  createdAt: string;
}

/** Route keys aligned with Phase 1 sitemap product surfaces. */
export type AppRoute =
  | "/"
  | "/pricing"
  | "/features"
  | "/solutions"
  | "/resources"
  | "/api"
  | "/mcp"
  | "/dashboard"
  | "/orbit"
  | "/tracking"
  | "/niches"
  | "/login"
  | "/signup"
  | "/auth/signin"
  | "/auth/signup";
