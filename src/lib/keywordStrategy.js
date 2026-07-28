// Competitive keyword tiers for CrazyTrail SEO.
// Rule: low/medium KD → chase if any meaningful traffic; high KD → only if high traffic.

export const COMPETITORS = [
  {
    name: 'Exploding Topics',
    url: 'https://explodingtopics.com',
    price: '$39+/mo',
    weakness: 'Search/macro trends for marketers — weak for Reels & Shorts timing',
    stealKeywords: ['exploding topics alternative', 'exploding topics alternative free', 'exploding topics competitors'],
  },
  {
    name: 'Treendly',
    url: 'https://treendly.com',
    price: '~$8–99/mo',
    weakness: 'Search + e-com skewed; creators must translate signals manually',
    stealKeywords: ['treendly alternative', 'treendly alternative free', 'treendly vs exploding topics'],
  },
  {
    name: 'Glimpse',
    url: 'https://meetglimpse.com',
    price: 'Free tier + $99/mo',
    weakness: 'Google Trends overlay — lags social-first short video',
    stealKeywords: ['glimpse alternative', 'glimpse chrome extension alternative', 'glimpse vs google trends'],
  },
  {
    name: 'ViralSort / Reelyzer',
    url: 'chrome web store',
    price: 'Free / Pro',
    weakness: 'Sorts Reels that already performed — no early-window prediction',
    stealKeywords: ['instagram reels analyzer free', 'find viral reels ideas', 'reels sorter alternative'],
  },
  {
    name: 'ContHunt / Viral Seek / Vuela',
    url: 'various',
    price: 'Paid plans',
    weakness: 'Dashboards + credits; friction for solo creators who want inbox alerts',
    stealKeywords: ['free viral video finder', 'viral video ideas for instagram', 'youtube shorts content ideas free'],
  },
];

export const KEYWORD_TIERS = {
  // High competition — only kept because volume/intent is high
  highCompHighTraffic: [
    {
      keyword: 'exploding topics alternative',
      kd: 'high',
      traffic: 'high',
      intent: 'commercial',
      target: '/blog/exploding-topics-alternative-free',
      action: 'keep_and_dominate',
    },
    {
      keyword: 'what is trending on instagram this week',
      kd: 'high',
      traffic: 'high',
      intent: 'informational',
      target: '/blog/trending-on-instagram-this-week',
      action: 'keep_and_refresh_weekly',
    },
    {
      keyword: 'youtube shorts ideas',
      kd: 'high',
      traffic: 'high',
      intent: 'informational',
      target: '/topics/youtube-shorts-content-ideas',
      action: 'attack_with_long_tail',
    },
  ],
  // Medium KD + real traffic — primary growth bets
  mediumCompTraffic: [
    {
      keyword: 'treendly alternative free',
      kd: 'medium',
      traffic: 'medium',
      intent: 'commercial',
      target: '/topics/treendly-alternative-free',
      action: 'new_page',
    },
    {
      keyword: 'glimpse alternative free',
      kd: 'medium',
      traffic: 'medium',
      intent: 'commercial',
      target: '/topics/glimpse-alternative-free',
      action: 'new_page',
    },
    {
      keyword: 'free trend discovery tool for creators',
      kd: 'medium',
      traffic: 'medium',
      intent: 'commercial',
      target: '/topics/free-trend-tool-instagram-creators',
      action: 'new_page',
    },
    {
      keyword: 'how to find trending topics before they blow up',
      kd: 'medium',
      traffic: 'medium-high',
      intent: 'informational',
      target: '/blog/find-trending-topics-before-they-blow-up',
      action: 'keep',
    },
  ],
  // Low KD long-tails — volume exists, easy wins
  lowCompTraffic: [
    {
      keyword: 'free viral reels ideas',
      kd: 'low',
      traffic: 'medium',
      intent: 'informational',
      target: '/topics/free-viral-reels-ideas',
      action: 'new_page',
    },
    {
      keyword: 'youtube shorts content ideas free',
      kd: 'low',
      traffic: 'medium',
      intent: 'informational',
      target: '/topics/youtube-shorts-content-ideas',
      action: 'new_page',
    },
    {
      keyword: 'hashtag research for reels free',
      kd: 'low',
      traffic: 'medium',
      intent: 'informational',
      target: '/topics/hashtag-research-reels',
      action: 'retarget_existing',
    },
    {
      keyword: 'instagram reels ideas this week',
      kd: 'low-medium',
      traffic: 'medium',
      intent: 'informational',
      target: '/blog/trending-on-instagram-this-week',
      action: 'reinforce',
    },
    {
      keyword: 'ai short video analysis for creators',
      kd: 'low',
      traffic: 'emerging',
      intent: 'informational',
      target: '/topics/ai-short-video-analysis',
      action: 'own_category',
    },
  ],
  // Deprioritize: high KD or brand vanity without enough traffic for a new site
  deprioritize: [
    { keyword: 'LLM video trend detection', reason: 'low search volume — keep as supporting page only' },
    { keyword: 'trending topics', reason: 'ultra-broad head term — do not chase alone' },
    { keyword: 'content ideas', reason: 'high KD, low conversion without niche modifier' },
  ],
};

export const SITEMAP_PRIORITY = {
  'exploding-topics-alternative-free': 0.95,
  'trending-on-instagram-this-week': 0.95,
  'treendly-alternative-free': 0.92,
  'glimpse-alternative-free': 0.92,
  'free-viral-reels-ideas': 0.9,
  'youtube-shorts-content-ideas': 0.9,
  'free-trend-tool-instagram-creators': 0.9,
  'find-trending-topics-before-they-blow-up': 0.88,
  'ai-short-video-analysis': 0.88,
  'youtube-shorts-trending-topics': 0.85,
  'trending-instagram-reels': 0.85,
  'hashtag-research-reels': 0.84,
  'viral-hooks-short-form': 0.82,
  'early-viral-window': 0.8,
  'fitness-reels-trends': 0.78,
  'food-reels-trends': 0.78,
  'fashion-beauty-reels': 0.78,
  'finance-youtube-shorts': 0.78,
  'comedy-shorts-trends': 0.65,
  'llm-video-trend-detection': 0.55,
};
