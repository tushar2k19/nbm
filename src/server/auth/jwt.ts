import { createHmac, timingSafeEqual } from "node:crypto";

export type PortalJwtPayload = {
  sub: string;
  email: string;
  exp: number;
};

function base64UrlEncode(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(input: string): Buffer {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return Buffer.from(b64, "base64");
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET ?? process.env.NBM_JWT_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_SECRET is not set. Add JWT_SECRET to .env for MySQL auth (local dev: any long random string).",
    );
  }
  return secret;
}

export function signPortalToken(payload: Omit<PortalJwtPayload, "exp">, ttlSeconds = 60 * 60 * 8): string {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64UrlEncode(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + ttlSeconds,
    } satisfies PortalJwtPayload),
  );
  const data = `${header}.${body}`;
  const sig = createHmac("sha256", getJwtSecret()).update(data).digest();
  return `${data}.${base64UrlEncode(sig)}`;
}

export function verifyPortalToken(token: string): PortalJwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, sig] = parts;
    const data = `${header}.${body}`;
    const expected = createHmac("sha256", getJwtSecret()).update(data).digest();
    const actual = base64UrlDecode(sig);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

    const payload = JSON.parse(base64UrlDecode(body).toString("utf8")) as PortalJwtPayload;
    if (!payload.sub || !payload.exp) return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function bearerTokenFromRequest(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const token = auth.slice("Bearer ".length).trim();
  return token || null;
}
