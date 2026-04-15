import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Camera, TrendingUp, ArrowUp } from 'lucide-react';
import AnimatedCounter from './ui/AnimatedCounter';

const benefits = [
  {
    icon: TrendingUp,
    title: 'No More Bad Timing',
    description: 'Post when the topic is about to peak. We predict the blast-off so you ride the wave.',
    stat: { value: 500, suffix: '%', label: 'Engagement Boost' },
    bg: 'bg-primary/5',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    arrowColor: 'text-primary',
  },
  {
    icon: Clock,
    title: 'Save Hours of Research',
    description: 'Stop wasting hours hunting for the right topic. We analyze millions of keywords for you.',
    stat: { value: 10, suffix: 'hrs', label: 'Saved Weekly' },
    bg: 'bg-accent-yellow/5',
    iconBg: 'bg-accent-yellow/15',
    iconColor: 'text-accent-orange',
    arrowColor: 'text-accent-green',
  },
  {
    icon: Camera,
    title: 'Focus on Creation',
    description: 'Let us handle the trend research. You focus your full energy on making great content.',
    stat: { value: 3, suffix: 'x', label: 'More Content Output' },
    bg: 'bg-accent-green/5',
    iconBg: 'bg-accent-green/10',
    iconColor: 'text-accent-green',
    arrowColor: 'text-accent-pink',
  },
];

export default function WhyCrazyTrail() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="why-us" className="py-20 md:py-28 relative overflow-hidden">
      {/* wave divider */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full h-auto fill-white" preserveAspectRatio="none">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,40 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-accent-pink/10 text-accent-pink font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
            Why Choose Us
          </span>
          <h2 className="font-heading font-900 text-3xl sm:text-4xl md:text-5xl text-dark mb-4">
            Why <span className="text-primary">CrazyTrail</span>?
          </h2>
          <p className="text-dark-light text-lg max-w-2xl mx-auto">
            Great content with bad timing is wasted potential. We fix that.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`${b.bg} rounded-3xl p-6 md:p-8 border border-gray-100 hover:shadow-lg transition-shadow`}
            >
              <div className={`inline-flex p-3 rounded-xl ${b.iconBg} mb-5`}>
                <b.icon className={`w-6 h-6 ${b.iconColor}`} />
              </div>
              <h3 className="font-heading font-bold text-xl text-dark mb-3">{b.title}</h3>
              <p className="text-dark-light leading-relaxed mb-6">{b.description}</p>
              <div className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm">
                <motion.div
                  animate={isInView ? { y: [0, -4, 0] } : {}}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4 }}
                >
                  <ArrowUp className={`w-6 h-6 ${b.arrowColor}`} />
                </motion.div>
                <div>
                  <p className="font-heading font-800 text-2xl text-dark">
                    <AnimatedCounter target={b.stat.value} suffix={b.stat.suffix} prefix="+" duration={2000} />
                  </p>
                  <p className="text-dark-light text-xs">{b.stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
