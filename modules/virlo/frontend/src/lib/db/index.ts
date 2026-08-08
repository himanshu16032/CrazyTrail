/**
 * Phase 1 Decoupled Data Adapter Layer
 *
 * UI across all sitemap routes imports async helpers from here only.
 * Mock payloads today → swap internals for MongoDB + Vector DB drivers later
 * without changing component call sites.
 *
 * Route coverage (from site_blueprint.json):
 * `/` `/pricing` `/features` `/solutions` `/resources` `/mcp`
 * `/dashboard` `/orbit` `/tracking` `/niches` (+ feature deep links)
 */

import type {
  DashboardMetrics,
  NicheCategory,
  OrbitSearchQuery,
  PricingPlan,
  TrackingList,
  UserProfile,
  VideoCardData,
  VideoFilterOptions,
  VideoPlatform,
  Workspace,
} from "@/types/schema";

const delay = (ms = 40) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const nicheThumb = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?w=400&h=220&fit=crop&auto=format`;

const videoThumb = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?w=400&h=720&fit=crop&auto=format`;

// ---------------------------------------------------------------------------
// Mock stores (stand-ins for MongoDB + Vector DB)
// ---------------------------------------------------------------------------

const mockUser: UserProfile = {
  id: "user_01",
  name: "Alex Rivera",
  email: "alex@virlo.ai",
  workspaceId: "ws_virlo_demo",
  planId: "plan_pro",
  avatarUrl: undefined,
  createdAt: "2025-11-12T10:00:00.000Z",
};

const mockWorkspace: Workspace = {
  id: "ws_virlo_demo",
  name: "Virlo Demo Workspace",
  ownerId: mockUser.id,
  planId: "plan_pro",
  memberCount: 3,
};

/** Pricing plans — Free + Pro ($5/mo). Beta: everything free for now. */
const mockPricingPlans: PricingPlan[] = [
  {
    id: "plan_free",
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    credits: 2000,
    description: "Solo operators & freelancers",
    features: [
      "2,000 plan credits/month",
      "Daily data refresh",
      "Custom Niches",
      "Orbit Search",
      "Tracking Center",
      "Meta Ads Library",
      "Excel / CSV / JSON exports",
    ],
    ctaLabel: "Get started",
    highlighted: false,
  },
  {
    id: "plan_pro",
    name: "Pro",
    monthlyPrice: 5,
    annualPrice: 5,
    credits: 12000,
    description: "Growing agencies & teams",
    features: [
      "12,000 plan credits/month",
      "Everything in Free",
      "3 Team Seats Included",
      "Slack, Discord & webhook alerts",
      "Zapier & n8n integrations",
      "Performing Meta Ads Library",
      "Priority support",
    ],
    ctaLabel: "Get started",
    highlighted: true,
  },
];

const mockNiches: NicheCategory[] = [
  {
    id: "niche_fitness",
    name: "Fitness",
    slug: "fitness",
    videoCount: 18420,
    trendScore: 8.7,
    hashtags: ["#gymtok", "#fitnessmotivation", "#workoutroutine"],
    thumbnailUrl: nicheThumb("1571019613454-1cb2f99b2d8b"),
  },
  {
    id: "niche_finance",
    name: "Finance",
    slug: "finance",
    videoCount: 12680,
    trendScore: 8.1,
    hashtags: ["#moneytok", "#personalfinance", "#investing"],
    thumbnailUrl: nicheThumb("1611974789855-9c2a0a7236a3"),
  },
  {
    id: "niche_beauty",
    name: "Beauty",
    slug: "beauty",
    videoCount: 22140,
    trendScore: 9.2,
    hashtags: ["#skincare", "#makeuptutorial", "#glassskin"],
    thumbnailUrl: nicheThumb("1522337360788-8b13dee7a37e"),
  },
  {
    id: "niche_food",
    name: "Food",
    slug: "food",
    videoCount: 19850,
    trendScore: 8.9,
    hashtags: ["#foodtok", "#easyrecipes", "#mealprep"],
    thumbnailUrl: nicheThumb("1504674900247-0877df9cc836"),
  },
  {
    id: "niche_travel",
    name: "Travel",
    slug: "travel",
    videoCount: 9420,
    trendScore: 7.4,
    hashtags: ["#traveltok", "#budgettravel", "#wanderlust"],
    thumbnailUrl: nicheThumb("1476514525535-07fb3b4ae5f1"),
  },
  {
    id: "niche_tech",
    name: "Tech",
    slug: "tech",
    videoCount: 11320,
    trendScore: 8.5,
    hashtags: ["#techtok", "#gadgets", "#aitools"],
    thumbnailUrl: nicheThumb("1518770660439-4636190af475"),
  },
  {
    id: "niche_fashion",
    name: "Fashion",
    slug: "fashion",
    videoCount: 15760,
    trendScore: 7.9,
    hashtags: ["#outfitinspo", "#thriftflip", "#styletips"],
    thumbnailUrl: nicheThumb("1490481651871-ab68de25d43d"),
  },
  {
    id: "niche_gaming",
    name: "Gaming",
    slug: "gaming",
    videoCount: 20410,
    trendScore: 9.0,
    hashtags: ["#gamingclips", "#speedrun", "#clutch"],
    thumbnailUrl: nicheThumb("1593305841991-05c297ba4575"),
  },
  {
    id: "niche_wellness",
    name: "Wellness",
    slug: "wellness",
    videoCount: 8760,
    trendScore: 7.6,
    hashtags: ["#mentalhealth", "#mindfulness", "#selfcare"],
    thumbnailUrl: nicheThumb("1545205597-3d9d02c29597"),
  },
  {
    id: "niche_comedy",
    name: "Comedy",
    slug: "comedy",
    videoCount: 26350,
    trendScore: 9.4,
    hashtags: ["#comedyskit", "#pov", "#relatable"],
    thumbnailUrl: nicheThumb("1527224857830-43a7acc85260"),
  },
];

/** Vector-DB-shaped video documents for Orbit, dashboard, niches, and outliers. */
const mockVideos: VideoCardData[] = [
  {
    id: "vid_001",
    title: "The 12-3-30 treadmill routine that broke the internet",
    thumbnail: videoThumb("1571019613454-1cb2f99b2d8b"),
    videoUrl: "https://www.tiktok.com/@fitlife_anna/video/001",
    views: 5_400_000,
    captureScore: 8.2,
    viralRating: 9.1,
    platform: "tiktok",
    tags: ["fitness", "workout", "treadmill"],
    creatorHandle: "@fitlife_anna",
    nicheId: "niche_fitness",
    publishedAt: "2026-08-06T08:00:00.000Z",
  },
  {
    id: "vid_002",
    title: "Why your emergency fund is losing you money",
    thumbnail: videoThumb("1611974789855-9c2a0a7236a3"),
    videoUrl: "https://www.youtube.com/shorts/vid_002",
    views: 3_100_000,
    captureScore: 7.4,
    viralRating: 8.3,
    platform: "youtube_shorts",
    tags: ["finance", "hysa", "savings"],
    creatorHandle: "@moneymind_raf",
    nicheId: "niche_finance",
    publishedAt: "2026-08-04T12:00:00.000Z",
  },
  {
    id: "vid_003",
    title: "The 5-minute glass skin routine dermatologists love",
    thumbnail: videoThumb("1522337360788-8b13dee7a37e"),
    videoUrl: "https://www.instagram.com/reel/vid_003",
    views: 4_700_000,
    captureScore: 8.8,
    viralRating: 9.0,
    platform: "instagram_reels",
    tags: ["beauty", "skincare", "glassskin"],
    creatorHandle: "@glowbyzara",
    nicheId: "niche_beauty",
    publishedAt: "2026-08-05T15:30:00.000Z",
  },
  {
    id: "vid_004",
    title: "One-pan butter chicken in under 20 minutes",
    thumbnail: videoThumb("1504674900247-0877df9cc836"),
    videoUrl: "https://www.tiktok.com/@cookwithme_raj/video/004",
    views: 6_100_000,
    captureScore: 9.1,
    viralRating: 9.6,
    platform: "tiktok",
    tags: ["food", "recipes", "weeknight"],
    creatorHandle: "@cookwithme_raj",
    nicheId: "niche_food",
    publishedAt: "2026-08-07T18:00:00.000Z",
  },
  {
    id: "vid_005",
    title: "Japan on $40 a day — the full breakdown",
    thumbnail: videoThumb("1476514525535-07fb3b4ae5f1"),
    videoUrl: "https://www.instagram.com/reel/vid_005",
    views: 3_800_000,
    captureScore: 7.9,
    viralRating: 8.7,
    platform: "instagram_reels",
    tags: ["travel", "budget", "japan"],
    creatorHandle: "@nomad_elle",
    nicheId: "niche_travel",
    publishedAt: "2026-08-05T09:00:00.000Z",
  },
  {
    id: "vid_006",
    title: "5 AI tools that replaced my whole workflow",
    thumbnail: videoThumb("1518770660439-4636190af475"),
    videoUrl: "https://www.tiktok.com/@aitools_daily/video/006",
    views: 2_840_000,
    captureScore: 8.5,
    viralRating: 9.2,
    platform: "tiktok",
    tags: ["tech", "ai", "productivity"],
    creatorHandle: "@aitools_daily",
    nicheId: "niche_tech",
    publishedAt: "2026-08-07T11:00:00.000Z",
  },
  {
    id: "vid_007",
    title: "Capsule wardrobe: 12 pieces, 30 outfits",
    thumbnail: videoThumb("1490481651871-ab68de25d43d"),
    videoUrl: "https://www.instagram.com/reel/vid_007",
    views: 5_100_000,
    captureScore: 8.0,
    viralRating: 8.9,
    platform: "instagram_reels",
    tags: ["fashion", "capsule", "outfits"],
    creatorHandle: "@urbanstyle_lu",
    nicheId: "niche_fashion",
    publishedAt: "2026-08-04T16:00:00.000Z",
  },
  {
    id: "vid_008",
    title: "The 1v5 clutch that ended the tournament",
    thumbnail: videoThumb("1593305841991-05c297ba4575"),
    videoUrl: "https://www.tiktok.com/@clutchplays_ky/video/008",
    views: 4_900_000,
    captureScore: 6.8,
    viralRating: 9.8,
    platform: "tiktok",
    tags: ["gaming", "clutch", "esports"],
    creatorHandle: "@clutchplays_ky",
    nicheId: "niche_gaming",
    publishedAt: "2026-08-07T20:00:00.000Z",
  },
  {
    id: "vid_009",
    title: "The breathing pattern that stops a panic spiral",
    thumbnail: videoThumb("1545205597-3d9d02c29597"),
    videoUrl: "https://www.instagram.com/reel/vid_009",
    views: 3_400_000,
    captureScore: 8.6,
    viralRating: 8.8,
    platform: "instagram_reels",
    tags: ["wellness", "anxiety", "breathing"],
    creatorHandle: "@calmwith_iris",
    nicheId: "niche_wellness",
    publishedAt: "2026-08-06T07:00:00.000Z",
  },
  {
    id: "vid_010",
    title: "POV: your group chat plans a trip",
    thumbnail: videoThumb("1527224857830-43a7acc85260"),
    videoUrl: "https://www.tiktok.com/@maya_creates/video/010",
    views: 7_200_000,
    captureScore: 7.1,
    viralRating: 9.9,
    platform: "tiktok",
    tags: ["comedy", "pov", "relatable"],
    creatorHandle: "@maya_creates",
    nicheId: "niche_comedy",
    publishedAt: "2026-08-07T14:00:00.000Z",
  },
  {
    id: "vid_011",
    title: "This $200 laptop outperforms a MacBook Air",
    thumbnail: videoThumb("1517336714731-489689fd1ca8"),
    videoUrl: "https://www.youtube.com/shorts/vid_011",
    views: 4_200_000,
    captureScore: 7.6,
    viralRating: 8.5,
    platform: "youtube_shorts",
    tags: ["tech", "laptop", "review"],
    creatorHandle: "@techreviews_jk",
    nicheId: "niche_tech",
    publishedAt: "2026-08-06T13:00:00.000Z",
  },
  {
    id: "vid_012",
    title: "Drugstore dupes that beat $80 foundation",
    thumbnail: videoThumb("1596462502278-27bfdc403348"),
    videoUrl: "https://www.tiktok.com/@makeup_by_noor/video/012",
    views: 2_260_000,
    captureScore: 8.3,
    viralRating: 8.4,
    platform: "tiktok",
    tags: ["beauty", "dupes", "makeup"],
    creatorHandle: "@makeup_by_noor",
    nicheId: "niche_beauty",
    publishedAt: "2026-08-02T10:00:00.000Z",
  },
];

const mockTrackers: TrackingList[] = [
  {
    id: "trk_001",
    workspaceId: mockWorkspace.id,
    name: "Competitor — Glow Labs",
    type: "competitor",
    target: "@glowlabs",
    platform: "instagram_reels",
    isActive: true,
    lastAlertAt: "2026-08-08T06:15:00.000Z",
  },
  {
    id: "trk_002",
    workspaceId: mockWorkspace.id,
    name: "Niche — Fitness outliers",
    type: "niche",
    target: "niche_fitness",
    platform: "all",
    isActive: true,
    lastAlertAt: "2026-08-08T05:40:00.000Z",
  },
  {
    id: "trk_003",
    workspaceId: mockWorkspace.id,
    name: "Creator — @maya_creates",
    type: "creator",
    target: "@maya_creates",
    platform: "tiktok",
    isActive: true,
  },
  {
    id: "trk_004",
    workspaceId: mockWorkspace.id,
    name: "Hashtag — #techtok",
    type: "hashtag",
    target: "#techtok",
    platform: "tiktok",
    isActive: false,
  },
];

const mockMetrics: DashboardMetrics = {
  totalViews: 248_400_000,
  viewTrendPercentage: 23.7,
  activeTrackers: mockTrackers.filter((t) => t.isActive).length,
  avgEngagementRate: 8.4,
  viralVideoCount: 342,
  creatorsTracked: 1247,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function matchesPlatform(
  video: VideoCardData,
  platform?: VideoPlatform | "all"
): boolean {
  if (!platform || platform === "all") return true;
  return video.platform === platform;
}

function applyVideoFilters(
  videos: VideoCardData[],
  filters?: VideoFilterOptions
): VideoCardData[] {
  let result = [...videos];

  if (filters?.platform) {
    result = result.filter((v) => matchesPlatform(v, filters.platform));
  }
  if (filters?.nicheId) {
    result = result.filter((v) => v.nicheId === filters.nicheId);
  }
  if (filters?.minViralRating != null) {
    result = result.filter((v) => v.viralRating >= filters.minViralRating!);
  }
  if (filters?.minCaptureScore != null) {
    result = result.filter((v) => v.captureScore >= filters.minCaptureScore!);
  }
  if (filters?.tags?.length) {
    const wanted = filters.tags.map((t) => t.toLowerCase());
    result = result.filter((v) =>
      v.tags.some((tag) => wanted.includes(tag.toLowerCase()))
    );
  }

  const sortBy = filters?.sortBy ?? "viral";
  result.sort((a, b) => {
    switch (sortBy) {
      case "views":
        return b.views - a.views;
      case "recent":
        return (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");
      case "growth":
        return b.captureScore - a.captureScore;
      case "viral":
      default:
        return b.viralRating - a.viralRating;
    }
  });

  if (filters?.limit != null) {
    result = result.slice(0, filters.limit);
  }

  return result;
}

// ---------------------------------------------------------------------------
// Public adapters — swap implementations later; keep these signatures stable
// ---------------------------------------------------------------------------

/** `/dashboard` overview KPIs. */
export async function getOverviewMetrics(): Promise<DashboardMetrics> {
  await delay();
  // Later: MongoDB aggregate on workspace trackers + Vector DB view sums
  return { ...mockMetrics };
}

/** Trending / outlier videos for dashboard, home social proof, and Outliers. */
export async function getTrendingVideos(
  filters?: VideoFilterOptions
): Promise<VideoCardData[]> {
  await delay();
  // Later: Vector DB similarity + metadata filters
  return applyVideoFilters(mockVideos, {
    sortBy: "viral",
    limit: 12,
    ...filters,
  });
}

/** `/pricing` plan cards (+ CTA copy reused on marketing routes). */
export async function getPricingPlans(): Promise<PricingPlan[]> {
  await delay();
  // Later: MongoDB `plans` collection or billing provider sync
  return mockPricingPlans.map((p) => ({ ...p, features: [...p.features] }));
}

/** `/niches` category grid + Tracking Center niche pickers. */
export async function getNicheCategories(): Promise<NicheCategory[]> {
  await delay();
  // Later: MongoDB niches + Vector DB counts per niche embedding cluster
  return mockNiches.map((n) => ({
    ...n,
    hashtags: n.hashtags ? [...n.hashtags] : undefined,
  }));
}

/**
 * `/orbit` keyword search across short-form platforms.
 * Credit note from pricing blueprint: Orbit Search uses 50 credits/run.
 */
export async function executeOrbitSearch(
  query: OrbitSearchQuery
): Promise<VideoCardData[]> {
  await delay(80);
  // Later: Vector DB semantic search + MongoDB search history write
  const keyword = query.keyword.trim().toLowerCase();
  const filters = query.filters ?? {};

  let results = mockVideos.filter((v) => matchesPlatform(v, query.platform));

  if (keyword) {
    results = results.filter((v) => {
      const haystack = [
        v.title,
        v.creatorHandle ?? "",
        ...v.tags,
        v.nicheId ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(keyword);
    });
  }

  if (filters.nicheId) {
    results = results.filter((v) => v.nicheId === filters.nicheId);
  }
  if (filters.minViews != null) {
    results = results.filter((v) => v.views >= filters.minViews!);
  }
  if (filters.maxDaysAgo != null) {
    const cutoff = Date.now() - filters.maxDaysAgo * 86_400_000;
    results = results.filter((v) => {
      if (!v.publishedAt) return true;
      return new Date(v.publishedAt).getTime() >= cutoff;
    });
  }

  const sortBy = filters.sortBy ?? "relevance";
  results.sort((a, b) => {
    switch (sortBy) {
      case "views":
        return b.views - a.views;
      case "viral":
        return b.viralRating - a.viralRating;
      case "growth":
        return b.captureScore - a.captureScore;
      case "recent":
        return (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");
      case "relevance":
      default:
        return b.viralRating * b.views - a.viralRating * a.views;
    }
  });

  return results.slice(0, filters.limit ?? 24);
}

/** Current user profile for `/login`, `/signup`, and workspace chrome. */
export async function getCurrentUser(): Promise<UserProfile> {
  await delay();
  // Later: MongoDB session → users collection
  return { ...mockUser };
}

/** Active workspace for dashboard / tracking / niches. */
export async function getWorkspace(workspaceId?: string): Promise<Workspace> {
  await delay();
  // Later: MongoDB workspaces.findById
  if (workspaceId && workspaceId !== mockWorkspace.id) {
    return { ...mockWorkspace, id: workspaceId };
  }
  return { ...mockWorkspace };
}

/** `/tracking` lists for Tracking Center. */
export async function getTrackingLists(
  workspaceId?: string
): Promise<TrackingList[]> {
  await delay();
  // Later: MongoDB tracking_lists.find({ workspaceId })
  const ws = workspaceId ?? mockWorkspace.id;
  return mockTrackers
    .filter((t) => t.workspaceId === ws)
    .map((t) => ({ ...t }));
}

/** Videos belonging to a niche — used by `/niches` detail views. */
export async function getVideosByNiche(
  nicheId: string,
  filters?: Omit<VideoFilterOptions, "nicheId">
): Promise<VideoCardData[]> {
  return getTrendingVideos({ ...filters, nicheId });
}

export type {
  DashboardMetrics,
  NicheCategory,
  OrbitSearchQuery,
  PricingPlan,
  TrackingList,
  UserProfile,
  VideoCardData,
  VideoFilterOptions,
  Workspace,
};
