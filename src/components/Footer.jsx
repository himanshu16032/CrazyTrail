import { Rocket, Heart } from 'lucide-react';
import { TOPICS } from '../lib/topics';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'Topics', href: '/topics' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Get Started', href: '/#submit' },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-auto">
            <a href="/" className="flex items-center gap-2">
              <Rocket className="w-6 h-6 text-primary-light" />
              <span className="font-heading font-900 text-xl">
                Crazy<span className="text-primary-light">Trail</span>
              </span>
            </a>
            <p className="text-white/60 text-sm flex items-center gap-1">
              Made for creators, with <Heart className="w-3 h-3 text-accent-pink inline" /> by creators
            </p>
            <p className="text-white/50 text-xs max-w-sm text-center md:text-left leading-relaxed">
              Short-video LLM analysis for Instagram Reels &amp; YouTube Shorts — not a delivery or shipping service.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3 w-full md:w-auto">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/70 hover:text-white transition-colors text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10">
          <p className="text-white/40 text-xs uppercase tracking-wide mb-3 text-center md:text-left">Short-form domains</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {TOPICS.map((t) => (
              <a
                key={t.slug}
                href={`/topics/${t.slug}`}
                className="text-[11px] text-white/45 hover:text-white/75 border border-white/10 rounded-full px-2.5 py-1 transition-colors"
              >
                {t.primaryKeyword}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} CrazyTrail. All rights reserved.
          </p>
          <p className="text-white/30 text-xs mt-2">
            Questions? Use the{' '}
            <a href="/#submit" className="text-white/50 hover:text-white/70 underline-offset-2 hover:underline">get started form</a>
            {' '}·{' '}
            <a href="/methodology" className="text-white/50 hover:text-white/70 underline-offset-2 hover:underline">methodology</a>
            {' '}·{' '}
            <a href="/feed.xml" className="text-white/50 hover:text-white/70 underline-offset-2 hover:underline">RSS</a>
            {' '}·{' '}
            <a href="/ai.txt" className="text-white/50 hover:text-white/70 underline-offset-2 hover:underline">ai.txt</a>
            {' '}·{' '}
            <a href="/llms.txt" className="text-white/50 hover:text-white/70 underline-offset-2 hover:underline">llms.txt</a>
          </p>
          <p className="text-white/20 text-xs mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1">
            <a href="https://www.youtube.com/creators/" target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors">YouTube Creators</a>
            <a href="https://business.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors">Instagram for Business</a>
            <a href="https://trends.google.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors">Google Trends</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
