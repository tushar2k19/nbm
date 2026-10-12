/**
 * AuthProvider — session + NBM role / state profile for portal routes.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { NbmRole } from "@/lib/roles";
import { getStateName } from "@/data/indianStates";
import { isMysqlBackend } from "@/lib/backend-config";
import {
  mysqlFetchSession,
  mysqlLogout,
} from "@/lib/portal-client";

// ── Types ──

export type StateUserProfile = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  mobile: string | null;
  state_code: string | null;
  role: NbmRole;
  is_active: boolean;
};

export type PortalUser = {
  id: string;
  email?: string;
};

export type AuthState = {
  session: Session | null;
  user: User | PortalUser | null;
  profile: StateUserProfile | null;
  role: NbmRole | null;
  stateName: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

function MysqlAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PortalUser | null>(null);
  const [profile, setProfile] = useState<StateUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadSession = useCallback(async () => {
    try {
      const data = await mysqlFetchSession();
      setUser(data.user);
      setProfile(data.profile);
    } catch (err) {
      console.error("[Auth] MySQL session error:", err);
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSession();

    const onAuthChange = () => void loadSession();
    window.addEventListener("nbm-auth-changed", onAuthChange);
    return () => window.removeEventListener("nbm-auth-changed", onAuthChange);
  }, [loadSession]);

  const signOut = useCallback(async () => {
    try {
      await mysqlLogout();
    } finally {
      setUser(null);
      setProfile(null);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    await loadSession();
  }, [loadSession]);

  const role = (profile?.role as NbmRole) ?? null;
  const stateName = profile?.state_code ? getStateName(profile.state_code) : null;

  return (
    <AuthContext.Provider
      value={{
        session: null,
        user,
        profile,
        role,
        stateName,
        loading,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<StateUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("state_users")
        .select("*")
        .eq("user_id", userId)
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        console.error("[Auth] Failed to fetch profile:", error.message);
        setProfile(null);
        return;
      }

      setProfile(data as StateUserProfile | null);
    } catch (err) {
      console.error("[Auth] Profile fetch error:", err);
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function init() {
      const {
        data: { session: initial },
      } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(initial);
      if (initial?.user) {
        await fetchProfile(initial.user.id);
      }
      if (mounted) setLoading(false);
    }

    void init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      if (newSession?.user) {
        await fetchProfile(newSession.user.id);
      } else {
        setProfile(null);
      }
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (session?.user) {
      await fetchProfile(session.user.id);
    }
  }, [session, fetchProfile]);

  const user = session?.user ?? null;
  const role = (profile?.role as NbmRole) ?? null;
  const stateName = profile?.state_code ? getStateName(profile.state_code) : null;

  return (
    <AuthContext.Provider
      value={{ session, user, profile, role, stateName, loading, signOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  if (isMysqlBackend()) {
    return <MysqlAuthProvider>{children}</MysqlAuthProvider>;
  }
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

/** Call after successful MySQL login so AuthProvider picks up the new session. */
export function notifyMysqlLogin(): void {
  window.dispatchEvent(new Event("nbm-auth-changed"));
}
