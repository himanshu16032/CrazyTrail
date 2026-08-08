# Plan: Video Search Dashboard

## Context

The existing site is a Virlo-style SaaS landing page (hero → features → pricing → footer).
The user wants a **search dashboard** where typing a query surfaces a grid of video results — mimicking the core product UX of the analytics platform. This turns the static marketing site into a partially interactive product demo.

---

## Approach

Add a **second view** (the Dashboard) inside `src/app/App.tsx` controlled by a single `isDashboard` boolean state. Clicking **"Try Dashboard"** in the nav (or the hero CTA) switches to the dashboard view. A back arrow returns to the landing page. No routing library needed — one component, two views.

---

## Dashboard UX Design

### Layout (top → bottom)
1. **Top bar** — logo + "Back to home" link + "Start free trial" CTA
2. **Search hero** — large centered search input with placeholder _"Search creators, niches, sounds…"_; results appear instantly on keystroke
3. **Filter row** — horizontal pill filters: Platform (All · TikTok · YouTube · Reels) + Sort dropdown (Most Views · Fastest Growing · Most Recent · Most Liked)
4. **Results header** — `"342 videos found for 'fitness'"` line + active filter summary
5. **Video card grid** — responsive 2–4 column CSS grid; each card is a rich mock video tile
6. **Empty state** — when no results match, show a centered message + suggested searches

### Video Card anatomy
Each card contains:
- **Thumbnail** — Unsplash image (relevant to niche) via `https://images.unsplash.com/photo-{id}?w=400&h=220&fit=crop&auto=format`
- **Platform badge** — colored pill (TikTok pink / YouTube red / Reels purple)
- **Creator handle** — `@handle` in muted text
- **Hook/title text** — short video title
- **Stats row** — views, likes, shares (with Lucide icons)
- **Growth badge** — `+XX%` in green if trending
- **Engagement rate** — shown as a small percentage chip
- **Hover state** — card lifts with `shadow-xl shadow-primary/20`, thumbnail gets slight scale

---

## Data

Add a `videoResults` array of **40 mock video objects** directly in `App.tsx`:

```ts
type VideoResult = {
  id: number;
  thumbnail: string;           // Unsplash URL
  platform: "TikTok" | "YouTube" | "Reels";
  creator: string;             // "@handle"
  title: string;               // hook/title
  niche: string;               // "fitness" | "finance" | "beauty" | etc.
  views: string;               // "4.2M"
  likes: string;               // "381K"
  shares: string;              // "42K"
  engagement: string;          // "8.4%"
  growth: string;              // "+34%"
  daysAgo: number;             // for "Most Recent" sort
};
```

Cover niches: fitness, finance, beauty, food, travel, tech, fashion, gaming, wellness, comedy.
Mix all three platforms. Vary follower-scale from micro (50K) to mega (5M+).

---

## State Variables to Add

| Variable | Type | Purpose |
|---|---|---|
| `isDashboard` | `boolean` | Toggles landing ↔ dashboard view |
| `searchQuery` | `string` | Controlled input value |
| `platformFilter` | `string` | `"All"` \| `"TikTok"` \| `"YouTube"` \| `"Reels"` |
| `sortBy` | `string` | `"Most Views"` \| `"Fastest Growing"` \| `"Most Recent"` \| `"Most Liked"` |

Derived (no state): `filteredVideos` — computed from `videoResults` filtered by `searchQuery` (matches title, creator, niche) + `platformFilter`, then sorted by `sortBy`.

---

## Search Logic

```ts
const filteredVideos = videoResults
  .filter((v) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      v.title.toLowerCase().includes(q) ||
      v.creator.toLowerCase().includes(q) ||
      v.niche.toLowerCase().includes(q);
    const matchesPlatform = platformFilter === "All" || v.platform === platformFilter;
    return matchesQuery && matchesPlatform;
  })
  .sort((a, b) => {
    if (sortBy === "Most Views")      return parseFloat(b.views) - parseFloat(a.views);
    if (sortBy === "Fastest Growing") return parseFloat(b.growth) - parseFloat(a.growth);
    if (sortBy === "Most Recent")     return a.daysAgo - b.daysAgo;
    if (sortBy === "Most Liked")      return parseFloat(b.likes) - parseFloat(a.likes);
    return 0;
  });
```

---

## Nav Changes

- Add a **"Try Dashboard →"** button to the desktop nav (between "Blog" and "Sign in") that sets `isDashboard = true`
- The hero's **"Start free trial"** primary CTA also navigates to the dashboard
- Inside the dashboard top bar, a **"← Back"** text link resets `isDashboard = false`

---

## Files to Modify

| File | Change |
|---|---|
| `src/app/App.tsx` | Add `videoResults` data, 4 new state vars, `filteredVideos` derived value, `DashboardView` inline JSX block, nav CTA update, hero CTA update |

No other files need changes. Fonts and theme tokens are already correct for the dark palette.

---

## New Lucide Icons Needed

Add to existing import: `Filter`, `SlidersHorizontal`, `ThumbsUp`, `Share2`, `ArrowLeft`, `Hash`

---

## Unsplash Thumbnail Strategy

Use thematic Unsplash photo IDs per niche (pre-selected, not random):
- fitness: `photo-1571019613454-1cb2f99b2d8b`
- food: `photo-1504674900247-0877df9cc836`
- travel: `photo-1476514525535-07fb3b4ae5f1`
- beauty: `photo-1522337360788-8b13dee7a37e`
- tech: `photo-1518770660439-4636190af475`
- finance: `photo-1611974789855-9c2a0a7236a3`
- fashion: `photo-1490481651871-ab68de25d43d`
- gaming: `photo-1593305841991-05c297ba4575`
- wellness: `photo-1545205597-3d9d02c29597`
- comedy: `photo-1527224857830-43a7acc85260`

Each video gets the photo ID matching its niche (same thumbnail per niche group is fine for a demo).

---

## Verification

1. Run the dev server — landing page renders correctly with the "Try Dashboard →" nav button
2. Click "Try Dashboard →" — switches to dashboard view with search bar focused
3. Type "fitness" — cards filter in real time to fitness-niche videos
4. Type "TikTok" in search or use the TikTok platform pill — filters by platform
5. Change sort to "Fastest Growing" — cards reorder by `growth` value
6. Clear search — all 40 videos show in default grid
7. Type a nonsense query (e.g. "xyzzy") — empty state message appears
8. Click "← Back" — returns to landing page with all original sections intact
9. Mobile (< 768px): grid collapses to 2 columns, filter row scrolls horizontally
