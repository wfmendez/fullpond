import { NextResponse, type NextRequest } from "next/server";
import { decrypt, SESSION_COOKIE } from "@/lib/session";

// Next 16 renamed Middleware → Proxy. Optimistic auth checks only (the secure
// checks live in the DAL / Server Actions). Recycles FPY middleware role logic.

const PROTECTED = ["/dashboard", "/admin", "/apply"];
const AUTH_PAGES = ["/login", "/register"];

function matches(pathname: string, bases: string[]) {
  return bases.some((b) => pathname === b || pathname.startsWith(b + "/"));
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await decrypt(req.cookies.get(SESSION_COOKIE)?.value);

  // Not logged in → bounce protected routes to login (remember where from).
  if (!session && matches(pathname, PROTECTED)) {
    const url = new URL("/login", req.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Logged in but not admin → keep out of /admin.
  if (session && pathname.startsWith("/admin") && session.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Already logged in → skip auth pages.
  if (session && matches(pathname, AUTH_PAGES)) {
    return NextResponse.redirect(
      new URL(session.role === "ADMIN" ? "/admin" : "/dashboard", req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.ico).*)"],
};
