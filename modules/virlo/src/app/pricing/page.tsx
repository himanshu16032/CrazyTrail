import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Clock, Globe, Shield } from "lucide-react";
import type { PricingPlan } from "@/types/schema";
import { getPricingPlans } from "@/lib/db";
import {
  MarketingShell,
  SectionEyebrow,
} from "../components/marketing/MarketingShell";
import {
  BillingToggle,
  PricingCards,
  type HomePlan,
} from "../components/marketing/PricingCards";
import { PageSpinner } from "../components/product/ui";

function toHomePlan(plan: PricingPlan): HomePlan {
  return {
    name: plan.name,
    monthlyPrice: plan.monthlyPrice,
    annualPrice: plan.annualPrice ?? null,
    description: plan.description ?? "",
    features: plan.features,
    cta: plan.ctaLabel,
    highlight: Boolean(plan.highlighted),
    credits: plan.credits,
  };
}

export default function PricingPage() {
  const [plans, setPlans] = useState<HomePlan[]>([]);
  const [annual, setAnnual] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getPricingPlans()
      .then((data) => {
        if (!cancelled) {
          setPlans(data.map(toHomePlan));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <MarketingShell>
      <section className="relative pt-16 sm:pt-20 pb-28 px-5 sm:px-6 overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[min(980px,120%)] h-[480px]"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 35%, rgba(66,133,244,0.22) 0%, rgba(138,180,248,0.1) 38%, transparent 70%)",
          }}
        />

        <div className="max-w-[1080px] mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-14">
            <SectionEyebrow>Pricing</SectionEyebrow>
            <h1
              className="font-extrabold text-[#202124] tracking-[-0.03em] leading-[1.08] mb-4"
              style={{
                fontFamily: "'Onest', sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 3.35rem)",
              }}
            >
              Data that pays for itself.
            </h1>
            <p className="text-[#5f6368] text-[16px] sm:text-[17px] max-w-lg mx-auto leading-relaxed">
              Every plan includes Custom Niches, Orbit Search, the Content Studio, and data
              exports.
            </p>
            <BillingToggle annual={annual} onChange={setAnnual} />
          </div>

          {loading ? (
            <PageSpinner label="Loading plans…" />
          ) : (
            <PricingCards plans={plans} annual={annual} ctaTo="/auth/signup" />
          )}

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-14 text-[12px] text-[#80868b]">
            {[
              { icon: Shield, text: "SOC 2 Type II" },
              { icon: Clock, text: "99.9% uptime SLA" },
              { icon: Globe, text: "Global CDN" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5">
                <Icon size={13} className="text-[#4285f4]" /> {text}
              </span>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-[#5f6368] text-sm mb-4">
              Prefer to explore first?{" "}
              <Link to="/features" className="text-[#1a73e8] font-medium hover:underline">
                Browse the full platform
              </Link>
            </p>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
