export interface MarketingCard {
  title: string;
  body: string;
  href?: string;
}

export interface MarketingPageContent {
  slug: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  ctaLabel?: string;
  ctaTo?: string;
  cards: MarketingCard[];
}

const pages: MarketingPageContent[] = [
  {
    slug: "features",
    eyebrow: "Features",
    title: "Everything you need to win at",
    highlight: "short-form video",
    description:
      "Orbit Search, Tracking Center, Custom Niches, Content Studio, and Meta Ads Library — one research stack.",
    cards: [
      {
        title: "Content Research Agent",
        body: "Run niche research on autopilot and surface hooks, formats, and outliers before they peak.",
        href: "/features/content-research-agent",
      },
      {
        title: "Tracking Center",
        body: "Monitor creators, hashtags, and competitors with alerts when metrics spike.",
        href: "/features/tracking-center",
      },
      {
        title: "Content Canvas",
        body: "Turn research into briefs, scripts, and creative angles inside one workspace.",
        href: "/features/content-canvas",
      },
      {
        title: "Media Generation",
        body: "Generate images, voiceover, and cutdowns grounded in what’s already working.",
        href: "/features/media-generation",
      },
      {
        title: "Meta Ads Library",
        body: "See paid creatives winning your niche across Meta’s short-form inventory.",
        href: "/features/meta-ads-library",
      },
      {
        title: "Outliers",
        body: "Find videos that defy expectations with viral multipliers and fresh discovery filters.",
        href: "/features/outliers",
      },
      {
        title: "TikTok Profile Analyzer",
        body: "Break down creator posting cadence, hooks, and breakout content patterns.",
        href: "/features/tiktok-profile-analyzer",
      },
      {
        title: "Integrations",
        body: "Push alerts to Slack, Discord, Zapier, and webhooks where your team already works.",
        href: "/features/integrations",
      },
      {
        title: "Data Exports",
        body: "Stakeholder-ready CSV, Excel, and JSON exports in under 30 seconds.",
        href: "/features/data-exports",
      },
    ],
  },
  {
    slug: "solutions",
    eyebrow: "Solutions",
    title: "One platform, tailored to",
    highlight: "how you work",
    description:
      "Whether you run an agency, ship ecommerce creatives, or produce UGC — Virlo adapts to your workflow.",
    cards: [
      {
        title: "SMMA / Agencies",
        body: "Prove what’s working for every client with shared trackers and exportable reports.",
        href: "/solutions/smma",
      },
      {
        title: "UGC Creators",
        body: "Stay ahead of trends, brief faster, and grow smarter with early viral signals.",
        href: "/solutions/ugc-creators",
      },
      {
        title: "E-commerce",
        body: "Turn viral moments into paid creative that converts — cut expensive noise.",
        href: "/solutions/e-commerce",
      },
    ],
  },
  {
    slug: "resources",
    eyebrow: "Resources",
    title: "Learn how teams win with",
    highlight: "short-form intelligence",
    description: "FAQs, weekly drops, brand assets, and our mission to democratize viral research.",
    cards: [
      {
        title: "FAQ",
        body: "Credits, trials, Orbit Search, and how Tracking Center alerts work.",
        href: "/resources/faq",
      },
      {
        title: "Monday Drop",
        body: "Weekly content intelligence system for short-form creators.",
        href: "/resources/monday-drop",
      },
      {
        title: "Our Mission",
        body: "Google for short-form — making virality research accessible to every team.",
        href: "/our-mission",
      },
      {
        title: "Brand Kit",
        body: "Logos, colors, and press assets for partners and media.",
        href: "/brand",
      },
      {
        title: "Grant Program",
        body: "Apply for Virality Research Grant funding to study short-form ecosystems.",
        href: "/grant-program",
      },
    ],
  },
  {
    slug: "features/content-research-agent",
    eyebrow: "Feature",
    title: "Your content research,",
    highlight: "on autopilot",
    description: "Set niches once. Virlo watches while you sleep and briefs you on what moved.",
    cards: [
      { title: "Autopilot niches", body: "Daily refresh across platforms with capture and viral scores." },
      { title: "Hook mining", body: "Extract opening lines and formats from breakout posts." },
      { title: "Brief ready", body: "Push findings into Content Studio without leaving the loop." },
    ],
  },
  {
    slug: "features/tracking-center",
    eyebrow: "Feature",
    title: "Stop checking five places",
    highlight: "to know what’s happening",
    description: "One intelligence command center for niches, creators, and competitor alerts.",
    ctaTo: "/tracking",
    ctaLabel: "Open Tracking »",
    cards: [
      { title: "Unified trackers", body: "Creators, niches, hashtags, and competitors in one list." },
      { title: "Smart alerts", body: "Slack, Discord, and webhook pings when metrics spike." },
      { title: "Morning briefing", body: "Cross-platform trend spotting for your team standup." },
    ],
  },
  {
    slug: "features/content-canvas",
    eyebrow: "Feature",
    title: "Your research becomes",
    highlight: "your creative advantage",
    description: "Content Studio turns outliers into scripts, angles, and production-ready briefs.",
    cards: [
      { title: "Research → brief", body: "Convert viral patterns into editable creative canvases." },
      { title: "Team seats", body: "Collaborate on angles without losing attribution." },
      { title: "Export anywhere", body: "Send finished briefs to Notion, Slack, or CSV." },
    ],
  },
  {
    slug: "features/media-generation",
    eyebrow: "Feature",
    title: "Stop shooting content.",
    highlight: "Start generating it",
    description: "AI video, images, and voiceover grounded in what’s already winning your niche.",
    cards: [
      { title: "Niche-aware gens", body: "Generation prompts seeded from live Orbit results." },
      { title: "Voice & visuals", body: "Match tone and pacing from top-performing references." },
      { title: "Iterate fast", body: "Spin variants without rebuilding the brief from scratch." },
    ],
  },
  {
    slug: "features/meta-ads-library",
    eyebrow: "Feature",
    title: "See the paid ads",
    highlight: "winning your niche",
    description: "Competitor ad intelligence across Meta’s short-form inventory.",
    cards: [
      { title: "Creative reverse-engineer", body: "Filter by industry, format, and performance tier." },
      { title: "Hook patterns", body: "Spot opening frames that survive paid spend." },
      { title: "Export creatives", body: "Save winning ads into collections for your team." },
    ],
  },
  {
    slug: "features/outliers",
    eyebrow: "Feature",
    title: "Viral outliers",
    highlight: "before they go big",
    description: "Spot breakthrough content with 50x+ multipliers and fresh discovery filters.",
    ctaTo: "/orbit",
    ctaLabel: "Search Orbit »",
    cards: [
      { title: "Viral multiplier", body: "Rank videos that defy follower expectations." },
      { title: "Fresh window", body: "Catch early posts still inside the discovery window." },
      { title: "Save to collections", body: "Bookmark outliers for briefs and competitor packs." },
    ],
  },
  {
    slug: "features/tiktok-profile-analyzer",
    eyebrow: "Feature",
    title: "TikTok Profile Analyzer",
    description: "Trend discovery and creator analytics for any public TikTok profile.",
    cards: [
      { title: "Cadence & hooks", body: "See posting rhythm and recurring hook formulas." },
      { title: "Breakout posts", body: "Isolate videos that over-indexed vs baseline." },
      { title: "Compare creators", body: "Benchmark against peers in the same niche." },
    ],
  },
  {
    slug: "features/integrations",
    eyebrow: "Feature",
    title: "Stop checking dashboards.",
    highlight: "Let intelligence find you",
    description: "Alerts and automations for Slack, Discord, Zapier, n8n, and webhooks.",
    cards: [
      { title: "Team channels", body: "Route niche spikes to the right Slack channel." },
      { title: "Automation", body: "Kick off Zapier/n8n flows when outliers appear." },
      { title: "Webhooks", body: "Custom webhooks for your internal tooling." },
    ],
  },
  {
    slug: "features/data-exports",
    eyebrow: "Feature",
    title: "Your research, delivered",
    highlight: "exactly how you need it",
    description: "Stakeholder-ready reports in Excel, CSV, and JSON within 30 seconds.",
    cards: [
      { title: "One-click exports", body: "Pull Orbit and tracker tables into sheets instantly." },
      { title: "Scheduled drops", body: "Automate Monday client packs without manual copy." },
      { title: "Data exports", body: "Same fields available via CSV and JSON exports." },
    ],
  },
  {
    slug: "solutions/smma",
    eyebrow: "Solution",
    title: "Short-form intelligence",
    highlight: "for agencies",
    description: "Prove value to clients with shared trackers, exports, and morning briefings.",
    cards: [
      { title: "Client workspaces", body: "Separate niches and trackers per retainer." },
      { title: "Reporting", body: "Export viral wins before the weekly call." },
      { title: "Seats", body: "Bring strategists and creatives into one Pro plan." },
    ],
  },
  {
    slug: "solutions/ugc-creators",
    eyebrow: "Solution",
    title: "Stay ahead of trends,",
    highlight: "create faster",
    description: "Early alerts and Orbit search so UGC teams never brief from stale inspiration.",
    cards: [
      { title: "Trend radar", body: "Know what’s rising 3–5 days before peak." },
      { title: "Brief speed", body: "Turn outliers into shoot lists the same morning." },
      { title: "Portfolio proof", body: "Show brands the data behind your creative calls." },
    ],
  },
  {
    slug: "solutions/e-commerce",
    eyebrow: "Solution",
    title: "Turn viral moments",
    highlight: "into sales",
    description: "Cut creative waste — build ads from formats already winning organic and paid.",
    cards: [
      { title: "Creative intel", body: "Mirror Meta Ads Library winners into your tests." },
      { title: "Niche feeds", body: "Track product categories as custom niches." },
      { title: "Team alerts", body: "Ping growth when a competitor creative spikes." },
    ],
  },
  {
    slug: "resources/faq",
    eyebrow: "Resources",
    title: "Frequently asked",
    highlight: "questions",
    description: "Credits, trials, refunds, and how Orbit Search consumes plan credits.",
    cards: [
      { title: "Free during beta", body: "Everything is free while Virlo is in beta." },
      { title: "Credits", body: "Orbit Search uses 50 credits/run. Niche tracking scales by volume." },
      { title: "Refunds", body: "Contact support within the trial window for a full refund." },
    ],
  },
  {
    slug: "resources/monday-drop",
    eyebrow: "Resources",
    title: "The Monday Drop",
    description: "Weekly content intelligence system for short-form creators.",
    cards: [
      { title: "Weekly pulse", body: "Curated niches, hooks, and outliers every Monday." },
      { title: "Data powered", body: "Same research stack available across the product." },
      { title: "Actionable", body: "Each drop maps to briefs you can ship the same day." },
    ],
  },
  {
    slug: "our-mission",
    eyebrow: "Company",
    title: "Google for",
    highlight: "short-form",
    description: "Democratizing viral content research so every team can move with confidence.",
    cards: [
      { title: "Open research", body: "Grant programs and public methodology notes." },
      { title: "Creator first", body: "Tools that respect attention and reduce tab overload." },
      { title: "Platform fair", body: "TikTok, Reels, and Shorts in one intelligence layer." },
    ],
  },
  {
    slug: "brand",
    eyebrow: "Brand",
    title: "Virlo brand assets",
    description: "Press kit, logos, and color guidance for partners and media.",
    cards: [
      { title: "Logo suite", body: "Primary mark, wordmark, and monochrome variants." },
      { title: "Color", body: "Action blue accents on clean light surfaces." },
      { title: "Usage", body: "Keep clear space and avoid altering the bolt mark." },
    ],
  },
  {
    slug: "grant-program",
    eyebrow: "Grants",
    title: "The Virality Research Grant",
    description: "Apply for funding to study short-form ecosystems with Virlo data access.",
    ctaLabel: "Apply »",
    ctaTo: "/auth/signup",
    cards: [
      { title: "Who can apply", body: "Researchers, labs, and independent analysts." },
      { title: "What you get", body: "Credits, mentorship, and publication support." },
      { title: "Focus areas", body: "Discovery windows, hooks, and cross-platform virality." },
    ],
  },
];

const bySlug = Object.fromEntries(pages.map((p) => [p.slug, p]));

export function getMarketingPage(slug: string): MarketingPageContent | undefined {
  return bySlug[slug.replace(/^\/+/, "")];
}

export function listMarketingSlugs() {
  return pages.map((p) => p.slug);
}
