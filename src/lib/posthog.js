export const POSTHOG_CONFIG = {
  apiKey: import.meta.env.VITE_PUBLIC_POSTHOG_KEY || '',
  options: {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false,
    capture_pageleave: true,
    loaded: (posthog) => {
      if (import.meta.env.DEV) console.log('PostHog loaded', posthog);
    },
    autocapture: true,
    capture_heatmaps: true,
    session_recording: {
      maskAllInputs: false,
      maskTextSelector: '[data-ph-mask]',
    },
  },
};
