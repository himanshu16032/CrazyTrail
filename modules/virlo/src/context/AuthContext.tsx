import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  authClient,
  type AuthUser,
  type GoogleAuthPayload,
  type RegisterPayload,
} from "@/lib/auth/client";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  googleLogin: (payload: GoogleAuthPayload) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refetchUser = useCallback(async () => {
    const current = await authClient.getCurrentUser();
    setUser(current);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const current = await authClient.getCurrentUser();
        if (!cancelled) setUser(current);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { user: next } = await authClient.login(email, password);
      setUser(next);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    setIsLoading(true);
    try {
      const { user: next } = await authClient.register(payload);
      setUser(next);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const googleLogin = useCallback(async (payload: GoogleAuthPayload) => {
    setIsLoading(true);
    try {
      const { user: next } = await authClient.googleAuth(payload);
      setUser(next);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authClient.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      register,
      googleLogin,
      logout,
      refetchUser,
    }),
    [user, isLoading, login, register, googleLogin, logout, refetchUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
