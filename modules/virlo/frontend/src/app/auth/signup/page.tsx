import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { MarketingShell, GlassCard } from "@/app/components/marketing/MarketingShell";
import { GoogleAuthButton } from "@/app/components/auth/GoogleAuthButton";
import { btnRaised, btnRaisedStyle } from "@/app/components/product/theme";

export default function SignUpPage() {
  const { register, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isLoading) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, isLoading, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register({ email, password, firstName, lastName });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MarketingShell>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-5 sm:px-6 py-16 relative">
        <GlassCard className="w-full max-w-md !p-8 sm:!p-9 shadow-[0_24px_64px_rgba(66,133,244,0.12)]">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <div>
              <h1
                className="font-bold text-xl"
                style={{ fontFamily: "'Onest', sans-serif" }}
              >
                Get started
              </h1>
              <p className="text-sm text-muted-foreground">Free during beta · No card required</p>
            </div>
          </div>

          <GoogleAuthButton
            label="Sign up with Google"
            onDone={() => navigate("/dashboard", { replace: true })}
          />

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or email</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm font-medium">
                First name
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-white/90 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <label className="text-sm font-medium">
                Last name
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-white/90 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
            </div>
            <label className="text-sm font-medium">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5 w-full rounded-xl border border-border bg-white/90 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="you@company.com"
              />
            </label>
            <label className="text-sm font-medium">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="mt-1.5 w-full rounded-xl border border-border bg-white/90 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="At least 6 characters"
              />
            </label>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={submitting}
              className={`${btnRaised} w-full py-2.5 text-sm mt-1 disabled:opacity-60`}
              style={btnRaisedStyle}
            >
              {submitting ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-5">
            Already have an account?{" "}
            <Link to="/auth/signin" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </GlassCard>
      </div>
    </MarketingShell>
  );
}
