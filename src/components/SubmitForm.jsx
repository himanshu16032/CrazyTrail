import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, Loader2, Sparkles, BrainCircuit, CheckCircle2 } from 'lucide-react';
import GradientButton from './ui/GradientButton';
import { submitForm } from '../utils/submitForm';

const platforms = [
  { value: 'youtube_short', label: 'YouTube Short' },
  { value: 'youtube_video', label: 'YouTube Video' },
  { value: 'instagram_post', label: 'Instagram Post' },
  { value: 'instagram_reel', label: 'Instagram Reel' },
];

function getNextMonths() {
  const months = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    months.push({
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label: d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    });
  }
  return months;
}

const STORAGE_KEY = 'crazytrail-form-data';
const months = getNextMonths();

function loadCached() {
  try {
    const item = window.localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : {};
  } catch {
    return {};
  }
}

export default function SubmitForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasChannel, setHasChannel] = useState(false);
  const saveTimer = useRef(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: loadCached(),
  });

  const saveToDisk = useCallback((data) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const subscription = watch((values) => {
      if (submitted) return;
      clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => saveToDisk(values), 400);
    });
    return () => {
      subscription.unsubscribe();
      clearTimeout(saveTimer.current);
    };
  }, [watch, submitted, saveToDisk]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setHasChannel(!!data.channelLink);
    try {
      await submitForm(data);
      window.localStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const watchPlatform = watch('platform');

  if (submitted) {
    return (
      <section id="submit" className="py-20 md:py-28 relative">
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
          >
            <div className="w-20 h-20 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-accent-green" />
            </div>
            <h3 className="font-heading font-900 text-2xl md:text-3xl text-dark mb-4">
              Request Submitted!
            </h3>
            <p className="text-dark-light text-lg leading-relaxed">
              We're processing your request using our AI.
              {hasChannel && (
                <span className="block mt-2 font-semibold text-primary">
                  <BrainCircuit className="w-5 h-5 inline mr-1" />
                  Analysing your channel... Heavy processing ahead!
                </span>
              )}
            </p>
            <p className="mt-4 text-dark-light">
              Please check your email after some time for your curated trends.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="submit" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-cream to-cream -z-10" />
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-primary/10 text-primary font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
            <Sparkles className="w-4 h-4 inline mr-1" />
            Get Started Free
          </span>
          <h2 className="font-heading font-900 text-3xl sm:text-4xl md:text-5xl text-dark mb-4">
            Submit Your <span className="text-primary">Request</span>
          </h2>
          <p className="text-dark-light text-lg">
            Tell us what you need and we'll deliver trending topics to your inbox.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 space-y-7">
          {/* Platform */}
          <div>
            <label className="block font-heading font-bold text-dark text-lg mb-3">
              Choose Your Platform
            </label>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map(p => {
                const selected = watchPlatform === p.value;
                return (
                  <label
                    key={p.value}
                    className={`flex items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all text-center font-medium ${
                      selected
                        ? 'border-primary bg-primary/5 text-primary shadow-sm'
                        : 'border-gray-200 hover:border-primary/40 text-dark-light'
                    }`}
                  >
                    <input
                      type="radio"
                      value={p.value}
                      {...register('platform', { required: 'Please select a platform' })}
                      className="sr-only"
                    />
                    {p.label}
                  </label>
                );
              })}
            </div>
            {errors.platform && <p className="text-accent-pink text-sm mt-2">{errors.platform.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-heading font-bold text-dark mb-2">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
              })}
              className="w-full px-5 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-dark placeholder-gray-400"
            />
            {errors.email && <p className="text-accent-pink text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Topics */}
          <div>
            <label className="block font-heading font-bold text-dark mb-2">
              Topics / Hashtags <span className="text-dark-light font-normal text-sm">(at least one)</span>
            </label>
            <textarea
              rows={3}
              placeholder="e.g. AI tools, #productivity, tech reviews, #coding"
              {...register('topics', { required: 'Enter at least one topic or hashtag' })}
              className="w-full px-5 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-dark placeholder-gray-400 resize-none"
            />
            {errors.topics && <p className="text-accent-pink text-sm mt-1">{errors.topics.message}</p>}
          </div>

          {/* Channel Link */}
          <div>
            <label className="block font-heading font-bold text-dark mb-2">
              Channel / Page Link <span className="text-dark-light font-normal text-sm">(optional)</span>
            </label>
            <input
              type="url"
              placeholder="https://youtube.com/@yourchannel"
              {...register('channelLink')}
              className="w-full px-5 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-dark placeholder-gray-400"
            />
          </div>

          {/* Month */}
          <div>
            <label className="block font-heading font-bold text-dark text-lg mb-3">
              Select Target Month
            </label>
            <select
              {...register('month', { required: 'Please select a month' })}
              className="w-full px-5 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-dark bg-white appearance-none cursor-pointer"
            >
              <option value="">Choose a month...</option>
              {months.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            {errors.month && <p className="text-accent-pink text-sm mt-2">{errors.month.message}</p>}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <GradientButton type="submit" disabled={submitting} className="w-full">
              {submitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
              ) : (
                <><Send className="w-5 h-5" /> Submit Request</>
              )}
            </GradientButton>
          </div>
        </form>

        <AnimatePresence>
          {submitting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-dark/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl p-8 md:p-10 max-w-md w-full text-center shadow-2xl"
              >
                <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                <h3 className="font-heading font-bold text-xl text-dark mb-2">
                  Processing your request using our AI...
                </h3>
                <p className="text-dark-light mt-3 text-sm">Heavy processing ahead. Please wait...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
