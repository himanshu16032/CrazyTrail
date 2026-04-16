import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

let posthogLoaded = false;
const loadPostHog = async () => {
  if (posthogLoaded) return;
  posthogLoaded = true;
  try {
    const [{ default: posthog }, { POSTHOG_CONFIG }] = await Promise.all([
      import('posthog-js'),
      import('./lib/posthog'),
    ]);

    if (!POSTHOG_CONFIG.apiKey) return;

    posthog.init(POSTHOG_CONFIG.apiKey, POSTHOG_CONFIG.options);

    const params = new URLSearchParams(window.location.search);
    const allParams = Object.fromEntries(params.entries());
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const utmParams = {};
    utmKeys.forEach((k) => {
      if (allParams[k]) utmParams[k] = allParams[k];
    });

    posthog.capture('page_visit', {
      path: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      referrer: document.referrer,
      has_params: params.size > 0,
      params: allParams,
      ...utmParams,
    });
  } catch {
    // Analytics failure should not break the app
  }
};

if (typeof window !== 'undefined') {
  const events = ['click', 'scroll', 'keydown', 'touchstart'];
  const loadOnInteraction = () => {
    loadPostHog();
    events.forEach((e) => window.removeEventListener(e, loadOnInteraction));
  };
  events.forEach((e) =>
    window.addEventListener(e, loadOnInteraction, { once: true, passive: true })
  );

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => loadPostHog(), { timeout: 3000 });
  } else {
    setTimeout(loadPostHog, 3000);
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
