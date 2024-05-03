import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = [
  '/pilih-ujian',
  '/verification',
  '/face-verification',
  '/exam',
];
const publicRoutes = ['/'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  //   console.log('session', session);
  //   console.log('cookie', cookie);

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(
      new URL('http://localhost:3001/auth/google/login', req.nextUrl)
    );
  }

  // 6. Redirect to /dashboard if the user is authenticated
  //   if (
  //     isPublicRoute &&
  //     session &&
  //     !req.nextUrl.pathname.startsWith('/pilih-ujian')
  //   ) {
  //     return NextResponse.redirect(new URL('/pilih-ujian', req.nextUrl));
  //   }

  //   return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
