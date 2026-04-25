import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Send } from 'lucide-react';
import { getPost, POSTS } from './posts';
import { Link, navigate } from '../../lib/router';
import { useSeo } from '../../lib/seo';
import { track } from '../../lib/tracking';
import GradientButton from '../ui/GradientButton';

const Footer = lazy(() => import('../Footer'));

function NotFound() {
  useSeo({
    title: 'Article not found · CrazyTrail',
    description: 'The article you were looking for does not exist anymore.',
    canonical: 'https://www.crazytrail.com/blog',
  });
  return (
    <main className="pt-28 pb-20 bg-cream min-h-screen">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h1 className="font-heading font-900 text-3xl text-dark mb-3">Article not found</h1>
        <p className="text-dark-light mb-6">It might have moved. Browse the rest of the blog instead.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to blog
        </Link>
      </div>
    </main>
  );
}

function ContentLoader({ post }) {
  const [Body, setBody] = useState(null);
  useEffect(() => {
    let alive = true;
    post.loader().then((mod) => { if (alive) setBody(() => mod.default); });
    return () => { alive = false; };
  }, [post]);
  if (!Body) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="w-9 h-9 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }
  return <Body />;
}

export default function BlogPost({ slug }) {
  const post = getPost(slug);

  const related = useMemo(
    () => POSTS.filter((p) => p.slug !== slug).slice(0, 2),
    [slug]
  );

  useEffect(() => {
    if (post) track('blog_post_view', { slug: post.slug, title: post.title });
  }, [post]);

  useSeo(
    post
      ? {
          title: post.titleTag,
          description: post.description,
          keywords: post.keywords,
          canonical: `https://www.crazytrail.com/blog/${post.slug}`,
          ogImage: 'https://www.crazytrail.com/apple-touch-icon.svg',
          ogType: 'article',
          jsonLd: [
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: post.titleTag,
              description: post.description,
              image: 'https://www.crazytrail.com/apple-touch-icon.svg',
              datePublished: post.publishedAt + 'T09:00:00+05:30',
              dateModified: post.updatedAt + 'T09:00:00+05:30',
              author: { '@type': 'Organization', name: 'CrazyTrail', url: 'https://www.crazytrail.com' },
              publisher: {
                '@type': 'Organization',
                name: 'CrazyTrail',
                logo: { '@type': 'ImageObject', url: 'https://www.crazytrail.com/favicon.svg' },
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://www.crazytrail.com/blog/${post.slug}`,
              },
              keywords: post.keywords,
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.crazytrail.com/' },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.crazytrail.com/blog' },
                { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.crazytrail.com/blog/${post.slug}` },
              ],
            },
          ],
        }
      : { title: 'Article not found · CrazyTrail' }
  );

  if (!post) return <NotFound />;

  return (
    <>
      <article className="pt-24 pb-20 md:pt-28 md:pb-28 bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/blog"
              onClick={() => track('blog_back_click', { from: post.slug })}
              className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm mb-6 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> All articles
            </Link>

            <div className="flex flex-wrap items-center gap-2 text-xs text-dark-light mb-3">
              <span className="bg-primary/10 text-primary font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Updated {post.updatedAt}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readingTime}</span>
            </div>

            <h1 className="font-heading font-900 text-3xl sm:text-4xl md:text-5xl text-dark leading-tight mb-6">
              {post.h1}
            </h1>
          </motion.div>

          <div className="prose-blog">
            <ContentLoader post={post} />
          </div>

          {/* Inline CTA */}
          <aside className="not-prose mt-12 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <p className="text-dark-light text-sm md:text-base mb-4">
              Get curated trend signals for your niche delivered to your inbox — no card, no account, just useful emails.
            </p>
            <GradientButton
              onClick={() => {
                track('blog_cta_click', { slug: post.slug, cta: 'inline_get_alerts' });
                navigate('/?ref=blog-' + post.slug);
              }}
              className="w-full sm:w-auto"
            >
              <Send className="w-4 h-4" /> Get free trend alerts
            </GradientButton>
          </aside>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="font-heading font-bold text-xl text-dark mb-4">Keep reading</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    onClick={() => track('blog_card_click', { slug: r.slug, location: 'related', from: post.slug })}
                    className="group block bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">{r.category}</span>
                    <h3 className="font-heading font-bold text-lg text-dark mt-1 group-hover:text-primary transition-colors">{r.title}</h3>
                    <p className="text-dark-light text-sm mt-2 leading-relaxed">{r.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
