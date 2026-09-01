import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { authStore, rushendApi, type AuthUser, type Session } from "@/lib/rushendApi";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AuthUser>;
  signup: (input: { email: string; password: string; full_name: string; role: "customer" | "staff"; area?: string; phone?: string; language_pref?: string }) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function persistSession(session: Session | null) {
  authStore.session = session;
}

export function RushEndAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(Boolean(authStore.token));
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    if (!authStore.token) { setUser(null); setLoading(false); return; }
    try { const result = await rushendApi.me(); setUser(result.user); setError(null); }
    catch (cause) { persistSession(null); setUser(null); setError(cause instanceof Error ? cause.message : "Session expired"); }
    finally { setLoading(false); }
  };

  useEffect(() => { void refresh(); }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    const result = await rushendApi.login({ email, password });
    persistSession(result.session);
    setUser(result.user);
    return result.user;
  };

  const signup = async (input: { email: string; password: string; full_name: string; role: "customer" | "staff"; area?: string; phone?: string; language_pref?: string }) => {
    setError(null);
    const result = await rushendApi.signup(input);
    persistSession(result.session);
    setUser(result.user);
    return result.user;
  };

  const logout = async () => {
    try { if (authStore.token) await rushendApi.logout(); } finally { persistSession(null); setUser(null); }
  };

  const value = useMemo(() => ({ user, loading, error, login, signup, logout, refresh }), [user, loading, error]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useRushEndAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useRushEndAuth must be used inside RushEndAuthProvider");
  return value;
}
