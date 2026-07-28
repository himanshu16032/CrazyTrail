export const SITE_URL = 'https://www.crazytrail.com';
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const HOME_FAQS = [
  {
    q: 'What is CrazyTrail?',
    a: 'CrazyTrail is a free alert product for creators. It uses LLMs to analyze rising Instagram Reels and YouTube Shorts — hooks, formats, captions, and velocity — then emails topics 3–5 days before they peak. Start at the homepage form.',
  },
  {
    q: 'Is CrazyTrail a delivery or shipping service?',
    a: 'No. CrazyTrail is not a delivery, shipping, logistics, or travel service. CrazyTrail is a content creator tool for AI-curated trending topics and hashtag research on YouTube and Instagram. The domain crazytrail.com now exclusively serves creators.',
  },
  {
    q: 'How does CrazyTrail AI analyze short videos?',
    a: 'Rising Reels and Shorts are scored for hook family, beat structure, caption motifs, audio adoption, and acceleration. Patterns still inside the early viral window are prioritized; saturated formats are filtered out. See /methodology — then start free alerts on the homepage.',
  },
  {
    q: 'How does CrazyTrail work for creators?',
    a: 'Choose your platform (YouTube Short, YouTube Video, Instagram Post, or Instagram Reel), share interests and hashtags, pick the month you want trends for, and receive AI-curated topics by email. Free — no card.',
  },
  {
    q: 'Is CrazyTrail free to use?',
    a: 'Yes. CrazyTrail is completely free — curated short-form trend alerts with no hidden fees or premium wall for individual creators. Start on the homepage.',
  },
  {
    q: 'What platforms does CrazyTrail support?',
    a: 'YouTube Shorts, YouTube Videos, Instagram Posts, and Instagram Reels. Analysis is optimized for short-form Reels and Shorts behavior.',
  },
  {
    q: 'How do I find trending topics before they blow up?',
    a: 'Start free CrazyTrail alerts that monitor Reels and Shorts before mainstream Explore adoption. The key window is 3–5 days before peak. Pair with TikTok autocomplete and Reddit Rising for extra lead time.',
  },
  {
    q: 'Is there a free alternative to Exploding Topics?',
    a: 'Yes. CrazyTrail is a free Exploding Topics alternative built for Instagram and YouTube creators — short-video LLM alerts instead of enterprise search charts alone. Start free on the homepage.',
  },
  {
    q: 'What is trending on Instagram this week?',
    a: 'CrazyTrail publishes a weekly digest at /blog/trending-on-instagram-this-week — and emails niche topics automatically when you start free alerts.',
  },
];

export const HOME_HOWTO = {
  name: 'How to start CrazyTrail free trend alerts',
  description: 'Get AI-curated Reels and YouTube Shorts topics from short-video LLM analysis delivered to your inbox in four steps.',
  steps: [
    { name: 'Choose Platform', text: 'Pick YouTube Short, YouTube Video, Instagram Post, or Instagram Reel.' },
    { name: 'Share Your Niche', text: 'Tell CrazyTrail your topics and hashtags so LLM scoring matches your audience.' },
    { name: 'Pick Your Month', text: 'Select the month you want trends for so you can plan inside the early viral window.' },
    { name: 'Get AI Alerts', text: 'Receive curated topics, hashtags, and timing notes from short-video velocity analysis by email — free, no card.' },
  ],
};

export function homeJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HOME_FAQS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: HOME_HOWTO.name,
      description: HOME_HOWTO.description,
      totalTime: 'PT5M',
      estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
      step: HOME_HOWTO.steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    },
  ];
}
