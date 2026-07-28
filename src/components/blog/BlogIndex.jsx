import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { Calendar, Clock, ArrowUpRight, BookOpen, Send } from 'lucide-react';
import { POSTS } from './posts';
import { Link, navigate } from '../../lib/router';
import { useSeo } from '../../lib/seo';
import { OG_IMAGE, SITE_URL } from '../../lib/siteContent';
import { track } from '../../lib/tracking';
import Breadcrumbs from '../Breadcrumbs';
import GradientButton from '../ui/GradientButton';

const Footer = lazy(() => import('../Footer'));

export default function BlogIndex() {
  useSeo({
    title: 'CrazyTrail Blog — Free Trend Alerts & Creator Guides',
    description: 'Guides that help you film earlier — then start free CrazyTrail alerts for Instagram Reels and YouTube Shorts topics 3–5 days before peak.',
    keywords: 'crazytrail blog, free trend alerts, trending topics guides, instagram trends blog, youtube shorts ideas, exploding topics alternative free',
    canonical: `${SITE_URL}/blog`,
    ogImage: OG_IMAGE,
    ogType: 'website',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'CrazyTrail Blog',
        url: `${SITE_URL}/blog`,
        description: 'Creator guides that lead to free CrazyTrail early-window Reels and Shorts alerts.',
        publisher: {
          '@type': 'Organization',
          name: 'CrazyTrail',
          url: SITE_URL,
          logo: `${SITE_URL}/favicon.svg`,
        },
        blogPost: POSTS.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.titleTag,
          description: p.description,
          datePublished: p.publishedAt,
          dateModified: p.updatedAt,
          url: `${SITE_URL}/blog/${p.slug}`,
          author: { '@type': 'Organization', name: 'CrazyTrail' },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        ],
      },
    ],
  });

  return (
    <>
      <main className="pt-28 pb-20 md:pt-32 md:pb-28 bg-cream min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
              <BookOpen className="w-4 h-4" /> CrazyTrail Blog
            </span>
            <h1 className="font-heading font-900 text-4xl sm:text-5xl md:text-6xl text-dark leading-tight mb-4">
              Film earlier.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-pink to-accent-orange">
                Get alerts free.
              </span>
            </h1>
            <p className="text-dark-light text-base md:text-lg max-w-2xl mx-auto">
              Short guides for Instagram and YouTube creators — then start free CrazyTrail digests so early topics hit your inbox every week.
            </p>
            <div className="mt-6 flex justify-center">
              <GradientButton
                onClick={() => {
                  track('blog_index_cta_click');
                  navigate('/?ref=blog');
                }}
              >
                <Send className="w-4 h-4" /> Get free trend alerts
              </GradientButton>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {POSTS.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.45 }}
              >
                <Link
                  to={`/blog/${p.slug}`}
                  onClick={() => track('blog_card_click', { slug: p.slug, location: 'blog_index' })}
                  className="group flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="h-32 bg-gradient-to-br from-primary/15 via-accent-pink/15 to-accent-orange/15 relative">
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-primary text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-5 md:p-6">
                    <h2 className="font-heading font-bold text-lg md:text-xl text-dark leading-snug mb-3 group-hover:text-primary transition-colors">
                      {p.title}
                    </h2>
                    <p className="text-dark-light text-sm leading-relaxed flex-1 mb-4">{p.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-dark-light">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {p.updatedAt}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {p.readingTime}</span>
                      <span className="ml-auto inline-flex items-center gap-1 text-primary font-semibold">
                        Read <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
