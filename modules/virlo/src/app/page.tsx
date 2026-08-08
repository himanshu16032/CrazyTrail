import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Search,
  TrendingUp,
  Radio,
  Layers,
  Megaphone,
  Menu,
  X,
  Check,
  Zap,
  Globe,
  Shield,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Search,
    name: "Orbit Search",
    tagline: "Discover trends before they explode",
    description:
      "Real-time search across short-form video. Surface rising creators, trending sounds, and breakout niches before they hit mainstream attention.",
    stats: [
      { label: "Videos indexed", value: "1.2B+" },
      { label: "Update frequency", value: "15 min" },
    ],
  },
  {
    icon: Radio,
    name: "Tracking Center",
    tagline: "Monitor every creator, hashtag, and sound",
    description:
      "Set up trackers for creators, hashtags, sounds, and brand mentions. Get instant alerts when metrics spike or content goes viral — before it hits your feed.",
    stats: [
      { label: "Trackers per account", value: "500+" },
      { label: "Alert latency", value: "<2 min" },
    ],
  },
  {
    icon: Layers,
    name: "Custom Niches",
    tagline: "Own your corner of the internet",
    description:
      "Build custom niche feeds with advanced filtering. Track entire verticals — fitness, finance, beauty — with category-specific performance benchmarks and comparisons.",
    stats: [
      { label: "Niche categories", value: "1,200+" },
      { label: "Creators tracked", value: "8.5M" },
    ],
  },
  {
    icon: TrendingUp,
    name: "Content Studio",
    tagline: "Create with data, not guesswork",
    description:
      "AI-powered content briefs built from top-performing videos in your niche. Hook formulas, optimal lengths, trending sounds — all data-driven and ready to execute.",
    stats: [
      { label: "Hook templates", value: "10K+" },
      { label: "Avg. view lift", value: "+340%" },
    ],
  },
  {
    icon: Megaphone,
    name: "Meta Ads Intel",
    tagline: "See every ad your competitors run",
    description:
      "Full visibility into Meta's short-form ad landscape. Filter by industry, spend tier, format, and performance. Reverse-engineer winning campaigns in seconds.",
    stats: [
      { label: "Ads in library", value: "45M+" },
      { label: "Countries covered", value: "180" },
    ],
  },
];

const plans = [
  {
    name: "Free",
    monthlyPrice: 0,
    description: "Solo operators & freelancers",
    features: [
      "2,000 plan credits/month",
      "Daily data refresh",
      "Custom Niches",
      "Orbit Search",
      "Tracking Center",
      "Meta Ads Library",
      "Excel / CSV / JSON exports",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Pro",
    monthlyPrice: 5,
    description: "Growing agencies & teams",
    features: [
      "12,000 plan credits/month",
      "Everything in Free",
      "3 Team Seats Included",
      "Slack, Discord & webhook alerts",
      "Zapier & n8n integrations",
      "Performing Meta Ads Library",
      "Priority support",
    ],
    cta: "Get started",
    highlight: true,
  },
];

const btnRaised =
  "inline-flex items-center justify-center gap-2 text-white font-semibold rounded-full transition-all hover:-translate-y-0.5";
const btnRaisedStyle = {
  background: "linear-gradient(#4285f4, #1a73e8)",
  border: "1px solid rgba(66,133,244,0.35)",
  boxShadow: "inset 0 1px rgba(255,255,255,0.25), 0 4px 12px rgba(66,133,244,0.28), 0 2px 4px rgba(0,0,0,0.08)",
};

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const feat = features[activeFeature];
  const FeatIcon = feat.icon;

  return (
    <div
      className="bg-background text-foreground min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <Zap size={13} className="text-white" />
              </div>
              <span
                className="font-extrabold text-lg tracking-tight text-foreground"
                style={{ fontFamily: "'Onest', sans-serif" }}
              >
                virlo
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              {[
                { label: "Features", to: "/features" },
                { label: "Solutions", to: "/solutions" },
                { label: "Resources", to: "/resources" },
                { label: "Pricing", to: "/pricing" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="hover:text-foreground transition-colors duration-150"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Try Dashboard
            </Link>
            <Link
              to="/auth/signin"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/auth/signup"
              className={`${btnRaised} text-sm px-5 py-2`}
              style={btnRaisedStyle}
            >
              Get started »
            </Link>
          </div>
          <button
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-5 flex flex-col gap-4">
            {[
              { label: "Features", to: "/features" },
              { label: "Solutions", to: "/solutions" },
              { label: "Resources", to: "/resources" },
              { label: "Pricing", to: "/pricing" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/auth/signin" className="text-sm text-muted-foreground text-left">
              Sign in
            </Link>
            <Link
              to="/auth/signup"
              className={`${btnRaised} text-sm px-4 py-2.5 w-full`}
              style={btnRaisedStyle}
            >
              Get started »
            </Link>
          </div>
        )}
      </nav>

      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[280px] h-[280px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1
            className="font-extrabold leading-[1.05] tracking-tight mb-6"
            style={{
              fontFamily: "'Onest', sans-serif",
              fontSize: "clamp(2.6rem, 6.5vw, 4.75rem)",
            }}
          >
            <span className="text-foreground">Social Listening for</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #8ab4f8 0%, #4285f4 45%, #1a73e8 100%)",
              }}
            >
              short-form video
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Track video trends, creators, and competitors in real time. Know what's
            going viral, why it's working, and turn it into data-backed ads, scripts,
            and briefs — all in one session.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link
              to="/auth/signup"
              className={`${btnRaised} w-full sm:w-auto text-base px-8 py-3.5`}
              style={btnRaisedStyle}
            >
              Get started »
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 border-y border-border">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p
            className="text-sm text-muted-foreground mb-8"
            style={{ fontFamily: "'Onest', sans-serif" }}
          >
            Trusted by <span className="text-foreground font-semibold">1,700+ teams</span> worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground/70">
            {["MaxFusion", "SideShift", "AppSumo", "WatchMojo", "Whop", "Yandex", "Harvard", "NYU"].map(
              (name) => (
                <span key={name} className="font-medium tracking-wide">
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="text-xs text-primary uppercase tracking-widest mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Platform
            </div>
            <h2
              className="font-extrabold text-4xl md:text-5xl text-foreground leading-tight"
              style={{ fontFamily: "'Onest', sans-serif" }}
            >
              Everything you need,
              <br />
              nothing you don't
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Research, track, analyze, and produce — one platform instead of a duct-taped stack.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            <div className="flex flex-col gap-2">
              {features.map((f, i) => {
                const Icon = f.icon;
                const active = activeFeature === i;
                return (
                  <button
                    key={f.name}
                    onClick={() => setActiveFeature(i)}
                    className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                      active
                        ? "border-primary/40 bg-primary/8 text-foreground"
                        : "border-border hover:border-border hover:bg-muted/20 text-muted-foreground"
                    }`}
                  >
                    <Icon size={17} className={`mt-0.5 flex-shrink-0 ${active ? "text-primary" : ""}`} />
                    <div>
                      <div className="text-sm font-medium">{f.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{f.tagline}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/12 flex items-center justify-center flex-shrink-0">
                  <FeatIcon size={20} className="text-primary" />
                </div>
                <div>
                  <h3
                    className="font-bold text-xl text-foreground"
                    style={{ fontFamily: "'Onest', sans-serif" }}
                  >
                    {feat.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feat.tagline}</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {feat.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {feat.stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-border bg-background p-4">
                    <div
                      className="font-bold text-2xl text-foreground"
                      style={{ fontFamily: "'Onest', sans-serif" }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="text-xs text-muted-foreground mt-1"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6" id="pricing">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="text-xs text-primary uppercase tracking-widest mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Pricing
            </div>
            <h2
              className="font-extrabold text-4xl md:text-5xl text-foreground mb-4"
              style={{ fontFamily: "'Onest', sans-serif" }}
            >
              Pick the plan that fits your operation
            </h2>
            <p className="text-muted-foreground">
              Free and Pro. Everything is free during beta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 flex flex-col relative overflow-hidden ${
                  plan.highlight
                    ? "border-primary/50 bg-primary/5"
                    : "border-border bg-card"
                }`}
              >
                {plan.highlight && (
                  <>
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, #4285f4, transparent)",
                      }}
                    />
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-primary text-primary-foreground px-3 py-0.5 rounded-full"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Most Popular
                    </div>
                  </>
                )}

                <div className="mb-2">
                  <h3
                    className="font-bold text-xl text-foreground"
                    style={{ fontFamily: "'Onest', sans-serif" }}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                </div>

                <div className="my-6">
                  <div className="flex items-end gap-1">
                    <span
                      className="font-extrabold text-4xl text-foreground"
                      style={{ fontFamily: "'Onest', sans-serif" }}
                    >
                      ${plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground text-sm mb-1.5">/mo</span>
                  </div>
                  <div
                    className="text-xs text-muted-foreground mt-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Free during beta
                  </div>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check size={13} className="text-primary flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/dashboard"
                  className={
                    plan.highlight
                      ? `${btnRaised} w-full py-3 text-sm`
                      : "w-full py-3 rounded-full font-medium text-sm border border-border hover:bg-muted/30 text-foreground transition-all text-center"
                  }
                  style={plan.highlight ? btnRaisedStyle : undefined}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs text-muted-foreground">
            {[
              { icon: Shield, text: "SOC 2 Type II" },
              { icon: Clock, text: "99.9% uptime SLA" },
              { icon: Globe, text: "Global CDN" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon size={12} className="text-primary" /> {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="rounded-3xl border border-primary/15 p-16 relative overflow-hidden"
            style={{
              background: "linear-gradient(160deg, rgba(66,133,244,0.08) 0%, transparent 60%)",
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-primary/15 rounded-full blur-[60px] pointer-events-none" />
            <h2
              className="font-extrabold text-4xl md:text-5xl text-foreground mb-4 relative"
              style={{ fontFamily: "'Onest', sans-serif" }}
            >
              Ready to finally track your market?
            </h2>
            <p className="text-muted-foreground mb-8 relative">
              Close the tabs, cancel the all-nighter, and set up Virlo in 30 seconds.
            </p>
            <Link
              to="/dashboard"
              className={`relative ${btnRaised} text-base px-8 py-4`}
              style={btnRaisedStyle}
            >
              Close the tabs, start tracking »
            </Link>
            <p className="text-xs text-muted-foreground mt-4 relative">
              Free during beta. Pro from $5/mo after launch.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-16 px-6 bg-card/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                  <Zap size={13} className="text-white" />
                </div>
                <span
                  className="font-bold text-lg text-foreground"
                  style={{ fontFamily: "'Onest', sans-serif" }}
                >
                  virlo
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                The AI agent your content team's been missing. Social listening for
                short-form video.
              </p>
            </div>

            {[
              {
                title: "Product",
                links: ["Orbit Search", "Tracking Center", "Content Studio", "Meta Ads Intel"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Press"],
              },
            ].map((col) => (
              <div key={col.title}>
                <div
                  className="text-xs text-muted-foreground uppercase tracking-widest mb-4"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {col.title}
                </div>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span
              className="text-xs text-muted-foreground"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              © 2026 Virlo Inc. All rights reserved.
            </span>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Cookies"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
