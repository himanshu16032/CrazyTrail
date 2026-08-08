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
            className={`${btnRaised} text-sm px-6 py-3`}
            style={btnRaisedStyle}
          >
            {content.ctaLabel ?? "Start for $0 »"}
          </Link>
        }
      />

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.cards.map((card) => (
            <GlassCard key={card.title} className="flex flex-col gap-3">
              <h2
                className="font-semibold text-lg"
                style={{ fontFamily: "'Onest', sans-serif" }}
              >
                {card.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {card.body}
              </p>
              {card.href ? (
                <Link
                  to={card.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
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
          <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Onest', sans-serif" }}>
            Page not found
          </h1>
          <p className="text-muted-foreground mb-6">
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
