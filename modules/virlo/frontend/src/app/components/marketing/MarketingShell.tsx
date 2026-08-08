import { Link, NavLink } from "react-router";
import { Menu, X, Zap } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  btnRaised,
  btnRaisedStyle,
  marketingGlow,
} from "@/app/components/product/theme";

const NAV = [
  { label: "Features", to: "/features" },
  { label: "Solutions", to: "/solutions" },
  { label: "Resources", to: "/resources" },
  { label: "Pricing", to: "/pricing" },
];

export function MarketingShell({
  children,
  bare = false,
}: {
  children: ReactNode;
  bare?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="bg-background text-foreground min-h-screen overflow-x-hidden relative"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {!bare && (
        <>
          <div
            className="pointer-events-none fixed inset-x-0 top-0 h-[520px] z-0"
            style={{ background: marketingGlow }}
          />
          <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
              scrolled
                ? "border-b border-[rgba(60,64,67,0.08)] bg-white/85 backdrop-blur-xl shadow-[0_1px_0_rgba(60,64,67,0.04)]"
                : "border-b border-transparent bg-white/70 backdrop-blur-md"
            }`}
          >
            <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2.5 group">
                  <div
                    className="w-7 h-7 rounded-[9px] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
                    style={{
                      background: "linear-gradient(145deg, #5a9bff, #1a73e8)",
                      boxShadow: "0 4px 12px rgba(66,133,244,0.35)",
                    }}
                  >
                    <Zap size={13} className="text-white" />
                  </div>
                  <span
                    className="font-extrabold text-[17px] tracking-tight text-[#202124]"
                    style={{ fontFamily: "'Onest', sans-serif" }}
                  >
                    virlo
                  </span>
                </Link>
                <div className="hidden lg:flex items-center gap-1 text-[13.5px] text-[#5f6368]">
                  {NAV.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `px-3 py-1.5 rounded-full transition-colors duration-150 ${
                          isActive
                            ? 'text-[#202124] font-medium bg-[#e8f0fe]'
                            : 'hover:text-[#202124] hover:bg-[#f1f3f4]'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex items-center gap-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-[13.5px] text-[#5f6368] hover:text-[#202124] px-2 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={() => logout()}
                      className="text-[13.5px] text-[#5f6368] hover:text-[#202124] px-2 transition-colors"
                    >
                      Sign out{user?.firstName ? ` (${user.firstName})` : ""}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth/signin"
                      className="text-[13.5px] text-[#5f6368] hover:text-[#202124] px-3 py-2 transition-colors"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/auth/signup"
                      className={`${btnRaised} text-[13px] px-5 py-2`}
                      style={btnRaisedStyle}
                    >
                      Get started »
                    </Link>
                  </>
                )}
              </div>
              <button
                type="button"
                className="md:hidden text-[#5f6368] p-2 rounded-full hover:bg-[#f1f3f4]"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
            {open && (
              <div className="md:hidden border-t border-[rgba(60,64,67,0.08)] bg-white/95 backdrop-blur-xl px-5 py-5 flex flex-col gap-1 animate-in fade-in">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="text-sm text-[#5f6368] hover:text-[#202124] px-3 py-2.5 rounded-xl hover:bg-[#f8f9fa]"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="h-px bg-[rgba(60,64,67,0.08)] my-2" />
                <Link
                  to="/auth/signin"
                  onClick={() => setOpen(false)}
                  className="text-sm px-3 py-2.5"
                >
                  Sign in
                </Link>
                <Link
                  to="/auth/signup"
                  onClick={() => setOpen(false)}
                  className={`${btnRaised} text-sm px-4 py-2.5 w-full text-center mt-1`}
                  style={btnRaisedStyle}
                >
                  Get started »
                </Link>
              </div>
            )}
          </nav>
        </>
      )}
      <div className={bare ? "" : "relative z-10 pt-16"}>{children}</div>
    </div>
  );
}

export function MarketingHero({
  eyebrow,
  title,
  highlight,
  description,
  cta,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description: string;
  cta?: ReactNode;
}) {
  return (
    <section className="relative pt-20 sm:pt-24 pb-16 px-6 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(920px,100%)] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(66,133,244,0.2) 0%, rgba(138,180,248,0.08) 45%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        {eyebrow ? (
          <div
            className="inline-flex items-center text-[11px] font-medium text-[#4285f4] uppercase tracking-[0.18em] mb-5"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {eyebrow}
          </div>
        ) : null}
        <h1
          className="font-extrabold leading-[1.08] tracking-[-0.03em] mb-5 text-[#202124]"
          style={{
            fontFamily: "'Onest', sans-serif",
            fontSize: "clamp(2.35rem, 5.5vw, 3.75rem)",
          }}
        >
          {title}
          {highlight ? (
            <>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #8ab4f8 0%, #4285f4 48%, #1a73e8 100%)",
                }}
              >
                {highlight}
              </span>
            </>
          ) : null}
        </h1>
        <p className="text-[17px] text-[#5f6368] max-w-xl mx-auto mb-9 leading-relaxed">
          {description}
        </p>
        {cta}
      </div>
    </section>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group rounded-[20px] border border-[rgba(60,64,67,0.08)] bg-white/90 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1 ${className}`}
      style={{
        boxShadow:
          "0 1px 2px rgba(60,64,67,0.04), 0 12px 32px rgba(66,133,244,0.07)",
      }}
    >
      {children}
    </div>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-[11px] font-medium text-[#4285f4] uppercase tracking-[0.18em] mb-3"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {children}
    </div>
  );
}
