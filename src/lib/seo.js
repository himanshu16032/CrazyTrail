import { useEffect } from 'react';

const MANAGED_ATTR = 'data-ct-seo';

function setMeta(selector, attrs) {
  let el = document.head.querySelector(selector + `[${MANAGED_ATTR}]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(MANAGED_ATTR, 'true');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"][${MANAGED_ATTR}]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute(MANAGED_ATTR, 'true');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  return el;
}

function setJsonLd(id, payload) {
  let el = document.head.querySelector(`script[data-ct-jsonld="${id}"]`);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-ct-jsonld', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(payload);
  return el;
}

function clearManaged() {
  document.head
    .querySelectorAll(`[${MANAGED_ATTR}], script[data-ct-jsonld]`)
    .forEach((el) => el.remove());
}

export function useSeo({
  title,
  description,
  canonical,
  keywords,
  ogImage,
  ogType = 'website',
  jsonLd = [],
  noindex = false,
} = {}) {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) document.title = title;

    const hasQuery = typeof window !== 'undefined' && window.location.search.length > 1;
    const robotsContent = noindex || hasQuery
      ? 'noindex, follow'
      : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    setMeta('meta[name="robots"]', { name: 'robots', content: robotsContent });

    if (description) {
      setMeta('meta[name="description"]', { name: 'description', content: description });
      setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
      setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    }
    if (title) {
      setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
      setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    }
    if (keywords) {
      setMeta('meta[name="keywords"]', { name: 'keywords', content: keywords });
    }
    if (canonical) {
      const cleanCanonical = canonical.split('?')[0];
      setLink('canonical', cleanCanonical);
      setMeta('meta[property="og:url"]', { property: 'og:url', content: cleanCanonical });
    } else if (noindex) {
      document.head.querySelectorAll(`link[rel="canonical"]`).forEach((el) => el.remove());
    }
    if (ogImage) {
      setMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage });
      setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImage });
    }
    setMeta('meta[property="og:type"]', { property: 'og:type', content: ogType });

    jsonLd.forEach((entry, i) => setJsonLd(entry['@type'] || `node-${i}`, entry));

    return () => {
      clearManaged();
      document.title = previousTitle;
    };
  }, [title, description, canonical, keywords, ogImage, ogType, noindex, JSON.stringify(jsonLd)]);
}
