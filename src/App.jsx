import { lazy, Suspense, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { useLocationPath } from './lib/router';
import { trackPageView } from './lib/tracking';

const WhatWeProvide      = lazy(() => import('./components/WhatWeProvide'));
const HowItWorks         = lazy(() => import('./components/HowItWorks'));
const WhyCrazyTrail      = lazy(() => import('./components/WhyCrazyTrail'));
const EngagementShowcase = lazy(() => import('./components/EngagementShowcase'));
const SubmitForm         = lazy(() => import('./components/SubmitForm'));
const Footer             = lazy(() => import('./components/Footer'));

const BlogIndex          = lazy(() => import('./components/blog/BlogIndex'));
const BlogPost           = lazy(() => import('./components/blog/BlogPost'));

function SectionFallback({ minH = 'min-h-[40vh]' }) {
  return (
    <div className={`${minH} flex items-center justify-center`}>
      <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <WhatWeProvide />
        <HowItWorks />
        <WhyCrazyTrail />
        <EngagementShowcase />
        <SubmitForm />
        <Footer />
      </Suspense>
    </>
  );
}

export default function App() {
  const path = useLocationPath();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      trackPageView({ path });
    }
  }, [path]);

  let view;
  if (path === '/blog' || path === '/blog/') {
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
  } else {
    view = <HomePage />;
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
