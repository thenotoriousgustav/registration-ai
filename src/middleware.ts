import { NextRequest, NextResponse } from "next/server";
import { decrypt, updateSession } from "@/lib/session";
import { cookies } from "next/headers";
import { GET } from "./lib/httpClient";

//! 1. Specify protected and public routes
const protectedRoutes = ["/verification/:*", , "/exam"];
const publicRoutes = ["/"];

export default async function middleware(req: NextRequest) {
  //! 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  //! 3. Decrypt the session from the cookie
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (session) {
    await updateSession(req);
  }

  //! 4. Check if the exam exists
  if (path.startsWith("/exam/")) {
    const examId = path.split("/")[2];
    // const exam = await getExam(examId);
    const exam = await GET(`/exams/${examId}`);

    if (!exam) {
      // Redirect to Not Found page if the exam does not exist
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  //! 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(
      new URL("http://localhost:3001/auth/google/login", req.nextUrl)
    );
  }

  // !6. Redirect to /dashboard if the user is authenticated
  // if (
  //   isPublicRoute &&
  //   session &&
  //   !req.nextUrl.pathname.startsWith("/pilih-ujian")
  // ) {
  //   return NextResponse.redirect(new URL("/pilih-ujian", req.nextUrl));
  // }

  // return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
