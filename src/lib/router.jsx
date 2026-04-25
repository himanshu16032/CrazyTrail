import { useEffect, useState, useCallback } from 'react';

export function useLocationPath() {
  const [path, setPath] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname
  );

  useEffect(() => {
    const onChange = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onChange);
    window.addEventListener('ct:navigate', onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('ct:navigate', onChange);
    };
  }, []);

  return path;
}

export function navigate(to, { replace = false } = {}) {
  if (typeof window === 'undefined') return;
  if (window.location.pathname === to) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    return;
  }
  if (replace) window.history.replaceState({}, '', to);
  else window.history.pushState({}, '', to);
  window.scrollTo({ top: 0, behavior: 'instant' });
  window.dispatchEvent(new Event('ct:navigate'));
}

export function useNavigate() {
  return useCallback(navigate, []);
}

export function Link({ to, children, className, onClick, ...rest }) {
  const handle = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };
  return (
    <a href={to} onClick={handle} className={className} {...rest}>
      {children}
    </a>
  );
}
