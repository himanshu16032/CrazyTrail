import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CalendarClock, Hash, PlayCircle, Sparkles } from 'lucide-react';

const features = [
  {
    icon: CalendarClock,
    title: 'Upcoming Trending Topics',
    description: 'Get curated topics for upcoming days and events in your niche before they go viral.',
    color: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: Hash,
    title: 'Trending Hashtags',
    description: 'Hand-picked hashtags that are about to explode, tailored for your content type.',
    color: 'bg-accent-yellow/15',
    iconColor: 'text-accent-orange',
  },
  {
    icon: PlayCircle,
    title: 'Previous Blast-Off Videos',
    description: 'See real examples of videos that blew up using similar topics and timing strategies.',
    color: 'bg-accent-green/10',
    iconColor: 'text-accent-green',
  },
  {
    icon: Sparkles,
    title: 'Completely Free. No BS.',
    description: 'No hidden fees, no premium tiers, no catch. Just pure value for creators like you.',
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
            Everything You Need to{' '}
            <span className="text-primary">Trend</span>
          </h2>
          <p className="text-dark-light text-lg max-w-2xl mx-auto">
            We handle the research so you can focus solely on creating content that connects.
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
