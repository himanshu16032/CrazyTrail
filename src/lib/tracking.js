// Centralized client-side tracking for CrazyTrail.
//
// Goals:
//  - Identify a returning visitor without forcing them to log in.
//  - Persist a stable random UUID in localStorage + a 1st-party cookie
//    so it survives page navigations between the React app (/) and the
//    server-rendered dashboard (/d/:id).
//  - Tag PostHog events with `visitor_id` and a `visit_count` so you can
//    cohort repeat visitors directly inside PostHog.
//  - Queue events while PostHog is still lazy-loading so we never lose them.

const VISITOR_ID_KEY = 'ct_visitor_id';
const VISIT_COUNT_KEY = 'ct_visit_count';
const FIRST_SEEN_KEY = 'ct_first_seen';
const LAST_SEEN_KEY = 'ct_last_seen';
const SESSION_KEY = 'ct_session_seen';
const COOKIE_NAME = 'ct_vid';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 2;

function uuid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'ct-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
}

function safeLocalGet(k) {
  try { return window.localStorage.getItem(k); } catch { return null; }
}
function safeLocalSet(k, v) {
  try { window.localStorage.setItem(k, v); } catch { /* ignore */ }
}
function safeSessionGet(k) {
  try { return window.sessionStorage.getItem(k); } catch { return null; }
}
function safeSessionSet(k, v) {
  try { window.sessionStorage.setItem(k, v); } catch { /* ignore */ }
}

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value) {
  if (typeof document === 'undefined') return;
  const host = window.location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1';
  const domainPart = isLocal ? '' : `; domain=.${host.replace(/^www\./, '')}`;
  document.cookie =
    `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax${domainPart}`;
}

export function getVisitorProfile() {
  if (typeof window === 'undefined') {
    return { visitorId: null, visitCount: 0, isReturning: false, firstSeen: null, lastSeen: null };
  }

  let visitorId = safeLocalGet(VISITOR_ID_KEY) || getCookie(COOKIE_NAME);
  const isNew = !visitorId;
  if (!visitorId) visitorId = uuid();

  safeLocalSet(VISITOR_ID_KEY, visitorId);
  setCookie(COOKIE_NAME, visitorId);

  let visitCount = parseInt(safeLocalGet(VISIT_COUNT_KEY) || '0', 10);
  const sessionTouched = safeSessionGet(SESSION_KEY) === '1';
  if (!sessionTouched) {
    visitCount += 1;
    safeLocalSet(VISIT_COUNT_KEY, String(visitCount));
    safeSessionSet(SESSION_KEY, '1');
  }

  const nowIso = new Date().toISOString();
  const firstSeen = safeLocalGet(FIRST_SEEN_KEY) || nowIso;
  if (!safeLocalGet(FIRST_SEEN_KEY)) safeLocalSet(FIRST_SEEN_KEY, firstSeen);
  const lastSeen = safeLocalGet(LAST_SEEN_KEY);
  safeLocalSet(LAST_SEEN_KEY, nowIso);

  return {
    visitorId,
    visitCount,
    isNew,
    isReturning: visitCount > 1,
    firstSeen,
    lastSeen: lastSeen || nowIso,
  };
}

let _posthog = null;
const _queue = [];

export function attachPostHog(posthog) {
  _posthog = posthog;
  const profile = getVisitorProfile();

  try {
    posthog.identify(profile.visitorId, {
      visitor_id: profile.visitorId,
      visit_count: profile.visitCount,
      first_seen: profile.firstSeen,
      last_seen: profile.lastSeen,
      is_returning: profile.isReturning,
    });
    posthog.register({
      visitor_id: profile.visitorId,
      visit_count: profile.visitCount,
      is_returning: profile.isReturning,
    });
  } catch { /* ignore */ }

  while (_queue.length) {
    const [name, props] = _queue.shift();
    try { posthog.capture(name, props); } catch { /* ignore */ }
  }
}

export function track(name, props = {}) {
  const profile = getVisitorProfile();
  const enriched = {
    visitor_id: profile.visitorId,
    visit_count: profile.visitCount,
    is_returning: profile.isReturning,
    path: typeof window !== 'undefined' ? window.location.pathname : '',
    ...props,
  };
  if (_posthog) {
    try { _posthog.capture(name, enriched); } catch { /* ignore */ }
  } else {
    _queue.push([name, enriched]);
  }
}

export function trackPageView(extra = {}) {
  track('page_view', {
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    title: typeof document !== 'undefined' ? document.title : '',
    ...extra,
  });
}
