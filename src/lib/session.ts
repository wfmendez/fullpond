import { SignJWT, jwtVerify } from "jose";

// Stateless JWT session in an httpOnly cookie (Next 16 native auth pattern, per
// docs/01-app/02-guides/authentication.md). Importable from the Proxy too,
// since it has no server-only / next/headers dependency.

export const SESSION_COOKIE = "fp_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days (seconds)

export type Role = "ADMIN" | "USER";

export type SessionPayload = {
  userId: string;
  role: Role;
};

const encodedKey = new TextEncoder().encode(
  process.env.SESSION_SECRET ?? "dev-only-insecure-secret-change-me",
);

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(encodedKey);
}

export async function decrypt(token?: string): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, { algorithms: ["HS256"] });
    if (
      typeof payload.userId === "string" &&
      (payload.role === "ADMIN" || payload.role === "USER")
    ) {
      return { userId: payload.userId, role: payload.role };
    }
    return null;
  } catch {
    return null;
  }
}
