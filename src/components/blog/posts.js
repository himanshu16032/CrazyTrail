import { POSTS as META } from '../../lib/postsMeta';

export const POSTS = META.map((p) => ({
  ...p,
  loader:
    p.slug === 'find-trending-topics-before-they-blow-up'
      ? () => import('./content/find-trending-topics.jsx')
      : p.slug === 'exploding-topics-alternative-free'
        ? () => import('./content/exploding-topics-alternative.jsx')
        : () => import('./content/trending-on-instagram.jsx'),
}));

export function getPost(slug) {
  return POSTS.find((p) => p.slug === slug) || null;
}
