import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "@/lib/session";

//! 1. Specify protected and public routes
const protectedRoutes = [
  "/verification/:*",
  "/simulation/:*",
  "/exams",
  "/profile",
];
const publicRoutes = ["/"];

export default async function middleware(req: NextRequest) {
  //! 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  //!check cookie
  const session = await getSession();

  if (session) {
    await updateSession(req);
  }

  //! 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  }

  // !6. Redirect to /exams if the user is authenticated
  // if (isPublicRoute && session && !req.nextUrl.pathname.startsWith("/exams")) {
  //   return NextResponse.redirect(new URL("/exams", req.nextUrl));
  // }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
