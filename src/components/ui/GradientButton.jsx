import { motion } from 'framer-motion';

export default function GradientButton({ children, onClick, type = 'button', className = '', disabled = false }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`relative overflow-hidden rounded-full px-8 py-4 font-heading font-bold text-white text-lg
        bg-gradient-to-r from-primary via-accent-pink to-accent-orange bg-[length:200%_200%] animate-gradient-shift
        shadow-lg hover:shadow-xl transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
      />
    </motion.button>
  );
}
