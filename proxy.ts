import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Roles } from "./contstants/roles";
import { userService } from "./services/user.service";

export default async function proxy(request: NextRequest) {
  let isAuthenticated = false;
  let isAdmin = false;
  const pathname = request.nextUrl.pathname;
  const { data } = await userService.getSession();
  if (data && data.user) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.ADMIN;
  }
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
};
