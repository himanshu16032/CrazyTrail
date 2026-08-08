/**
 * Abstract auth client — Phase frontend only.
 * Swap `mockAuthClient` internals for FastAPI fetch calls later without changing AuthContext.
 */

export type AuthProviderKind = "LOCAL" | "GOOGLE";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  workspaceId: string;
  planId?: string;
  authProvider: AuthProviderKind;
  emailVerified: boolean;
  createdAt: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface GoogleAuthPayload {
  googleIdToken?: string;
  googleAccessToken?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  providerId?: string;
}

const TOKEN_KEY = "VIRLO_AUTH_TOKEN";
const USERS_KEY = "VIRLO_AUTH_USERS";

type StoredUser = AuthUser & { passwordHash?: string };

function delay(ms = 350) {
  return new Promise((r) => setTimeout(r, ms));
}

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function readUsers(): Record<string, StoredUser> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeUsers(users: Record<string, StoredUser>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toPublic(user: StoredUser): AuthUser {
  const { passwordHash: _, ...rest } = user;
  return rest;
}

function makeToken(userId: string) {
  return `mock.${btoa(userId)}.${Date.now().toString(36)}`;
}

function hashPassword(password: string) {
  // Demo-only stand-in — replace with FastAPI/BCrypt verification
  return btoa(`virlo:${password}`);
}

export const authClient = {
  getStoredToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setSession(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    await delay(120);
    const token = this.getStoredToken();
    if (!token) return null;
    try {
      const userId = atob(token.split(".")[1] || "");
      const users = readUsers();
      const found = Object.values(users).find((u) => u.id === userId);
      return found ? toPublic(found) : null;
    } catch {
      return null;
    }
  },

  async login(email: string, password: string): Promise<AuthSession> {
    await delay();
    const key = email.trim().toLowerCase();
    const users = readUsers();
    const user = users[key];
    if (!user || user.passwordHash !== hashPassword(password)) {
      throw new Error("Invalid email or password");
    }
    const token = makeToken(user.id);
    this.setSession(token);
    return { user: toPublic(user), token };
  },

  async register(payload: RegisterPayload): Promise<AuthSession> {
    await delay();
    const key = payload.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key)) {
      throw new Error("Please enter a valid email address");
    }
    if (payload.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    const users = readUsers();
    if (users[key]) {
      throw new Error("An account with this email already exists");
    }
    const user: StoredUser = {
      id: uid("user"),
      email: key,
      name:
        [payload.firstName, payload.lastName].filter(Boolean).join(" ") ||
        key.split("@")[0],
      firstName: payload.firstName,
      lastName: payload.lastName,
      workspaceId: uid("ws"),
      planId: "plan_starter",
      authProvider: "LOCAL",
      emailVerified: false,
      createdAt: new Date().toISOString(),
      passwordHash: hashPassword(payload.password),
    };
    users[key] = user;
    writeUsers(users);
    const token = makeToken(user.id);
    this.setSession(token);
    return { user: toPublic(user), token };
  },

  async googleAuth(payload: GoogleAuthPayload): Promise<AuthSession> {
    await delay();
    const email = (payload.email || "").trim().toLowerCase();
    if (!email) {
      throw new Error("Google account email is required");
    }
    const users = readUsers();
    let user = users[email];
    if (!user) {
      user = {
        id: uid("user"),
        email,
        name:
          [payload.firstName, payload.lastName].filter(Boolean).join(" ") ||
          email.split("@")[0],
        firstName: payload.firstName,
        lastName: payload.lastName,
        avatarUrl: payload.avatarUrl,
        workspaceId: uid("ws"),
        planId: "plan_starter",
        authProvider: "GOOGLE",
        emailVerified: true,
        createdAt: new Date().toISOString(),
      };
      users[email] = user;
      writeUsers(users);
    } else {
      user.authProvider = "GOOGLE";
      user.emailVerified = true;
      if (payload.avatarUrl) user.avatarUrl = payload.avatarUrl;
      users[email] = user;
      writeUsers(users);
    }
    const token = makeToken(user.id);
    this.setSession(token);
    return { user: toPublic(user), token };
  },

  async logout(): Promise<void> {
    await delay(80);
    this.clearSession();
  },
};
