import type { ReactNode } from "react";
import { NavLink, Link } from "react-router";
import {
  Search,
  Radio,
  Layers,
  LayoutDashboard,
  Zap,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { BLUE, BLUE_DEEP, MUTED, productBg } from "./theme";

const navItems = [
  { name: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { name: "Orbit", to: "/orbit", icon: Search },
  { name: "Tracking", to: "/tracking", icon: Radio },
  { name: "Niches", to: "/niches", icon: Layers },
] as const;

export function ProductShell({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  const { user, logout } = useAuth();

  return (
    <div
      className="min-h-screen flex relative overflow-hidden"
      style={{
        fontFamily: "'Inter', sans-serif",
        color: "#0f172a",
        background: productBg,
      }}
    >
      <div
        className="pointer-events-none absolute -top-24 left-1/3 w-[720px] h-[420px] rounded-full"
        style={{ background: "rgba(59,130,246,0.2)", filter: "blur(110px)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[420px] h-[320px] rounded-full"
        style={{ background: "rgba(14,165,233,0.12)", filter: "blur(100px)" }}
      />

      <aside
        className="fixed top-0 left-0 bottom-0 z-40 w-14 md:w-56 flex flex-col"
        style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(18px)",
          borderRight: "1px solid rgba(147,197,253,0.35)",
        }}
      >
        <div className="h-16 flex items-center justify-center md:justify-start md:px-5 gap-2.5">
          <Link to="/" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: `linear-gradient(135deg, #38bdf8, ${BLUE_DEEP})` }}
            >
              <Zap size={14} className="text-white" />
            </div>
            <span
              className="hidden md:inline font-semibold text-[17px] tracking-tight"
              style={{ fontFamily: "'Onest', sans-serif", color: "#0f172a" }}
            >
              virlo
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-2 px-2.5 flex flex-col gap-1">
          {navItems.map(({ name, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              title={name}
              className="flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-full text-sm transition-colors"
              style={({ isActive }) => ({
                background: isActive ? "#dbeafe" : "transparent",
                color: isActive ? BLUE_DEEP : MUTED,
                fontWeight: isActive ? 500 : 400,
              })}
            >
              <Icon size={18} className="flex-shrink-0" />
              <span className="hidden md:inline">{name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-2.5 flex flex-col gap-1" style={{ borderTop: "1px solid rgba(147,197,253,0.3)" }}>
          {user ? (
            <p className="hidden md:block text-[11px] px-3 pb-1 truncate" style={{ color: MUTED }}>
              {user.email}
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => logout()}
            title="Sign out"
            className="w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-full text-sm"
            style={{ color: MUTED }}
          >
            <LogOut size={18} className="flex-shrink-0" />
            <span className="hidden md:inline">Sign out</span>
          </button>
          <Link
            to="/"
            title="Back to site"
            className="w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-full text-sm"
            style={{ color: MUTED }}
          >
            <ArrowLeft size={18} className="flex-shrink-0" />
            <span className="hidden md:inline">Back to site</span>
          </Link>
        </div>
      </aside>

      <div className="relative flex-1 ml-14 md:ml-56 min-w-0">
        <div className="px-4 md:px-8 pt-6 pb-12 max-w-[1400px]">
          {title ? (
            <p
              className="text-sm font-medium mb-2"
              style={{ color: BLUE_DEEP, letterSpacing: "0.02em" }}
            >
              {title}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
}
