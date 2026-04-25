// Small set of reusable building blocks for blog article bodies. Keeps
// each article file focused on words, not markup.

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function Intro({ children }) {
  return (
    <p className="text-dark text-lg md:text-xl leading-relaxed font-medium mb-6">{children}</p>
  );
}

export function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 mt-10 md:mt-12">
      <h2 className="font-heading font-900 text-2xl md:text-3xl text-dark mb-4 leading-tight">
        {title}
      </h2>
      <div className="space-y-4 text-dark leading-relaxed">{children}</div>
    </section>
  );
}

export function Sub({ children }) {
  return (
    <h3 className="font-heading font-bold text-lg md:text-xl text-dark mt-6 mb-2">{children}</h3>
  );
}

export function P({ children }) {
  return <p className="text-dark-light leading-relaxed">{children}</p>;
}

export function Bold({ children }) {
  return <strong className="text-dark font-semibold">{children}</strong>;
}

export function List({ items, ordered = false }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className={`pl-5 space-y-2 text-dark-light leading-relaxed ${ordered ? 'list-decimal' : 'list-disc'}`}>
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </Tag>
  );
}

export function Callout({ children, tone = 'primary' }) {
  const tones = {
    primary: 'bg-primary/5 border-primary/20 text-dark',
    pink: 'bg-accent-pink/5 border-accent-pink/20 text-dark',
    green: 'bg-accent-green/5 border-accent-green/20 text-dark',
    amber: 'bg-accent-yellow/10 border-accent-orange/20 text-dark',
  };
  return (
    <div className={`my-5 rounded-2xl border-l-4 px-4 py-3 ${tones[tone] || tones.primary}`}>
      {children}
    </div>
  );
}

export function Stat({ label, value, hint }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 px-4 py-3">
      <div className="text-2xl font-heading font-900 text-primary">{value}</div>
      <div className="text-sm font-semibold text-dark">{label}</div>
      {hint && <div className="text-xs text-dark-light mt-1">{hint}</div>}
    </div>
  );
}

export function StatGrid({ items }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-5">
      {items.map((s, i) => (
        <Stat key={i} {...s} />
      ))}
    </div>
  );
}

export function FAQ({ items }) {
  return (
    <div className="space-y-3 mt-3">
      {items.map((q, i) => (
        <FAQItem key={i} q={q.q} a={q.a} />
      ))}
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between text-left px-5 py-4 cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-heading font-bold text-dark text-base md:text-lg pr-3">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-dark-light shrink-0" /> : <ChevronDown className="w-5 h-5 text-dark-light shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 text-dark-light leading-relaxed">{a}</div>
      )}
    </div>
  );
}

export function ComparisonTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto my-5 -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle px-4 sm:px-0">
        <table className="min-w-full text-sm border border-gray-100 rounded-2xl overflow-hidden bg-white">
          <thead className="bg-cream-dark text-dark">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="text-left font-heading font-bold px-3 py-2.5 border-b border-gray-100 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="even:bg-cream/40">
                {row.map((cell, j) => (
                  <td key={j} className="px-3 py-2.5 border-b border-gray-100 text-dark-light align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TOC({ items }) {
  return (
    <nav aria-label="Table of contents" className="my-6 bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
      <p className="font-heading font-bold text-dark text-sm uppercase tracking-wide mb-2">In this article</p>
      <ol className="list-decimal pl-5 space-y-1.5 text-dark-light text-sm">
        {items.map((it, i) => (
          <li key={i}>
            <a href={`#${it.id}`} className="hover:text-primary transition-colors">
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
