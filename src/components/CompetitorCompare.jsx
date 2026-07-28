import { Link } from '../lib/router';

const ROWS = {
  'treendly-alternative-free': {
    headers: ['Need', 'Treendly', 'CrazyTrail'],
    rows: [
      ['Best for', 'Search / e-com trends', 'Reels & YouTube Shorts timing'],
      ['Price', 'Paid plans', 'Free for creators'],
      ['Short-video LLM analysis', 'No', 'Yes'],
      ['Early viral window alerts', 'Manual', 'Weekly inbox'],
      ['Chrome required', 'Often', 'No'],
    ],
  },
  'glimpse-alternative-free': {
    headers: ['Need', 'Glimpse', 'CrazyTrail'],
    rows: [
      ['Best for', 'Google Trends overlay', 'Social-first short-form'],
      ['Price', 'Free tier + $99/mo', 'Free core alerts'],
      ['Reels/Shorts velocity', 'Weak', 'Core product'],
      ['Inbox workflow', 'No', 'Yes'],
      ['Extension required', 'Yes', 'No'],
    ],
  },
  'free-trend-tool-instagram-creators': {
    headers: ['Need', 'Exploding Topics', 'CrazyTrail'],
    rows: [
      ['Creator short-form focus', 'Secondary', 'Primary'],
      ['Price', '$39+/mo', 'Free'],
      ['Reels timing', 'Limited', 'Built for it'],
      ['Setup', 'Dashboard', 'Email digest'],
      ['LLM video analysis', 'No', 'Yes'],
    ],
  },
  'free-viral-reels-ideas': {
    headers: ['Need', 'Reels sorters', 'CrazyTrail'],
    rows: [
      ['When signal appears', 'After it already won', 'While still early'],
      ['Price', 'Free / Pro', 'Free'],
      ['Idea freshness', 'Post-hoc', 'Early window'],
      ['Niche alerts', 'Manual scroll', 'Weekly digest'],
    ],
  },
  'youtube-shorts-content-ideas': {
    headers: ['Need', 'Generic idea lists', 'CrazyTrail'],
    rows: [
      ['Freshness', 'Stale listicles', 'Velocity-based'],
      ['Competition filter', 'Rare', 'Yes'],
      ['Price', 'Ads / freemium', 'Free'],
      ['Shorts-native scoring', 'Mixed', 'Yes'],
    ],
  },
};

export default function CompetitorCompare({ slug }) {
  const table = ROWS[slug];
  if (!table) return null;
  return (
    <section className="mt-8 mb-2">
      <h2 className="font-heading font-900 text-2xl text-dark mb-3">Quick comparison</h2>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="min-w-full text-sm border border-gray-100 rounded-2xl overflow-hidden bg-white">
          <thead className="bg-cream-dark text-dark">
            <tr>
              {table.headers.map((h) => (
                <th key={h} className="text-left font-heading font-bold px-3 py-2.5 border-b border-gray-100">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row[0]} className="even:bg-cream/40">
                {row.map((cell, i) => (
                  <td key={i} className={`px-3 py-2.5 border-b border-gray-100 ${i === 2 ? 'text-primary font-semibold' : 'text-dark-light'}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-dark-light text-sm mt-3">
        Also see{' '}
        <Link to="/blog/exploding-topics-alternative-free" className="text-primary font-semibold hover:underline">
          Exploding Topics alternative free
        </Link>
        {' '}and the{' '}
        <Link to="/methodology" className="text-primary font-semibold hover:underline">
          methodology
        </Link>
        .
      </p>
    </section>
  );
}
