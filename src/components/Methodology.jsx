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
    title: 'How CrazyTrail’s Short-Video LLM Analyzes Reels & Shorts',
    description: 'Methodology: CrazyTrail uses short-form-specific LLM analysis on hooks, pacing, captions, and velocity to detect Instagram Reels and YouTube Shorts trends 3–5 days early.',
    keywords: 'AI short video analysis methodology, LLM analyze Reels, YouTube Shorts AI detection, CrazyTrail how it works, short form video LLM',
    canonical: `${SITE_URL}/methodology`,
    ogImage: OG_IMAGE,
    ogType: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: 'How CrazyTrail’s Short-Video LLM Analyzes Reels and Shorts',
        description: 'Proprietary short-form video analysis methodology for early trend detection on Instagram Reels and YouTube Shorts.',
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
            How CrazyTrail’s short-video LLM analyzes each rising clip
          </h1>
          <p className="text-dark text-lg md:text-xl leading-relaxed font-medium mb-4">
            <strong>CrazyTrail</strong> is not a generic “AI ideas” blog. It is a short-form intelligence layer: models inspect rising Reels and Shorts, score what is still early, and email creators before Explore saturates the pattern.
          </p>
          <p className="text-dark-light leading-relaxed mb-10">
            That is the new worth on this domain — proprietary short-video analysis, not recycled internet listicles.
          </p>

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
            <h2 className="font-heading font-900 text-2xl text-dark mb-4">Why Google (and creators) should care</h2>
            <ul className="list-disc pl-5 space-y-2 text-dark-light leading-relaxed">
              <li>Original methodology page documenting how short-form LLM analysis works — primary-source signal, not a thin affiliate page.</li>
              <li>Topic cluster covering major short-form domains: platforms, craft, concepts, and niches.</li>
              <li>Fact-dense definitions, signal tables, and FAQs designed for extraction by search and answer engines.</li>
              <li>Clear entity disambiguation: CrazyTrail is a creator trend tool, not delivery/shipping.</li>
            </ul>
            <Link to="/topics" className="inline-flex items-center gap-1.5 mt-5 text-primary font-semibold hover:underline">
              Browse all topic guides <ArrowUpRight className="w-4 h-4" />
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
