import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Hash, PlayCircle, Gauge } from 'lucide-react';
import { Link } from '../lib/router';

const features = [
  {
    icon: Brain,
    title: 'LLM Analysis Per Rising Clip',
    description: 'Short-video-specific models read hooks, pacing, captions, and format fingerprints on Reels and Shorts — not generic web search noise.',
    color: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: Gauge,
    title: 'Early Velocity Scoring',
    description: 'Topics ranked by acceleration inside the 3–5 day viral window, with saturation guardrails so you skip late formats.',
    color: 'bg-accent-yellow/15',
    iconColor: 'text-accent-orange',
  },
  {
    icon: Hash,
    title: 'Rising Hashtags & Formats',
    description: 'Mid-volume rising tags and reusable short-form containers paired to your niche — not 20M saturated vanity tags.',
    color: 'bg-accent-green/10',
    iconColor: 'text-accent-green',
  },
  {
    icon: PlayCircle,
    title: 'Blast-Off Video Context',
    description: 'See why similar short videos took off — timing and structure — so you can adapt the pattern the same day.',
    color: 'bg-accent-pink/10',
    iconColor: 'text-accent-pink',
  },
];

export default function WhatWeProvide() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-accent-green/10 text-accent-green font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
            What We Offer
          </span>
          <h2 className="font-heading font-900 text-3xl sm:text-4xl md:text-5xl text-dark mb-4">
            Short-Video Intelligence,{' '}
            <span className="text-primary">Not Another Trend Blog</span>
          </h2>
          <p className="text-dark-light text-lg max-w-2xl mx-auto">
            Proprietary LLM reading of rising Reels and Shorts — the signal Google and creators cannot get from recycled listicles.{' '}
            <Link to="/methodology" className="text-primary font-semibold hover:underline">See the methodology</Link>.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-shadow duration-300 cursor-default"
            >
              <div className={`inline-flex p-4 rounded-2xl ${feature.color} mb-5`}>
                <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
              </div>
              <h3 className="font-heading font-bold text-xl text-dark mb-3">{feature.title}</h3>
              <p className="text-dark-light leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
