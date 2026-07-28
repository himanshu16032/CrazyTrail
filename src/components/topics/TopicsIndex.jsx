import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Brain, Layers } from 'lucide-react';
import { TOPICS, topicsByCluster } from '../../lib/topics';
import { Link } from '../../lib/router';
import { useSeo } from '../../lib/seo';
import { OG_IMAGE, SITE_URL } from '../../lib/siteContent';
import { track } from '../../lib/tracking';

const Footer = lazy(() => import('../Footer'));

const CLUSTER_ORDER = ['Competitor Steal', 'Differentiator', 'Platform', 'Craft', 'Concept', 'Niche'];

export default function TopicsIndex() {
  const grouped = topicsByCluster();
  const steal = TOPICS.filter((t) => t.cluster === 'Competitor Steal');

  useSeo({
    title: 'Free Topic Guides for Reels & Shorts | CrazyTrail',
    description: 'Rank for Treendly alternative, Glimpse alternative, free viral Reels ideas, and YouTube Shorts content ideas — medium/low competition keywords with real traffic, plus high-volume commercial terms.',
    keywords: 'Treendly alternative free, Glimpse alternative free, free viral Reels ideas, YouTube Shorts content ideas free, free trend tool for Instagram creators, exploding topics alternative',
    canonical: `${SITE_URL}/topics`,
    ogImage: OG_IMAGE,
    ogType: 'website',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'CrazyTrail Topic Guides',
        url: `${SITE_URL}/topics`,
        description: 'Competitor-intercept and short-form trend guides for Instagram Reels and YouTube Shorts creators.',
        hasPart: TOPICS.map((t) => ({
          '@type': 'Article',
          name: t.title,
          url: `${SITE_URL}/topics/${t.slug}`,
          description: t.description,
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Topics', item: `${SITE_URL}/topics` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: TOPICS.map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: t.title,
          url: `${SITE_URL}/topics/${t.slug}`,
        })),
      },
    ],
  });

  return (
    <>
      <main className="pt-28 pb-20 md:pt-32 md:pb-28 bg-cream min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
              <Layers className="w-4 h-4" /> Keyword War Room
            </span>
            <h1 className="font-heading font-900 text-4xl sm:text-5xl md:text-6xl text-dark leading-tight mb-4">
              Cut into competitor traffic —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-pink to-accent-orange">
                smart KD, real volume.
              </span>
            </h1>
            <p className="text-dark-light text-base md:text-lg max-w-3xl mx-auto">
              Medium/low-competition queries with traffic first. High-competition terms only when search volume justifies the fight — Exploding Topics, Instagram weekly trends, Shorts ideas.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/methodology" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
                <Brain className="w-4 h-4" /> How the AI analyzes each video
              </Link>
            </div>
          </motion.div>

          {steal.length > 0 && (
            <section className="mb-12 bg-white border border-primary/15 rounded-3xl p-5 md:p-8">
              <h2 className="font-heading font-bold text-xl text-dark mb-2">Competitor intercept pages</h2>
              <p className="text-dark-light text-sm mb-5 max-w-3xl">
                People searching Treendly, Glimpse, and “free viral Reels ideas” are already shopping. These pages sit on that intent and route them to CrazyTrail’s free short-form alerts.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {steal.map((t) => (
                  <Link
                    key={t.slug}
                    to={`/topics/${t.slug}`}
                    onClick={() => track('topic_card_click', { slug: t.slug, location: 'competitor_steal' })}
                    className="group block bg-cream rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-accent-orange">{t.seoTier || 'steal'} KD</span>
                    <h3 className="font-heading font-bold text-dark mt-1 group-hover:text-primary transition-colors">{t.primaryKeyword}</h3>
                    <p className="text-dark-light text-sm mt-1 line-clamp-2">{t.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {CLUSTER_ORDER.filter((c) => grouped[c]).map((cluster) => (
            <section key={cluster} className="mb-12">
              <h2 className="font-heading font-bold text-xl text-dark mb-4">{cluster}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {grouped[cluster].map((t, i) => (
                  <motion.div
                    key={t.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                  >
                    <Link
                      to={`/topics/${t.slug}`}
                      onClick={() => track('topic_card_click', { slug: t.slug, location: 'topics_index' })}
                      className="group flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 md:p-6"
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-2">{t.primaryKeyword}</span>
                      <h3 className="font-heading font-bold text-lg text-dark group-hover:text-primary transition-colors mb-2">{t.title}</h3>
                      <p className="text-dark-light text-sm leading-relaxed flex-1">{t.excerpt}</p>
                      <div className="flex items-center gap-1.5 mt-4 text-primary font-semibold text-sm">
                        Open guide <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
