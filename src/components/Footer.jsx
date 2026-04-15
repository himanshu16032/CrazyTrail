import { Rocket, Heart } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Get Started', href: '#submit' },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <a href="#home" className="flex items-center gap-2">
              <Rocket className="w-6 h-6 text-primary-light" />
              <span className="font-heading font-900 text-xl">
                Crazy<span className="text-primary-light">Trail</span>
              </span>
            </a>
            <p className="text-white/60 text-sm flex items-center gap-1">
              Made for creators, with <Heart className="w-3 h-3 text-accent-pink inline" /> by creators
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/70 hover:text-white transition-colors text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} CrazyTrail. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
