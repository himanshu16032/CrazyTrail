import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Eye, Users, Heart } from 'lucide-react';
import GradientButton from './ui/GradientButton';
import AnimatedCounter from './ui/AnimatedCounter';
import BlobBackground from './ui/BlobBackground';

const stats = [
  { icon: Eye, label: 'Views', value: 45000, suffix: '+', color: 'text-primary' },
  { icon: Users, label: 'Subscribers', value: 2300, suffix: '+', color: 'text-accent-green' },
  { icon: Heart, label: 'Engagement', value: 500, suffix: '%', color: 'text-accent-pink' },
];

// Desktop values below stay exactly as before.
// Use the *Mobile* fields to control how the images appear below `sm`.
const illustrationConfig = {
  girlOpacity: 0.18,   // 0 = invisible, 1 = fully visible
  boyOpacity: 0.30,
  girlPosition: 'left-100 bottom-0',        // tailwind position classes
  boyPosition: 'right-130 bottom-100',
  girlSize: 'w-[320px] sm:w-[400px] lg:w-[460px]',
  boySize: 'w-[300px] sm:w-[370px] lg:w-[420px]',
  girlMobileOpacity: 0.16,
  boyMobileOpacity: 0.15,
  girlMobilePosition: 'left-[-28px] bottom-3',
  boyMobilePosition: 'right-[-24px] top-20',
  girlMobileSize: 'w-[190px]',
  boyMobileSize: 'w-[185px]',
};

const floatingEmojis = [
  { emoji: '❤️',  x: '3%',  y: '8%',   delay: 0,    dur: 5.2,  size: 'text-4xl sm:text-5xl' },
  { emoji: '💬',  x: '92%', y: '14%',  delay: 1.8,  dur: 6.1,  size: 'text-4xl sm:text-5xl' },
  { emoji: '🔥',  x: '78%', y: '78%',  delay: 0.4,  dur: 4.7,  size: 'text-3xl sm:text-4xl' },
  { emoji: '📩',  x: '6%',  y: '68%',  delay: 2.3,  dur: 5.8,  size: 'text-3xl sm:text-4xl' },
  { emoji: '💡',  x: '18%', y: '38%',  delay: 3.1,  dur: 5.4,  size: 'text-3xl sm:text-4xl' },
  { emoji: '📈',  x: '88%', y: '50%',  delay: 1.1,  dur: 6.3,  size: 'text-3xl sm:text-4xl' },
  { emoji: '✨',  x: '38%', y: '90%',  delay: 0.6,  dur: 4.9,  size: 'text-3xl sm:text-4xl' },
  { emoji: '💜',  x: '68%', y: '6%',   delay: 2.7,  dur: 5.6,  size: 'text-3xl sm:text-4xl' },
  { emoji: '🗨️',  x: '25%', y: '82%',  delay: 1.5,  dur: 6.8,  size: 'text-4xl sm:text-5xl' },
  { emoji: '🎯',  x: '82%', y: '88%',  delay: 3.5,  dur: 5.1,  size: 'text-3xl sm:text-4xl' },
  { emoji: '👀',  x: '48%', y: '45%',  delay: 0.2,  dur: 7.3,  size: 'text-3xl sm:text-4xl' },
  { emoji: '📣',  x: '12%', y: '18%',  delay: 2.0,  dur: 5.9,  size: 'text-3xl sm:text-4xl' },
  { emoji: '💌',  x: '72%', y: '35%',  delay: 3.8,  dur: 6.5,  size: 'text-3xl sm:text-4xl' },
  { emoji: '👍',  x: '35%', y: '58%',  delay: 1.3,  dur: 4.6,  size: 'text-3xl sm:text-4xl' },
  { emoji: '🔔',  x: '95%', y: '30%',  delay: 0.7,  dur: 5.3,  size: 'text-3xl sm:text-4xl' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' } }),
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      <BlobBackground />

      {/* ── Background illustrations ── */}
      <img
        src="/images/chatting-girl.png"
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute sm:hidden ${illustrationConfig.girlMobilePosition} ${illustrationConfig.girlMobileSize} h-auto object-contain select-none`}
        style={{ opacity: illustrationConfig.girlMobileOpacity }}
      />
      <img
        src="/images/chatting-boy.png"
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute sm:hidden ${illustrationConfig.boyMobilePosition} ${illustrationConfig.boyMobileSize} h-auto object-contain select-none`}
        style={{ opacity: illustrationConfig.boyMobileOpacity }}
      />
      <img
        src="/images/chatting-girl.png"
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute hidden sm:block ${illustrationConfig.girlPosition} ${illustrationConfig.girlSize} h-auto object-contain select-none`}
        style={{ opacity: illustrationConfig.girlOpacity }}
      />
      <img
        src="/images/chatting-boy.png"
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute hidden sm:block ${illustrationConfig.boyPosition} ${illustrationConfig.boySize} h-auto object-contain select-none`}
        style={{ opacity: illustrationConfig.boyOpacity }}
      />

      {/* ── Floating engagement emojis ── */}
      {floatingEmojis.map((item, i) => (
        <motion.span
          key={i}
          className={`pointer-events-none absolute select-none ${item.size}`}
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 1, scale: 0.02 }}
          animate={{
            opacity: [0, 1, 0.75, 1, 0],
            scale: [0.4, 1.15, 1, 1.15, 0.4],
            y: [0, -22, -10, -22, 0],
          }}
          transition={{
            duration: item.dur,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.emoji}
        </motion.span>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial="hidden" animate="visible" className="text-center lg:text-left">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full mb-6 text-sm">
              <TrendingUp className="w-4 h-4" />
              Trend Discovery for Creators
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="font-heading font-900 text-5xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
              <span className="text-dark drop-shadow-[0_2px_4px_rgba(45,43,85,0.15)]">Stop Guessing.</span>{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-pink to-accent-orange drop-shadow-lg">
                  Start Trending.
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-1.5 rounded-full bg-gradient-to-r from-primary via-accent-pink to-accent-orange"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
                />
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-dark text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-medium">
              Prepare your content <span className="text-primary font-bold">days before</span> a topic blows up. We find the right{' '}
              <span className="text-accent-pink font-bold">keywords</span>,{' '}
              <span className="text-accent-orange font-bold">hashtags</span>, and{' '}
              <span className="text-accent-green font-bold">trends</span> so you can focus on creating amazing content.
            </motion.p>
            <motion.div variants={fadeUp} custom={3}>
              <GradientButton onClick={() => document.getElementById('submit')?.scrollIntoView({ behavior: 'smooth' })}>
                Catch the Next Wave <ArrowUpRight className="w-5 h-5" />
              </GradientButton>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex w-full max-w-lg mx-auto flex-col gap-6"
          >
            <div className="relative w-full max-w-md self-center">
              <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <p className="font-heading font-bold text-dark text-lg mb-1">Your Growth Dashboard</p>
                  <p className="text-dark-light text-sm">After using CrazyTrail</p>
                </div>
                <div className="space-y-5">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.2 }}
                      className="flex items-center gap-4 bg-cream rounded-2xl p-4"
                    >
                      <div className={`p-3 rounded-xl ${
                        i === 0 ? 'bg-primary/10' : i === 1 ? 'bg-accent-green/10' : 'bg-accent-pink/10'
                      }`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-dark-light text-sm">{stat.label}</p>
                        <p className={`font-heading font-800 text-2xl ${stat.color}`}>
                          <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2500} />
                        </p>
                      </div>
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                      >
                        <TrendingUp className={`w-5 h-5 ${stat.color}`} />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent-yellow rounded-2xl rotate-12 -z-10 opacity-60" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent-green rounded-2xl -rotate-12 -z-10 opacity-60" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
