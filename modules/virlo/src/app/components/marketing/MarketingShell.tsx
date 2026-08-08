import { Link, NavLink } from "react-router";
import { Menu, X, Zap } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { btnRaised, btnRaisedStyle } from "@/app/components/product/theme";

const NAV = [
  { label: "Features", to: "/features" },
  { label: "Solutions", to: "/solutions" },
  { label: "Resources", to: "/resources" },
  { label: "Pricing", to: "/pricing" },
  { label: "API", to: "/api" },
  { label: "MCP", to: "/mcp" },
];

export function MarketingShell({
  children,
  bare = false,
}: {
  children: ReactNode;
  bare?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div
      className="bg-background text-foreground min-h-screen overflow-x-hidden relative"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {!bare && (
        <>
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full"
            style={{ background: "rgba(66,133,244,0.14)", filter: "blur(120px)" }}
          />
          <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <Zap size={13} className="text-white" />
                  </div>
                  <span
                    className="font-extrabold text-lg tracking-tight"
                    style={{ fontFamily: "'Onest', sans-serif" }}
                  >
                    virlo
                  </span>
                </Link>
                <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                  {NAV.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `hover:text-foreground transition-colors ${isActive ? "text-foreground font-medium" : ""}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex items-center gap-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={() => logout()}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Sign out{user?.firstName ? ` (${user.firstName})` : ""}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Try Dashboard
                    </Link>
                    <Link
                      to="/auth/signin"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/auth/signup"
                      className={`${btnRaised} text-sm px-5 py-2`}
                      style={btnRaisedStyle}
                    >
                      Start for $0 »
                    </Link>
                  </>
                )}
              </div>
              <button
                type="button"
                className="md:hidden text-muted-foreground"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
            {open && (
              <div className="md:hidden border-t border-border bg-white/95 backdrop-blur-md px-6 py-5 flex flex-col gap-4">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link to="/auth/signin" onClick={() => setOpen(false)} className="text-sm">
                  Sign in
                </Link>
                <Link
                  to="/auth/signup"
                  onClick={() => setOpen(false)}
                  className={`${btnRaised} text-sm px-4 py-2.5 w-full text-center`}
                  style={btnRaisedStyle}
                >
                  Start for $0 »
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
    <section className="relative pt-20 pb-16 px-6 overflow-hidden">
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[720px] h-[360px] rounded-full pointer-events-none"
        style={{ background: "rgba(66,133,244,0.16)", filter: "blur(110px)" }}
      />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {eyebrow ? (
          <div
            className="text-xs text-primary uppercase tracking-widest mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {eyebrow}
          </div>
        ) : null}
        <h1
          className="font-extrabold leading-[1.08] tracking-tight mb-5"
          style={{
            fontFamily: "'Onest', sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
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
                    "linear-gradient(135deg, #8ab4f8 0%, #4285f4 45%, #1a73e8 100%)",
                }}
              >
                {highlight}
              </span>
            </>
          ) : null}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
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
      className={`rounded-2xl border border-white/60 bg-white/80 backdrop-blur-md p-6 shadow-[0_12px_40px_rgba(66,133,244,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}
