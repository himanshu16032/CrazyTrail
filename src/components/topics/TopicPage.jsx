import { lazy, Suspense } from 'react';
import { ArrowLeft, ArrowUpRight, Brain, Send, Sparkles } from 'lucide-react';
import { getTopic, TOPICS } from '../../lib/topics';
import { getPost } from '../blog/posts';
import { Link, navigate } from '../../lib/router';
import { useSeo } from '../../lib/seo';
import { OG_IMAGE, SITE_URL } from '../../lib/siteContent';
import { track } from '../../lib/tracking';
import GradientButton from '../ui/GradientButton';
import { FAQ, ComparisonTable } from '../blog/primitives';
import Breadcrumbs from '../Breadcrumbs';
import CompetitorCompare from '../CompetitorCompare';
import TrustBlock from '../TrustBlock';

const Footer = lazy(() => import('../Footer'));

function NotFound() {
  useSeo({
    title: 'Topic not found · CrazyTrail',
    description: 'That topic guide does not exist.',
    canonical: `${SITE_URL}/topics`,
  });
  return (
    <main className="pt-28 pb-20 bg-cream min-h-screen">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h1 className="font-heading font-900 text-3xl text-dark mb-3">Topic not found</h1>
        <Link to="/topics" className="inline-flex items-center gap-2 text-primary font-semibold">
          <ArrowLeft className="w-4 h-4" /> All topics
        </Link>
      </div>
    </main>
  );
}

export default function TopicPage({ slug }) {
  const topic = getTopic(slug);

  const relatedTopics = topic ? topic.relatedTopics.map(getTopic).filter(Boolean) : [];
  const relatedPosts = topic ? topic.relatedBlog.map(getPost).filter(Boolean) : [];

  useSeo(
    topic
      ? {
          title: topic.titleTag,
          description: topic.description,
          keywords: topic.keywords,
          canonical: `${SITE_URL}/topics/${topic.slug}`,
          ogImage: OG_IMAGE,
          ogType: 'article',
          jsonLd: [
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: topic.h1,
              description: topic.description,
              image: OG_IMAGE,
              datePublished: '2026-07-28T09:00:00+05:30',
              dateModified: '2026-07-28T09:00:00+05:30',
              author: { '@type': 'Organization', name: 'CrazyTrail', url: SITE_URL },
              publisher: {
                '@type': 'Organization',
                name: 'CrazyTrail',
                logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
              },
              mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/topics/${topic.slug}` },
              keywords: topic.keywords,
              about: topic.primaryKeyword,
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Topics', item: `${SITE_URL}/topics` },
                { '@type': 'ListItem', position: 3, name: topic.title, item: `${SITE_URL}/topics/${topic.slug}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: topic.faq.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: `How to use CrazyTrail for ${topic.primaryKeyword}`,
              description: topic.description,
              step: topic.steps.map((s, i) => ({
                '@type': 'HowToStep',
                position: i + 1,
                name: s.name,
                text: s.text,
              })),
            },
          ],
        }
      : { title: 'Topic not found · CrazyTrail' }
  );

  if (!topic) return <NotFound />;

  return (
    <>
      <article className="pt-24 pb-20 md:pt-28 md:pb-28 bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Topics', href: '/topics' },
              { label: topic.title },
            ]}
          />
          <Link to="/topics" className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" /> All topics
          </Link>

          <div className="flex flex-wrap items-center gap-2 text-xs text-dark-light mb-3">
            <span className="bg-primary/10 text-primary font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
              {topic.cluster}
            </span>
            <span className="flex items-center gap-1"><Brain className="w-3.5 h-3.5" /> Short-video AI</span>
          </div>

          <h1 className="font-heading font-900 text-3xl sm:text-4xl md:text-5xl text-dark leading-tight mb-5">
            {topic.h1}
          </h1>
          <p className="text-dark text-lg md:text-xl leading-relaxed font-medium mb-6">{topic.excerpt}</p>

          <CompetitorCompare slug={topic.slug} />

          <div className="my-5 rounded-2xl border-l-4 border-primary/40 bg-primary/5 px-4 py-3">
            <p className="text-dark leading-relaxed">
              <strong className="text-dark font-semibold">{topic.primaryKeyword}</strong> — {topic.definition}
            </p>
            <p className="text-dark-light leading-relaxed mt-2">{topic.whyItMatters}</p>
          </div>

          <section className="mt-10 md:mt-12 scroll-mt-28">
            <h2 className="font-heading font-900 text-2xl md:text-3xl text-dark mb-4 leading-tight">
              How CrazyTrail’s short-video LLM analyzes this
            </h2>
            <p className="text-dark-light leading-relaxed mb-5">
              Unlike search charts or generic “AI content ideas,” CrazyTrail is built around in-depth short-form video analysis — hooks, pacing, captions, and velocity — then mapped to <strong className="text-dark">{topic.primaryKeyword}</strong>.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {topic.aiAngle.map((a) => (
                <div key={a.label} className="bg-white border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <h3 className="font-heading font-bold text-dark text-base">{a.label}</h3>
                  </div>
                  <p className="text-dark-light text-sm leading-relaxed">{a.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 md:mt-12 scroll-mt-28">
            <h2 className="font-heading font-900 text-2xl md:text-3xl text-dark mb-4 leading-tight">
              Signals that matter
            </h2>
            <ComparisonTable
              headers={['Signal', 'What it means']}
              rows={topic.signals.map((s) => [s.signal, s.meaning])}
            />
          </section>

          <section className="mt-10 md:mt-12 scroll-mt-28">
            <h2 className="font-heading font-900 text-2xl md:text-3xl text-dark mb-4 leading-tight">
              How to act on {topic.primaryKeyword}
            </h2>
            <ol className="list-decimal pl-5 space-y-3 text-dark-light leading-relaxed">
              {topic.steps.map((s) => (
                <li key={s.name}>
                  <strong className="text-dark font-semibold">{s.name}</strong> — {s.text}
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10 md:mt-12 scroll-mt-28">
            <h2 className="font-heading font-900 text-2xl md:text-3xl text-dark mb-4 leading-tight">
              Frequently asked questions
            </h2>
            <FAQ items={topic.faq} />
          </section>

          <aside className="mt-12 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <p className="text-dark-light text-sm md:text-base mb-4">
              Get short-video AI alerts for your niche — free, no card, built for Reels and YouTube Shorts.
            </p>
            <GradientButton
              onClick={() => {
                track('topic_cta_click', { slug: topic.slug });
                navigate('/?ref=topic-' + topic.slug);
              }}
              className="w-full sm:w-auto"
            >
              <Send className="w-4 h-4" /> Get free trend alerts
            </GradientButton>
          </aside>

          {relatedTopics.length > 0 && (
            <div className="mt-14">
              <h2 className="font-heading font-bold text-xl text-dark mb-4">Related topic guides</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedTopics.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/topics/${r.slug}`}
                    className="group block bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">{r.cluster}</span>
                    <h3 className="font-heading font-bold text-lg text-dark mt-1 group-hover:text-primary transition-colors">{r.title}</h3>
                    <p className="text-dark-light text-sm mt-2 leading-relaxed">{r.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedPosts.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading font-bold text-xl text-dark mb-4">From the blog</h2>
              <div className="space-y-3">
                {relatedPosts.map((p) => (
                  <Link key={p.slug} to={`/blog/${p.slug}`} className="flex items-center justify-between gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3 hover:shadow-sm">
                    <span className="font-heading font-semibold text-dark">{p.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-primary shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-gray-100">
            <p className="text-dark-light text-sm mb-3">Explore more short-form domains:</p>
            <div className="flex flex-wrap gap-2">
              {TOPICS.filter((t) => t.slug !== topic.slug).slice(0, 8).map((t) => (
                <Link key={t.slug} to={`/topics/${t.slug}`} className="text-xs bg-white border border-gray-100 rounded-full px-3 py-1.5 text-dark-light hover:text-primary hover:border-primary/30">
                  {t.primaryKeyword}
                </Link>
              ))}
            </div>
          </div>

          <TrustBlock />
        </div>
      </article>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
