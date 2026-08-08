import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import {
  GlassCard,
  MarketingHero,
  MarketingShell,
} from "@/app/components/marketing/MarketingShell";
import { btnRaised, btnRaisedStyle } from "@/app/components/product/theme";
import { getMarketingPage, type MarketingPageContent } from "@/app/data/marketingPages";

export function MarketingContentPage({
  content,
}: {
  content: MarketingPageContent;
}) {
  return (
    <MarketingShell>
      <MarketingHero
        eyebrow={content.eyebrow}
        title={content.title}
        highlight={content.highlight}
        description={content.description}
        cta={
          <Link
            to={content.ctaTo ?? "/auth/signup"}
            className={`${btnRaised} text-sm px-7 py-3`}
            style={btnRaisedStyle}
          >
            {content.ctaLabel ?? "Start for $0 »"}
          </Link>
        }
      />

      <section className="px-5 sm:px-6 pb-28">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.cards.map((card, i) => (
            <GlassCard
              key={card.title}
              className="flex flex-col gap-3 min-h-[180px]"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-[12px] font-semibold text-[#4285f4]"
                style={{
                  background: "rgba(66,133,244,0.1)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h2
                className="font-semibold text-[17px] text-[#202124] tracking-tight"
                style={{ fontFamily: "'Onest', sans-serif" }}
              >
                {card.title}
              </h2>
              <p className="text-[14px] text-[#5f6368] leading-relaxed flex-1">
                {card.body}
              </p>
              {card.href ? (
                <Link
                  to={card.href}
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#1a73e8] group-hover:gap-2 transition-all"
                >
                  Explore <ArrowRight size={14} />
                </Link>
              ) : null}
            </GlassCard>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}

export function MarketingPageBySlug({ slug }: { slug: string }) {
  const content = getMarketingPage(slug);
  if (!content) {
    return (
      <MarketingShell>
        <div className="max-w-xl mx-auto px-6 py-32 text-center">
          <h1
            className="text-3xl font-bold mb-3 text-[#202124]"
            style={{ fontFamily: "'Onest', sans-serif" }}
          >
            Page not found
          </h1>
          <p className="text-[#5f6368] mb-6">
            This route isn’t in the current blueprint module.
          </p>
          <Link to="/" className={`${btnRaised} text-sm px-5 py-2.5`} style={btnRaisedStyle}>
            Back home
          </Link>
        </div>
      </MarketingShell>
    );
  }
  return <MarketingContentPage content={content} />;
}
