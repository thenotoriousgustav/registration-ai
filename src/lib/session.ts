'use server';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// const secretKey = process.env.SESSION_SECRET || 'secret';
// const encodedKey = new TextEncoder().encode(secretKey);

// export async function encrypt(payload: any) {
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: 'HS256' })
//     .setIssuedAt()
//     .setExpirationTime('7d')
//     .sign(encodedKey);
// }

// export async function decrypt(session: string | undefined = '') {
//   try {
//     const { payload } = await jwtVerify(session, encodedKey, {
//       algorithms: ['HS256'],
//     });
//     return payload;
//   } catch (error) {
//     console.log('Failed to verify session');
//   }
// }

export async function getSession() {
  try {
    const cookieStore = cookies();

    const token = cookieStore.get('session')?.value;

    console.log(JSON.parse(token as string));

    return token;
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return null; // Return null for error handling
  }
}

export async function createSession(value: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  // const session = await encrypt({ userId, expiresAt });

  cookies().set({
    name: 'session',
    value: JSON.stringify(value),
    httpOnly: false,
    secure: false,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

// export async function updateSession() {
//   const session = cookies().get('session')?.value;
//   // const payload = await decrypt(session);

//   if (!session || !payload) {
//     return null;
//   }

//   const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
//   cookies().set('session', session, {
//     httpOnly: true,
//     secure: true,
//     expires: expires,
//     sameSite: 'lax',
//     path: '/',
//   });
// }

export async function deleteSession() {
  cookies().delete('session');
}

export async function logout() {
  deleteSession();
  redirect('/login');
}
