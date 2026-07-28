import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Monitor, MessageSquareText, CalendarDays, Mail } from 'lucide-react';

const steps = [
  {
    icon: Monitor,
    title: 'Choose Platform',
    desc: 'Pick YouTube Short, YouTube Video, Instagram Post, or Instagram Reel — analysis is short-form native.',
    color: 'bg-primary',
  },
  {
    icon: MessageSquareText,
    title: 'Share Your Niche',
    desc: 'Tell us topics and hashtags so the LLM scores rising clips that actually match your audience.',
    color: 'bg-accent-pink',
  },
  {
    icon: CalendarDays,
    title: 'Pick Your Month',
    desc: 'Select the month you want trends for — plan inside the early viral window, not after peak.',
    color: 'bg-accent-orange',
  },
  {
    icon: Mail,
    title: 'Get AI Alerts',
    desc: 'Receive curated topics from short-video velocity analysis — hooks, formats, hashtags — in your inbox.',
    color: 'bg-accent-green',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary/10 text-primary font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
            Simple Process
          </span>
          <h2 className="font-heading font-900 text-3xl sm:text-4xl md:text-5xl text-dark mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-dark-light text-lg max-w-2xl mx-auto">
            Four steps from niche to inbox — powered by short-video LLM analysis, not guesswork.
          </p>
        </motion.div>

        <ol className="grid md:grid-cols-4 gap-8 md:gap-4 relative list-none p-0 m-0">
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-accent-pink to-accent-green" aria-hidden="true" />

          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center text-center relative"
            >
              <div className={`relative z-10 w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center shadow-lg mb-5`}>
                <step.icon className="w-7 h-7 text-white" aria-hidden="true" />
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-sm font-heading font-bold text-dark shadow">
                  {i + 1}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="md:hidden w-0.5 h-8 bg-gradient-to-b from-primary/30 to-primary/10 -mt-1 mb-1" aria-hidden="true" />
              )}
              <h3 className="font-heading font-bold text-lg text-dark mb-2">{step.title}</h3>
              <p className="text-dark-light text-sm leading-relaxed max-w-xs">{step.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
