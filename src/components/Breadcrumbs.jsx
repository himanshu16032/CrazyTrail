import { Link } from '../lib/router';

export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-5 text-sm text-dark-light">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href || item.label} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true" className="text-dark-light/50">/</span>}
              {last || !item.href ? (
                <span className="text-dark font-medium truncate max-w-[220px] sm:max-w-none">{item.label}</span>
              ) : (
                <Link to={item.href} className="hover:text-primary transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
