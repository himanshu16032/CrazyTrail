import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Search,
  TrendingUp,
  Radio,
  Layers,
  Megaphone,
  Code2,
  Menu,
  X,
  Check,
  Zap,
  Globe,
  Video,
  Shield,
  Clock,
} from "lucide-react";
import { BillingToggle, PricingCards } from "./components/marketing/PricingCards";

// ─── Data ───────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Search,
    name: "Orbit Search",
    tagline: "Discover trends before they explode",
    description:
      "Real-time search across TikTok, YouTube Shorts, and Instagram Reels. Surface rising creators, trending sounds, and breakout niches before they hit mainstream attention.",
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
  {
    icon: Code2,
    name: "MCP Server",
    tagline: "Plug Virlo data into any AI agent",
    description:
      "First-class Model Context Protocol server. Connect Virlo's full data catalog to Claude, GPT, or any MCP-compatible agent. 200+ endpoints with full streaming support.",
    stats: [
      { label: "API endpoints", value: "200+" },
      { label: "Avg. response", value: "120ms" },
    ],
  },
];

const plans = [
  {
    name: "Starter",
    monthlyPrice: 49,
    annualPrice: 34,
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
    cta: "Start for $0",
    highlight: false,
  },
  {
    name: "Pro",
    monthlyPrice: 199,
    annualPrice: 139,
    description: "Growing agencies & teams",
    features: [
      "12,000 plan credits/month",
      "Everything in Starter",
      "3 Team Seats Included",
      "Slack, Discord & webhook alerts",
      "Zapier & n8n integrations",
      "Performing Meta Ads Library",
      "Priority support",
    ],
    cta: "Start for $0",
    highlight: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    annualPrice: null,
    description: "Custom solutions for your team",
    features: [
      "Everything in Pro",
      "Founder support",
      "Custom integrations",
      "Dedicated account manager",
      "API access",
    ],
    cta: "Book a Demo",
    highlight: false,
  },
];

const btnRaised =
  "inline-flex items-center justify-center gap-2 text-white font-semibold rounded-full transition-all hover:-translate-y-0.5";
const btnRaisedStyle = {
  background: "linear-gradient(#4285f4, #1a73e8)",
  border: "1px solid rgba(66,133,244,0.35)",
  boxShadow: "inset 0 1px rgba(255,255,255,0.25), 0 4px 12px rgba(66,133,244,0.28), 0 2px 4px rgba(0,0,0,0.08)",
};

const CODE = `import { VirloClient } from "@virlo/sdk";

const virlo = new VirloClient({
  apiKey: process.env.VIRLO_KEY,
});

// Discover trending creators in a niche
const trending = await virlo.orbit.search({
  query: "sustainable fashion",
  platforms: ["tiktok", "reels"],
  sortBy: "velocity",
  limit: 20,
});

// Track a creator with alerts
await virlo.tracking.add({
  handle: "@maya_creates",
  platform: "tiktok",
  alerts: {
    viewSpike: 2.0,
    followerMilestone: true,
  },
});

console.log(trending.creators[0]);
// { handle: "@eco_threads", views: "4.2M", growth: "+280%" }`;

// ─── Syntax-highlight helper (safe — no user input) ─────────────────────────
function highlight(line: string): string {
  return line
    .replace(
      /\b(import|from|const|await|async|return|true|false)\b/g,
      '<span style="color:#1a73e8">$1</span>'
    )
    .replace(/"([^"]*)"/g, '<span style="color:#188038">"$1"</span>')
    .replace(/(\/\/.*$)/g, '<span style="color:#9aa0a6">$1</span>')
    .replace(/\b(\d+(\.\d+)?)\b/g, '<span style="color:#e37400">$1</span>');
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function HomePage() {
  const [annual, setAnnual] = useState(false);
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
      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(60,64,67,0.08)] bg-white/80 backdrop-blur-xl">
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
                { label: "API", to: "/api" },
                { label: "MCP", to: "/mcp" },
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
              Start for $0 »
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
              { label: "API", to: "/api" },
              { label: "MCP", to: "/mcp" },
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
              Start for $0 »
            </Link>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(980px,120%)] h-[520px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(66,133,244,0.22) 0%, rgba(138,180,248,0.08) 42%, transparent 70%)",
          }}
        />

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
              TikTok, Reels & Shorts
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
              Start a 7-day trial for $0 »
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Video size={11} className="text-[#ea4335]" /> TikTok
            </span>
            <span className="w-px h-3 bg-border" />
            <span className="flex items-center gap-1.5">
              <Video size={11} className="text-[#4285f4]" /> YouTube Shorts
            </span>
            <span className="w-px h-3 bg-border" />
            <span className="flex items-center gap-1.5">
              <Video size={11} className="text-[#fbbc04]" /> Instagram Reels
            </span>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ───────────────────────────────────────────────────── */}
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

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
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
            {/* Selector */}
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

            {/* Detail panel */}
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

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-5 sm:px-6 overflow-hidden" id="pricing">
        <div
          className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 w-[min(980px,120%)] h-[420px]"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 35%, rgba(66,133,244,0.2) 0%, rgba(138,180,248,0.08) 40%, transparent 70%)",
          }}
        />
        <div className="max-w-[1080px] mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-14">
            <div
              className="text-[11px] font-medium text-[#4285f4] uppercase tracking-[0.18em] mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Pricing
            </div>
            <h2
              className="font-extrabold text-[#202124] tracking-[-0.03em] leading-[1.08] mb-4"
              style={{
                fontFamily: "'Onest', sans-serif",
                fontSize: "clamp(2.2rem, 4.5vw, 3.1rem)",
              }}
            >
              Pick the plan that fits your operation
            </h2>
            <p className="text-[#5f6368] text-[16px] max-w-lg mx-auto leading-relaxed">
              Every plan includes the Content Research Agent, Tracking Center, and Content Studio.
            </p>
            <BillingToggle annual={annual} onChange={setAnnual} />
          </div>

          <PricingCards
            annual={annual}
            ctaTo="/auth/signup"
            plans={plans.map((p) => ({
              ...p,
              credits:
                p.name === "Starter" ? 2000 : p.name === "Pro" ? 12000 : null,
            }))}
          />

          {/* Trust line */}
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

      {/* ── DEVELOPER ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-border bg-card/15">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="text-xs text-accent uppercase tracking-widest mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              For developers
            </div>
            <h2
              className="font-extrabold text-4xl text-foreground mb-6 leading-tight"
              style={{ fontFamily: "'Onest', sans-serif" }}
            >
              Build on the world's largest
              <br />
              short-form video data API
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              200+ REST endpoints, full streaming support, and first-class MCP
              server integration. Connect Virlo's data catalog to any AI agent
              or workflow in minutes.
            </p>

            <ul className="flex flex-col gap-3 mb-10">
              {[
                "200+ API endpoints with OpenAPI spec",
                "MCP Server for Claude, GPT, and any compatible agent",
                "SDKs for Node.js, Python, and Go",
                "Webhooks and real-time streaming support",
                "99.9% uptime SLA with global edge caching",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Check size={13} className="text-accent flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 text-sm bg-accent/10 text-accent border border-accent/20 px-5 py-2.5 rounded-xl hover:bg-accent/15 transition-colors">
                <Code2 size={14} /> View API docs
              </button>
              <button className="flex items-center gap-2 text-sm text-muted-foreground px-5 py-2.5 rounded-xl hover:text-foreground transition-colors">
                <Globe size={14} /> MCP Server guide
              </button>
            </div>
          </div>

          {/* Code block */}
          <div className="rounded-2xl border border-border bg-background overflow-hidden">
            <div className="h-10 border-b border-border bg-muted/20 flex items-center justify-between px-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span
                className="text-xs text-muted-foreground"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                index.ts
              </span>
              <div className="w-20" />
            </div>
            <pre
              className="p-6 text-xs leading-relaxed overflow-x-auto"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#9090b0" }}
            >
              <code>
                {CODE.split("\n").map((line, i) => (
                  <span
                    key={i}
                    className="block"
                    dangerouslySetInnerHTML={{ __html: highlight(line) || "&nbsp;" }}
                  />
                ))}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
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
              Starter plan from $49/mo. No long-term contracts.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-16 px-6 bg-card/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
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
                TikTok, Reels & Shorts.
              </p>
            </div>

            {[
              {
                title: "Product",
                links: ["Orbit Search", "Tracking Center", "Content Studio", "Meta Ads Intel", "MCP Server"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Press"],
              },
              {
                title: "Developers",
                links: ["API Reference", "SDKs", "MCP Guide", "Changelog", "Status"],
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
