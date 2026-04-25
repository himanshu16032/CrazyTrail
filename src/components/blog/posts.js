// Blog post metadata. Heavy article bodies live in their own files and are
// imported lazily so the homepage bundle never pays for them.

export const POSTS = [
  {
    slug: 'find-trending-topics-before-they-blow-up',
    title: 'How to Find Trending Topics Before They Blow Up',
    titleTag: 'How to Find Trending Topics Before They Blow Up | CrazyTrail 2026',
    h1: 'How to Find Trending Topics Before They Blow Up — The 2026 Playbook',
    description: 'Stop posting trends 3 days late. Discover exactly how smart creators find trending topics before they go viral — free methods for Instagram & YouTube. No guessing.',
    keywords: 'find trending topics before they blow up, trending topics for content creators, early trend detection, content ideas instagram 2026, how to find viral topics, trend velocity, viral window, hashtag research, instagram trends, youtube trends',
    category: 'Content Strategy',
    readingTime: '12 min read',
    publishedAt: '2026-04-25',
    updatedAt: '2026-04-25',
    excerpt: 'Two creators post the same topic on the same day. One gets 400 views. The other gets 2.1 million. The difference is four days — not talent. Here is the system to be the second creator.',
    primaryKeyword: 'find trending topics before they blow up',
    loader: () => import('./content/find-trending-topics.jsx'),
  },
  {
    slug: 'exploding-topics-alternative-free',
    title: '7 Best Free Alternatives to Exploding Topics',
    titleTag: '7 Best Free Exploding Topics Alternatives for Creators 2026',
    h1: '7 Best Free Alternatives to Exploding Topics for Content Creators (2026)',
    description: 'Exploding Topics costs $39/month. These 7 free alternatives give you early trend discovery for Instagram and YouTube — without paying a cent.',
    keywords: 'exploding topics alternative free, free trend discovery tool, treendly alternative, alternatives to exploding topics, free tools trending topics creators, exploding topics competitors, glimpse, trendhunter, reddit rising, google trends',
    category: 'Tools & Comparisons',
    readingTime: '10 min read',
    publishedAt: '2026-04-25',
    updatedAt: '2026-04-25',
    excerpt: 'Exploding Topics is genuinely a great product — but $39 a month is brutal when you are a one-person creator. Here are the seven free tools that come closest, ranked.',
    primaryKeyword: 'exploding topics alternative free',
    loader: () => import('./content/exploding-topics-alternative.jsx'),
  },
  {
    slug: 'trending-on-instagram-this-week',
    title: 'What\u2019s Trending on Instagram This Week',
    titleTag: 'What\u2019s Trending on Instagram This Week — Updated April 2026',
    h1: 'What\u2019s Trending on Instagram This Week — April 2026 Edition',
    description: 'Updated weekly. The most viral Instagram trends this week — Reels formats, hashtags, audio, and content ideas gaining traction right now. Plus how to find them before everyone else.',
    keywords: 'what is trending on instagram this week, trending instagram reels, trending instagram hashtags, trending audio instagram, instagram trends april 2026, viral reels formats, instagram content ideas, trending topics instagram',
    category: 'Weekly Trends',
    readingTime: '8 min read',
    publishedAt: '2026-04-21',
    updatedAt: '2026-04-25',
    excerpt: 'A live snapshot of what is moving on Instagram right now — Reel formats, hashtags, audios, and niche-by-niche signals. Refreshed every Monday.',
    primaryKeyword: 'what is trending on instagram this week',
    loader: () => import('./content/trending-on-instagram.jsx'),
  },
];

export function getPost(slug) {
  return POSTS.find((p) => p.slug === slug) || null;
}
