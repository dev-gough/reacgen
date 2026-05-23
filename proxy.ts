import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "better-auth.session_token";

const VARIANT_RE = /^\/(v[1-4])\/account(?:\/|$)/;

export function proxy(req: NextRequest) {
  const hasSession = req.cookies.has(SESSION_COOKIE);
  if (!hasSession) {
    // Redirect to the matching variant's sign-in so the user stays inside the
    // visual context they came from.
    const variant = req.nextUrl.pathname.match(VARIANT_RE)?.[1];
    const path = variant ? `/${variant}/account/sign-in` : "/account/sign-in";
    return NextResponse.redirect(new URL(path, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account",
    "/account/((?!sign-in|sign-up).*)",
    "/v1/account",
    "/v1/account/((?!sign-in|sign-up).*)",
    "/v2/account",
    "/v2/account/((?!sign-in|sign-up).*)",
    "/v3/account",
    "/v3/account/((?!sign-in|sign-up).*)",
    "/v4/account",
    "/v4/account/((?!sign-in|sign-up).*)",
  ],
};
