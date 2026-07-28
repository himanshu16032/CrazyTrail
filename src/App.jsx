import { lazy, Suspense, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { useLocationPath } from './lib/router';
import { trackPageView } from './lib/tracking';
import { useSeo } from './lib/seo';
import { homeJsonLd, OG_IMAGE, SITE_URL } from './lib/siteContent';

const WhatWeProvide      = lazy(() => import('./components/WhatWeProvide'));
const HowItWorks         = lazy(() => import('./components/HowItWorks'));
const WhyCrazyTrail      = lazy(() => import('./components/WhyCrazyTrail'));
const EngagementShowcase = lazy(() => import('./components/EngagementShowcase'));
const FaqSection         = lazy(() => import('./components/FaqSection'));
const SubmitForm         = lazy(() => import('./components/SubmitForm'));
const Footer             = lazy(() => import('./components/Footer'));

const BlogIndex          = lazy(() => import('./components/blog/BlogIndex'));
const BlogPost           = lazy(() => import('./components/blog/BlogPost'));
const TopicsIndex        = lazy(() => import('./components/topics/TopicsIndex'));
const TopicPage          = lazy(() => import('./components/topics/TopicPage'));
const MethodologyPage    = lazy(() => import('./components/Methodology'));
const NotFoundPage       = lazy(() => import('./components/NotFoundPage'));

function SectionFallback({ minH = 'min-h-[40vh]' }) {
  return (
    <div className={`${minH} flex items-center justify-center`}>
      <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
    </div>
  );
}

function HomePage() {
  useSeo({
    title: 'CrazyTrail — Free Early Trend Alerts for Reels & Shorts',
    description: 'Get free weekly Reels and YouTube Shorts topic alerts — scored by short-video AI 3–5 days before peak. No card. Start in under a minute.',
    canonical: `${SITE_URL}/`,
    keywords: 'free trend alerts, AI short video analysis, YouTube Shorts trending topics, trending Instagram Reels, find trending topics before they blow up, early viral window, exploding topics alternative free',
    ogImage: OG_IMAGE,
    ogType: 'website',
    jsonLd: homeJsonLd(),
  });

  return (
    <>
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <WhatWeProvide />
        <HowItWorks />
        <WhyCrazyTrail />
        <EngagementShowcase />
        <FaqSection />
        <SubmitForm />
        <Footer />
      </Suspense>
    </>
  );
}

function UnknownPage() {
  useSeo({
    title: 'Page not found · CrazyTrail',
    description: 'This page does not exist on CrazyTrail.',
    canonical: `${SITE_URL}/`,
    noindex: true,
  });
  return (
    <Suspense fallback={<SectionFallback minH="min-h-[60vh]" />}>
      <NotFoundPage />
    </Suspense>
  );
}

export default function App() {
  const path = useLocationPath();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      trackPageView({ path });
      document.getElementById('seo-static')?.remove();
    }
  }, [path]);

  let view;
  if (path === '/' || path === '') {
    view = <HomePage />;
  } else if (path === '/blog' || path === '/blog/') {
    view = (
      <Suspense fallback={<SectionFallback minH="min-h-[60vh]" />}>
        <BlogIndex />
      </Suspense>
    );
  } else if (path.startsWith('/blog/')) {
    const slug = path.replace(/^\/blog\//, '').replace(/\/$/, '');
    view = (
      <Suspense fallback={<SectionFallback minH="min-h-[60vh]" />}>
        <BlogPost slug={slug} />
      </Suspense>
    );
  } else if (path === '/topics' || path === '/topics/') {
    view = (
      <Suspense fallback={<SectionFallback minH="min-h-[60vh]" />}>
        <TopicsIndex />
      </Suspense>
    );
  } else if (path.startsWith('/topics/')) {
    const slug = path.replace(/^\/topics\//, '').replace(/\/$/, '');
    view = (
      <Suspense fallback={<SectionFallback minH="min-h-[60vh]" />}>
        <TopicPage slug={slug} />
      </Suspense>
    );
  } else if (path === '/methodology' || path === '/methodology/') {
    view = (
      <Suspense fallback={<SectionFallback minH="min-h-[60vh]" />}>
        <MethodologyPage />
      </Suspense>
    );
  } else {
    view = <UnknownPage />;
  }

  return (
    <>
      <Navbar />
      {view}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
