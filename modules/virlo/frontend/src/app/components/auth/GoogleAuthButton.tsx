import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const hasGoogleClient = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);

export function GoogleAuthButton({
  label = "Continue with Google",
  onDone,
}: {
  label?: string;
  onDone?: () => void;
}) {
  const { googleLogin } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const googlePopup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setBusy(true);
      setError("");
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const info = await res.json();
        await googleLogin({
          googleAccessToken: tokenResponse.access_token,
          email: info.email,
          firstName: info.given_name,
          lastName: info.family_name,
          avatarUrl: info.picture,
          providerId: info.sub,
        });
        onDone?.();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Google sign-in failed");
      } finally {
        setBusy(false);
      }
    },
    onError: () => setError("Google sign-in was cancelled"),
  });

  const mockGoogle = async () => {
    setBusy(true);
    setError("");
    try {
      await googleLogin({
        email: "demo.creator@gmail.com",
        firstName: "Demo",
        lastName: "Creator",
        providerId: "mock-google-sub",
        avatarUrl: undefined,
      });
      onDone?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        disabled={busy}
        onClick={() => (hasGoogleClient ? googlePopup() : mockGoogle())}
        className="w-full flex items-center justify-center gap-3 rounded-full border border-border bg-white hover:bg-muted/40 transition-colors py-2.5 text-sm font-medium disabled:opacity-60"
      >
        <GoogleIcon />
        {busy ? "Connecting…" : label}
      </button>
      {!hasGoogleClient && (
        <p className="text-[11px] text-muted-foreground mt-2 text-center">
          Demo mode — set <code>VITE_GOOGLE_CLIENT_ID</code> for live Google OAuth
        </p>
      )}
      {error ? <p className="text-xs text-red-600 mt-2 text-center">{error}</p> : null}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l.1.1 6.2 5.2C39.2 37.2 44 32 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}
