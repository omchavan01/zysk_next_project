export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req });

  if (req.nextUrl.pathname.startsWith("/blogs") && !token) {
    return NextResponse.redirect(new URL("/notlogged", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/blogs/:path*"],
};
