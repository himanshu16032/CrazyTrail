import { useState } from "react";
import { Link } from "react-router";
import { Check } from "lucide-react";
import {
  btnGhost,
  btnRaised,
  btnRaisedStyle,
  pricingCardShadow,
  pricingCardShadowHover,
} from "@/app/components/product/theme";

export type HomePlan = {
  name: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
  credits?: number | null;
};

export function PricingCards({
  plans,
  annual,
  ctaTo = "/auth/signup",
}: {
  plans: HomePlan[];
  annual: boolean;
  ctaTo?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className={`grid grid-cols-1 gap-5 lg:gap-6 items-stretch ${
        plans.length <= 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : "md:grid-cols-3"
      }`}
    >
      {plans.map((plan) => {
        const isPro = plan.highlight;
        const isHover = hovered === plan.name;
        const price = annual ? plan.annualPrice ?? plan.monthlyPrice : plan.monthlyPrice;
        return (
          <div
            key={plan.name}
            onMouseEnter={() => setHovered(plan.name)}
            onMouseLeave={() => setHovered(null)}
            className={`relative flex flex-col rounded-[22px] p-7 sm:p-8 transition-all duration-300 ease-out ${
              isPro
                ? "bg-[#f3f8ff] border border-[#aecbfa]"
                : "bg-white border border-[rgba(60,64,67,0.1)]"
            }`}
            style={{
              boxShadow: isHover ? pricingCardShadowHover : pricingCardShadow,
              transform: isHover ? "translateY(-4px)" : "translateY(0)",
            }}
          >
            {isPro && (
              <>
                <div
                  className="absolute top-0 left-6 right-6 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, #4285f4, transparent)",
                  }}
                />
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-medium bg-[#4285f4] text-white px-3 py-1 rounded-full whitespace-nowrap"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    boxShadow: "0 4px 12px rgba(66,133,244,0.35)",
                  }}
                >
                  Most Popular
                </div>
              </>
            )}

            <div className="mb-1">
              <h3
                className="font-bold text-[22px] text-[#202124] tracking-tight"
                style={{ fontFamily: "'Onest', sans-serif" }}
              >
                {plan.name}
              </h3>
              <p className="text-[14px] text-[#5f6368] mt-1.5 leading-snug">
                {plan.description}
              </p>
            </div>

            <div className="my-7">
              {price != null ? (
                <>
                  <div className="flex items-baseline flex-wrap gap-x-1.5 gap-y-0">
                    <span
                      className="font-extrabold text-[44px] leading-none tracking-tight text-[#202124]"
                      style={{ fontFamily: "'Onest', sans-serif" }}
                    >
                      ${price}
                    </span>
                    <span className="text-[#80868b] text-[14px]">/mo</span>
                  </div>
                  <p
                    className="text-[12px] text-[#80868b] mt-2.5"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Free during beta
                    {plan.credits != null
                      ? ` · ${plan.credits.toLocaleString()} credits`
                      : ""}
                  </p>
                </>
              ) : (
                <span
                  className="font-extrabold text-[44px] leading-none tracking-tight text-[#202124]"
                  style={{ fontFamily: "'Onest', sans-serif" }}
                >
                  Custom
                </span>
              )}
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-[14px] text-[#5f6368] leading-snug"
                >
                  <span
                    className="mt-0.5 w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(66,133,244,0.1)" }}
                  >
                    <Check size={11} className="text-[#4285f4]" strokeWidth={2.75} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              to={ctaTo}
              className={
                isPro
                  ? `${btnRaised} w-full py-3 text-[14px]`
                  : `${btnGhost} w-full py-3 text-[14px]`
              }
              style={isPro ? btnRaisedStyle : undefined}
            >
              {plan.cta}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export function BillingToggle({
  annual,
  onChange,
}: {
  annual: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="inline-flex items-center justify-center gap-3 mt-8 select-none">
      <span
        className={`text-[14px] transition-colors ${
          !annual ? "text-[#202124] font-medium" : "text-[#80868b]"
        }`}
      >
        Monthly
      </span>
      <button
        type="button"
        onClick={() => onChange(!annual)}
        className={`relative w-[46px] h-[26px] rounded-full transition-colors duration-200 flex-shrink-0 ${
          annual ? "bg-[#4285f4]" : "bg-[#dadce0]"
        }`}
        aria-label="Toggle annual billing"
      >
        <span
          className={`absolute top-[3px] left-[3px] w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out ${
            annual ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <span
        className={`text-[14px] transition-colors ${
          annual ? "text-[#202124] font-medium" : "text-[#80868b]"
        }`}
      >
        Annual{" "}
        <span
          className="text-[#4285f4] text-[12px] font-medium ml-0.5"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          30% Off
        </span>
      </span>
    </div>
  );
}
