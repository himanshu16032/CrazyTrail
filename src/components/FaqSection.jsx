import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from '../lib/router';
import { HOME_FAQS } from '../lib/siteContent';

const FAQ_LINKS = {
  'How does CrazyTrail AI analyze short videos?': (
    <>
      Rising Reels and Shorts are scored for hook family, beat structure, caption motifs, audio adoption, and acceleration. Patterns still inside the early viral window are prioritized.{' '}
      <Link to="/methodology" className="text-primary font-semibold hover:underline">
        Read the full methodology
      </Link>
      .
    </>
  ),
  'How do I find trending topics before they blow up?': (
    <>
      Use short-video velocity tools like CrazyTrail that monitor Reels and Shorts before mainstream Explore adoption. The key window is 3–5 days before peak. Full playbook:{' '}
      <Link to="/blog/find-trending-topics-before-they-blow-up" className="text-primary font-semibold hover:underline">
        How to Find Trending Topics Before They Blow Up
      </Link>
      .
    </>
  ),
  'Is there a free alternative to Exploding Topics?': (
    <>
      Yes. CrazyTrail is a free Exploding Topics alternative built for Instagram and YouTube creators.{' '}
      <Link to="/blog/exploding-topics-alternative-free" className="text-primary font-semibold hover:underline">
        Compare free alternatives
      </Link>
      {' '}or explore{' '}
      <Link to="/topics/ai-short-video-analysis" className="text-primary font-semibold hover:underline">
        AI short video analysis
      </Link>
      .
    </>
  ),
  'What is trending on Instagram this week?': (
    <>
      See the weekly digest of Reels formats, hashtags, and audio still inside the early window:{' '}
      <Link to="/blog/trending-on-instagram-this-week" className="text-primary font-semibold hover:underline">
        What's trending on Instagram this week
      </Link>
      .
    </>
  ),
};

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      <h3>
        <button
          type="button"
          className="w-full flex items-center justify-between text-left px-5 py-4 cursor-pointer"
          onClick={onToggle}
          aria-expanded={open}
        >
          <span className="font-heading font-bold text-dark text-base md:text-lg pr-3">{q}</span>
          {open ? <ChevronUp className="w-5 h-5 text-dark-light shrink-0" /> : <ChevronDown className="w-5 h-5 text-dark-light shrink-0" />}
        </button>
      </h3>
      <div className={open ? 'px-5 pb-5 text-dark-light leading-relaxed' : 'sr-only'}>
        {a}
      </div>
    </div>
  );
}

export default function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 md:py-28 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
            <HelpCircle className="w-4 h-4" /> FAQ
          </span>
          <h2 id="faq-heading" className="font-heading font-900 text-3xl sm:text-4xl md:text-5xl text-dark mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-dark-light text-lg max-w-2xl mx-auto">
            Straight answers about CrazyTrail's short-video LLM analysis, early windows, and how creators use it.
          </p>
        </motion.div>

        <div className="space-y-3">
          {HOME_FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              q={item.q}
              a={FAQ_LINKS[item.q] || item.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
