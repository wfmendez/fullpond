import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { startSession } from "@/lib/dal";

// Step 2 — Google redirects here with ?code=...; exchange it for a token,
// fetch the user's profile, and create a session exactly like credentials login.
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const redirectUri = `${appUrl}/api/auth/google/callback`;

  if (!code) {
    return NextResponse.redirect(`${appUrl}/login?error=google_cancelled`);
  }

  try {
    // Exchange authorization code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      throw new Error(`Token exchange failed: ${tokenRes.status}`);
    }

    const tokens = await tokenRes.json() as { access_token: string };

    // Fetch the user's Google profile
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!profileRes.ok) {
      throw new Error(`Profile fetch failed: ${profileRes.status}`);
    }

    const profile = await profileRes.json() as {
      id: string;
      email: string;
      name: string;
      picture?: string;
    };

    if (!profile.email) {
      return NextResponse.redirect(`${appUrl}/login?error=google_no_email`);
    }

    // Upsert the user — create on first Google login, otherwise reuse.
    let user = await db.user.findUnique({ where: { email: profile.email } });

    if (!user) {
      user = await db.user.create({
        data: {
          email: profile.email,
          name: profile.name ?? profile.email.split("@")[0],
          password: "", // Google users have no password
          role: "USER",
          avatar: profile.picture ?? null,
        },
      });
    }

    // Create the session cookie (same mechanism as credentials login)
    await startSession(user.id, user.role);

    return NextResponse.redirect(
      user.role === "ADMIN" ? `${appUrl}/admin` : `${appUrl}/dashboard`,
    );
  } catch (err) {
    console.error("[Google OAuth]", err);
    return NextResponse.redirect(`${appUrl}/login?error=google_failed`);
  }
}
