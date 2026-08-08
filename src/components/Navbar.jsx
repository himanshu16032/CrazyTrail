import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Menu, X, ChevronDown } from 'lucide-react';
import { POSTS } from './blog/posts';
import { Link, useLocationPath, navigate } from '../lib/router';
import { track } from '../lib/tracking';

const sectionLinks = [
  { label: 'Home', href: '/#home', section: '#home' },
  { label: 'How It Works', href: '/#how-it-works', section: '#how-it-works' },
  { label: 'Topics', href: '/topics', section: null },
  { label: 'Virlo', href: '/virlo/', section: null },
  { label: 'FAQ', href: '/#faq', section: '#faq' },
  { label: 'Get Started', href: '/#submit', section: '#submit' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  const blogTimer = useRef(null);
  const path = useLocationPath();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const goSection = (e, link) => {
    // External / static submodule (Virlo) — full page load, not SPA navigate
    if (link.href.startsWith('/virlo')) {
      e.preventDefault();
      setMobileOpen(false);
      track('nav_click', { label: link.label });
      window.location.assign(link.href);
      return;
    }
    if (!link.section) {
      e.preventDefault();
      navigate(link.href);
      setMobileOpen(false);
      track('nav_click', { label: link.label });
      return;
    }
    if (path === '/') {
      e.preventDefault();
      document.querySelector(link.section)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      e.preventDefault();
      navigate('/');
      setTimeout(() => document.querySelector(link.section)?.scrollIntoView({ behavior: 'smooth' }), 60);
    }
    setMobileOpen(false);
    track('nav_click', { label: link.label });
  };

  const openBlogMenu = () => {
    clearTimeout(blogTimer.current);
    setBlogOpen(true);
  };
  const closeBlogMenu = () => {
    clearTimeout(blogTimer.current);
    blogTimer.current = setTimeout(() => setBlogOpen(false), 120);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || path !== '/' ? 'bg-white/85 backdrop-blur-lg shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group" onClick={() => track('nav_brand_click', { from: path })}>
            <Rocket className="w-7 h-7 text-primary group-hover:rotate-12 transition-transform" />
            <span className="font-heading font-900 text-xl md:text-2xl text-dark">
              Crazy<span className="text-primary">Trail</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {sectionLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => goSection(e, link)}
                className="text-dark-light font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}

            {/* Blog dropdown */}
            <div
              className="relative"
              onMouseEnter={openBlogMenu}
              onMouseLeave={closeBlogMenu}
            >
              <button
                type="button"
                onClick={() => {
                  track('nav_blog_click', { action: 'toggle' });
                  setBlogOpen(v => !v);
                }}
                className={`flex items-center gap-1 font-medium transition-colors cursor-pointer ${
                  path.startsWith('/blog') ? 'text-primary' : 'text-dark-light hover:text-primary'
                }`}
                aria-expanded={blogOpen}
                aria-haspopup="true"
              >
                Blog <ChevronDown className={`w-4 h-4 transition-transform ${blogOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {blogOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50"
                  >
                    <Link
                      to="/blog"
                      onClick={() => { setBlogOpen(false); track('nav_blog_click', { destination: 'index' }); }}
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-cream transition-colors text-dark font-semibold text-sm"
                    >
                      All articles <ChevronDown className="w-4 h-4 -rotate-90" />
                    </Link>
                    <div className="border-t border-gray-100 my-1" />
                    {POSTS.map(p => (
                      <Link
                        key={p.slug}
                        to={`/blog/${p.slug}`}
                        onClick={() => { setBlogOpen(false); track('nav_blog_click', { destination: 'post', slug: p.slug }); }}
                        className="block px-3 py-2.5 rounded-xl hover:bg-cream transition-colors group"
                      >
                        <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-0.5">{p.category}</p>
                        <p className="text-dark font-semibold text-sm leading-snug group-hover:text-primary transition-colors">
                          {p.title}
                        </p>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-dark cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-5 flex flex-col gap-1">
              {sectionLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => goSection(e, link)}
                  className="text-dark font-heading font-bold text-base py-2.5 px-4 rounded-xl hover:bg-primary/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <button
                type="button"
                onClick={() => setMobileBlogOpen(v => !v)}
                className="flex items-center justify-between text-dark font-heading font-bold text-base py-2.5 px-4 rounded-xl hover:bg-primary/10 transition-colors text-left cursor-pointer"
                aria-expanded={mobileBlogOpen}
              >
                <span>Blog</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileBlogOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileBlogOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden ml-2 border-l-2 border-primary/20 pl-3"
                  >
                    <Link
                      to="/blog"
                      onClick={() => { setMobileOpen(false); setMobileBlogOpen(false); }}
                      className="block py-2 px-3 text-dark font-semibold text-sm rounded-lg hover:bg-cream"
                    >
                      All articles
                    </Link>
                    {POSTS.map(p => (
                      <Link
                        key={p.slug}
                        to={`/blog/${p.slug}`}
                        onClick={() => { setMobileOpen(false); setMobileBlogOpen(false); }}
                        className="block py-2 px-3 text-dark-light hover:text-primary text-sm rounded-lg hover:bg-cream transition-colors"
                      >
                        {p.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
