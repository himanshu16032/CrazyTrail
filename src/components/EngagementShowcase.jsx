import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Eye, Users, ThumbsUp, TrendingUp, ArrowUp } from 'lucide-react';
import AnimatedCounter from './ui/AnimatedCounter';

const metrics = [
  { icon: Eye, label: 'Views', before: '1.2K', afterVal: 45000, suffix: '', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: Users, label: 'New Subs', before: '+12', afterVal: 2300, suffix: '', color: 'text-accent-green', bg: 'bg-accent-green/10' },
  { icon: ThumbsUp, label: 'Likes', before: '89', afterVal: 5200, suffix: '', color: 'text-accent-pink', bg: 'bg-accent-pink/10' },
];

const barHeights = [20, 35, 28, 50, 42, 65, 55, 80, 72, 95];

export default function EngagementShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-accent-orange/10 text-accent-orange font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
              Real Results
            </span>
            <h2 className="font-heading font-900 text-3xl sm:text-4xl md:text-5xl text-dark mb-6 leading-tight">
              This Is What Happens When You Post at the{' '}
              <span className="text-primary">Right Time</span>
            </h2>
            <p className="text-dark-light text-lg leading-relaxed mb-8">
              Creators using trend-timed content see massive jumps in views, subscribers, and engagement. 
              Stop posting into the void — ride the wave.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <div className={`inline-flex p-2 rounded-xl ${m.bg} mb-2`}>
                    <m.icon className={`w-5 h-5 ${m.color}`} />
                  </div>
                  <p className={`font-heading font-800 text-xl md:text-2xl ${m.color}`}>
                    <AnimatedCounter target={m.afterVal} suffix="+" duration={2500} />
                  </p>
                  <p className="text-dark-light text-xs mt-1">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-cream to-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-heading font-bold text-dark">Engagement Growth</p>
                  <p className="text-dark-light text-sm">Last 10 videos with CrazyTrail</p>
                </div>
                <div className="flex items-center gap-1 text-accent-green bg-accent-green/10 px-3 py-1 rounded-full text-sm font-semibold">
                  <ArrowUp className="w-4 h-4" />
                  <span>312%</span>
                </div>
              </div>

              {/* bar chart */}
              <div className="flex items-end gap-2 h-40 md:h-48">
                {barHeights.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-lg bg-gradient-to-t from-primary to-primary-light"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${h}%` } : { height: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.08, ease: 'easeOut' }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-dark-light">
                <span>Video 1</span>
                <span>Video 10</span>
              </div>

              {/* floating badge */}
              <motion.div
                animate={isInView ? { y: [0, -8, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-accent-yellow text-dark font-heading font-bold text-sm px-4 py-2 rounded-2xl shadow-lg rotate-6"
              >
                <TrendingUp className="w-4 h-4 inline mr-1" />
                Trending!
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
