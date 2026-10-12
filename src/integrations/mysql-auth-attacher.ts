import { createMiddleware } from "@tanstack/react-start";
import { getStoredAuthToken } from "@/lib/auth-session";

/** Attaches MySQL/JWT bearer token to server function calls (mirrors Supabase attacher). */
export const attachMysqlAuth = createMiddleware({ type: "function" }).client(async ({ next }) => {
  const token = getStoredAuthToken();
  return next({
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
});
