import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/mypage")) {
    if (cookies().has("token")) return NextResponse.next();
    else return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/loginpage")) {
    if (cookies().has("token")) return NextResponse.redirect(new URL("/", req.url));
    else return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/joinpage")) {
    if (cookies().has("token")) return NextResponse.redirect(new URL("/", req.url));
    else return NextResponse.next();
  }
}

export const config = {
  matcher: ["/mypage/:path*", "/loginpage", "/joinpage/:path*"],
};
