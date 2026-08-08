import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Check, Clock, Globe, Shield } from "lucide-react";
import type { PricingPlan } from "@/types/schema";
import { getPricingPlans } from "@/lib/db";
import { MarketingShell } from "../components/marketing/MarketingShell";
import { btnRaised, btnRaisedStyle } from "../components/product/theme";
import { PageSpinner } from "../components/product/ui";

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getPricingPlans()
      .then((data) => {
        if (!cancelled) {
          setPlans(data);
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
      <section className="pt-12 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="text-xs text-primary uppercase tracking-widest mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Pricing
            </div>
            <h1
              className="font-extrabold text-4xl md:text-5xl text-foreground mb-4"
              style={{ fontFamily: "'Onest', sans-serif" }}
            >
              Data that pays for itself.
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Free and Pro. Everything is free during beta.
            </p>
          </div>

          {loading ? (
            <PageSpinner label="Loading plans…" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-2xl border p-8 flex flex-col relative overflow-hidden backdrop-blur-md ${
                    plan.highlighted
                      ? "border-primary/50 bg-primary/5"
                      : "border-white/60 bg-white/80"
                  }`}
                >
                  {plan.highlighted && (
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
                    <h2
                      className="font-bold text-xl text-foreground"
                      style={{ fontFamily: "'Onest', sans-serif" }}
                    >
                      {plan.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                  </div>

                  <div className="my-6">
                    <div className="flex items-end gap-1">
                      <span
                        className="font-extrabold text-4xl text-foreground"
                        style={{ fontFamily: "'Onest', sans-serif" }}
                      >
                        ${plan.monthlyPrice ?? 0}
                      </span>
                      <span className="text-muted-foreground text-sm mb-1.5">/mo</span>
                    </div>
                    <div
                      className="text-xs text-muted-foreground mt-1"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Free during beta
                      {plan.credits != null
                        ? ` · ${plan.credits.toLocaleString()} credits`
                        : ""}
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
                    to="/auth/signup"
                    className={
                      plan.highlighted
                        ? `${btnRaised} w-full py-3 text-sm`
                        : "w-full py-3 rounded-full font-medium text-sm border border-border hover:bg-muted/30 text-foreground transition-all text-center"
                    }
                    style={plan.highlighted ? btnRaisedStyle : undefined}
                  >
                    {plan.ctaLabel}
                  </Link>
                </div>
              ))}
            </div>
          )}

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
    </MarketingShell>
  );
}
