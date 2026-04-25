import { motion } from 'framer-motion';
import { Users, Eye, ThumbsUp } from 'lucide-react';
import { track } from '../lib/tracking';

const highlights = [
  {
    id: 'creators-helped',
    icon: Users,
    value: '500+',
    label: 'Creators already on board',
    sub: 'From day-one channels to 100k niches',
    bg: 'bg-primary/10',
    color: 'text-primary',
    ring: 'hover:ring-primary/40',
  },
  {
    id: 'subs-gained',
    icon: ThumbsUp,
    value: '1M+',
    label: 'Subs gained collectively',
    sub: 'Across creators using our trends',
    bg: 'bg-accent-pink/10',
    color: 'text-accent-pink',
    ring: 'hover:ring-accent-pink/40',
  },
  {
    id: 'views-driven',
    icon: Eye,
    value: '40M+',
    label: 'Views from our trend picks',
    sub: 'Posted on time, before saturation',
    bg: 'bg-accent-green/10',
    color: 'text-accent-green',
    ring: 'hover:ring-accent-green/40',
  },
];

export default function SocialProof() {
  const onClick = (id) => {
    track('social_proof_click', { highlight_id: id });
    document.getElementById('submit')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto lg:mx-0">
      {highlights.map((h, i) => (
        <motion.button
          key={h.id}
          type="button"
          onClick={() => onClick(h.id)}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.1, duration: 0.45, ease: 'easeOut' }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          className={`group flex items-center gap-3 text-left bg-white/80 backdrop-blur-sm
            border border-gray-100 rounded-2xl px-4 py-3 shadow-sm
            ring-1 ring-transparent ${h.ring} hover:shadow-md hover:bg-white
            transition-all cursor-pointer`}
        >
          <span className={`flex items-center justify-center w-10 h-10 rounded-xl ${h.bg} shrink-0`}>
            <h.icon className={`w-5 h-5 ${h.color}`} />
          </span>
          <span className="min-w-0">
            <span className={`block font-heading font-900 text-xl ${h.color} leading-none`}>
              {h.value}
            </span>
            <span className="block text-dark text-sm font-semibold leading-tight mt-1 truncate">
              {h.label}
            </span>
            <span className="block text-dark-light text-[11px] leading-tight mt-0.5 truncate">
              {h.sub}
            </span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}
