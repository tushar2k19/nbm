/**
 * AuthProvider — React context that tracks the Supabase session
 * and the user's NBM role + state profile.
 *
 * Wraps the entire app (plugged into __root.tsx).
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

export type AuthState = {
  /** Supabase auth session */
  session: Session | null;
  /** Supabase user object */
  user: User | null;
  /** The user's NBM portal profile (from state_users table) */
  profile: StateUserProfile | null;
  /** Convenience: the user's NBM role */
  role: NbmRole | null;
  /** Convenience: state display name */
  stateName: string | null;
  /** true while session + profile are still loading */
  loading: boolean;
  /** Sign out */
  signOut: () => Promise<void>;
  /** Force re-fetch profile */
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

// ── Provider ──

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<StateUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the user's state_users profile
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

  // Initial session + listener
  useEffect(() => {
    let mounted = true;

    async function init() {
      const { data: { session: initial } } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(initial);
      if (initial?.user) {
        await fetchProfile(initial.user.id);
      }
      if (mounted) setLoading(false);
    }

    void init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (!mounted) return;
        setSession(newSession);
        if (newSession?.user) {
          await fetchProfile(newSession.user.id);
        } else {
          setProfile(null);
        }
        if (mounted) setLoading(false);
      },
    );

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

// ── Hook ──

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
