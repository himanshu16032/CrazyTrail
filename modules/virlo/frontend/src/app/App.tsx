import { BrowserRouter, Navigate, Routes, Route } from "react-router";
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/app/components/ProtectedRoute";

import HomePage from "./page";
import DashboardPage from "./dashboard/page";
import PricingPage from "./pricing/page";
import OrbitPage from "./orbit/page";
import TrackingPage from "./tracking/page";
import NichesPage from "./niches/page";
import SignInPage from "./auth/signin/page";
import SignUpPage from "./auth/signup/page";
import FeaturesPage from "./features/page";
import FeatureDetailPage from "./features/[slug]/page";
import SolutionsPage from "./solutions/page";
import SolutionDetailPage from "./solutions/[slug]/page";
import ResourcesPage from "./resources/page";
import ResourceDetailPage from "./resources/[slug]/page";
import McpPage from "./mcp/page";
import ApiPage from "./api/page";
import MissionPage from "./our-mission/page";
import BrandPage from "./brand/page";
import GrantPage from "./grant-program/page";

const googleClientId =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "1000000000000-democlientid.apps.googleusercontent.com";

function routerBasename() {
  const base = import.meta.env.BASE_URL || "/";
  if (base === "/") return undefined;
  return base.replace(/\/$/, "");
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <BrowserRouter basename={routerBasename()}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/features/:slug" element={<FeatureDetailPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:slug" element={<ResourceDetailPage />} />
            <Route path="/mcp" element={<McpPage />} />
            <Route path="/api" element={<ApiPage />} />
            <Route path="/our-mission" element={<MissionPage />} />
            <Route path="/brand" element={<BrandPage />} />
            <Route path="/grant-program" element={<GrantPage />} />

            <Route path="/auth/signin" element={<SignInPage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />
            <Route path="/login" element={<Navigate to="/auth/signin" replace />} />
            <Route path="/signup" element={<Navigate to="/auth/signup" replace />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orbit"
              element={
                <ProtectedRoute>
                  <OrbitPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tracking"
              element={
                <ProtectedRoute>
                  <TrackingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/niches"
              element={
                <ProtectedRoute>
                  <NichesPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
