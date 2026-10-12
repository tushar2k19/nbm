import { bearerTokenFromRequest, verifyPortalToken } from "@/server/auth/jwt";
import { readSessionCookie } from "@/server/auth/session-cookie";
import { getActiveProfileByUserId, type StateUserProfile } from "@/server/db/mysql";

export type PortalAuthContext = {
  userId: string;
  email: string;
  profile: StateUserProfile;
};

export async function requirePortalAuth(request: Request): Promise<PortalAuthContext | Response> {
  const token = readSessionCookie(request) ?? bearerTokenFromRequest(request);
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const claims = verifyPortalToken(token);
  if (!claims) {
    return Response.json({ error: "Invalid or expired session" }, { status: 401 });
  }

  const profile = await getActiveProfileByUserId(claims.sub);
  if (!profile) {
    return Response.json({ error: "No active portal profile for this account" }, { status: 403 });
  }

  return {
    userId: claims.sub,
    email: claims.email,
    profile,
  };
}

export function isAuthError(result: PortalAuthContext | Response): result is Response {
  return result instanceof Response;
}
