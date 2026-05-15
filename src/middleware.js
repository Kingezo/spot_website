import { NextResponse } from "next/server";

export function middleware(request) {
  const host = request.headers.get("host");
  if (host === "spot-nu-olive.vercel.app") {
    const url = request.nextUrl.clone();
    url.protocol = "https";
    url.host = "usespotfinancial.com";
    return NextResponse.redirect(url, { status: 308 });
  }
}

export const config = {
  matcher: "/:path*",
};
