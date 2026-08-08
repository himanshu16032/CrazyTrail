import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { PageSpinner } from "@/app/components/product/ui";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <PageSpinner label="Checking session…" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
