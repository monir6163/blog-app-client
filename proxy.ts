import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Roles } from "./contstants/roles";
import { publicRoutes } from "./routes/PublicRoutes";
import { userService } from "./services/user.service";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();

  const isAuthenticated = !!data?.user;
  const isAdmin = data?.user?.role === Roles.ADMIN;

  if (!isAuthenticated && publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Non-admin trying admin dashboard
  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Admin trying normal dashboard
  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  if (isAuthenticated && publicRoutes.includes(pathname)) {
    const redirectUrl = isAdmin ? "/admin-dashboard" : "/dashboard";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
