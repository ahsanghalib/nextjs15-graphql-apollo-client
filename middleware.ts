import { refreshTokenAction } from "@/actions/refreshTokenAction";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/utils/constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const cookieStore = await cookies();

  const isLoginPage = req.nextUrl.pathname.startsWith("/login");
  const hasAccessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const hasRefreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!hasAccessToken && hasRefreshToken) {
    await refreshTokenAction();
  }

  if (!isLoginPage && !hasRefreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoginPage && hasRefreshToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
