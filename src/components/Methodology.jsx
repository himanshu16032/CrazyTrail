import { lazy, Suspense } from 'react';
import { Brain, ScanSearch, Gauge, Mail, ArrowUpRight } from 'lucide-react';
import { Link, navigate } from '../lib/router';
import { useSeo } from '../lib/seo';
import { OG_IMAGE, SITE_URL } from '../lib/siteContent';
import { track } from '../lib/tracking';
import GradientButton from './ui/GradientButton';
import { FAQ } from './blog/primitives';
import Breadcrumbs from './Breadcrumbs';
import TrustBlock from './TrustBlock';

const Footer = lazy(() => import('./Footer'));

const STAGES = [
  {
    icon: ScanSearch,
    title: '1. Short-video intake',
    body: 'CrazyTrail prioritizes Instagram Reels and YouTube Shorts signals in a creator’s niche — rising clips with outsized engagement relative to follower count, not generic web search charts.',
  },
  {
    icon: Brain,
    title: '2. LLM / multimodal analysis per video',
    body: 'Each rising sample is broken down: first-3-second hook family, beat structure, on-screen text themes, caption motifs, audio adoption band, and whether the pattern is a transferable format or a one-off personality moment.',
  },
  {
    icon: Gauge,
    title: '3. Velocity + saturation scoring',
    body: 'Patterns are ranked by acceleration inside the early viral window (typically 3–5 days). Formats past useful thresholds — e.g. audio beyond ~2M Reels — are filtered so creators do not post late.',
  },
  {
    icon: Mail,
    title: '4. Niche alerts creators can film today',
    body: 'Output is not a dashboard of noise. Creators get curated topics, hashtags, and timing context by email — designed for same-day execution on Reels or Shorts.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'What makes CrazyTrail different from normal trend websites?',
    a: 'Most trend sites summarize search or news. CrazyTrail is short-video-native: LLMs analyze Reels and Shorts patterns — hooks, formats, velocity — then deliver early-window alerts for creators.',
  },
  {
    q: 'Do you analyze every video on the internet?',
    a: 'No. Coverage focuses on rising short-form signals relevant to Instagram and YouTube creator niches, where early detection creates the most leverage.',
  },
  {
    q: 'Is this the same as ChatGPT writing content ideas?',
    a: 'No. Generative brainstorming invents ideas from training data. CrazyTrail scores live short-form acceleration so you act on what is actually spreading now.',
  },
  {
    q: 'Which platforms are supported?',
    a: 'YouTube Shorts, YouTube Videos, Instagram Posts, and Instagram Reels. The analysis stack is optimized for short-form Reels and Shorts behavior.',
  },
];

export default function MethodologyPage() {
  useSeo({
    title: 'How CrazyTrail Finds Early Reels & Shorts Trends',
    description: 'See how CrazyTrail’s short-video LLM scores hooks and velocity — then get free weekly alerts 3–5 days before Reels and Shorts topics peak.',
    keywords: 'CrazyTrail how it works, AI short video analysis methodology, free Reels trend alerts, YouTube Shorts AI detection, short form video LLM',
    canonical: `${SITE_URL}/methodology`,
    ogImage: OG_IMAGE,
    ogType: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: 'How CrazyTrail Finds Early Reels and Shorts Trends',
        description: 'How CrazyTrail turns short-form LLM analysis into free early-window alerts for Instagram and YouTube creators.',
        image: OG_IMAGE,
        datePublished: '2026-07-28T09:00:00+05:30',
        dateModified: '2026-07-28T09:00:00+05:30',
        author: { '@type': 'Organization', name: 'CrazyTrail', url: SITE_URL },
        publisher: {
          '@type': 'Organization',
          name: 'CrazyTrail',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/methodology` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Methodology', item: `${SITE_URL}/methodology` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How CrazyTrail analyzes short-form videos for early trends',
        step: STAGES.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.title,
          text: s.body,
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  });

  return (
    <>
      <main className="pt-24 pb-20 md:pt-28 md:pb-28 bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Methodology' }]} />
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
            <Brain className="w-4 h-4" /> Methodology
          </span>
          <h1 className="font-heading font-900 text-3xl sm:text-4xl md:text-5xl text-dark leading-tight mb-5">
            How CrazyTrail turns short-video AI into alerts you can film today
          </h1>
          <p className="text-dark text-lg md:text-xl leading-relaxed font-medium mb-4">
            <strong>CrazyTrail</strong> is not a generic “AI ideas” blog. It is a free alert product: models inspect rising Reels and Shorts, score what is still early, and email you before Explore saturates the pattern.
          </p>
          <p className="text-dark-light leading-relaxed mb-8">
            Read the pipeline below — or skip ahead and start free weekly digests for your niche.
          </p>
          <div className="mb-10">
            <GradientButton
              onClick={() => {
                track('methodology_cta_click', { location: 'top' });
                navigate('/?ref=methodology');
              }}
            >
              Get free short-video trend alerts
            </GradientButton>
          </div>

          <div className="space-y-4 mb-12">
            {STAGES.map((s) => (
              <div key={s.title} className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-lg text-dark mb-2">{s.title}</h2>
                    <p className="text-dark-light leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <section className="mb-12">
            <h2 className="font-heading font-900 text-2xl text-dark mb-4">What you get after signup</h2>
            <ul className="list-disc pl-5 space-y-2 text-dark-light leading-relaxed">
              <li>Weekly niche topics still inside the early viral window (typically 3–5 days before peak).</li>
              <li>Hooks, formats, and hashtag context you can film the same day on Reels or Shorts.</li>
              <li>Free for individual creators — no dashboard tax, no card required to start.</li>
              <li>Clear product identity: CrazyTrail is a creator trend alert tool, not delivery/shipping.</li>
            </ul>
            <Link to="/topics" className="inline-flex items-center gap-1.5 mt-5 text-primary font-semibold hover:underline">
              Browse topic guides <ArrowUpRight className="w-4 h-4" />
            </Link>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-900 text-2xl text-dark mb-4">FAQ</h2>
            <FAQ items={FAQ_ITEMS} />
          </section>

          <aside className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <p className="text-dark-light mb-4">Want the output of this pipeline in your inbox?</p>
            <GradientButton
              onClick={() => {
                track('methodology_cta_click');
                navigate('/?ref=methodology');
              }}
            >
              Get free short-video trend alerts
            </GradientButton>
          </aside>

          <TrustBlock />
        </div>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
