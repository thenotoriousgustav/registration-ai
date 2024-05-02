// 'use client';
// import Container from '@/components/container';

// import { Button } from '@/components/ui/button';
// import { getToken, storeCookie } from '@/lib/actions';
// import axios from 'axios';
// import { cookies } from 'next/headers';
// import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// type Profile = {
//   username: string;
//   name: string;
// };

// export default function CallbackPage() {
//   const searchParams = useSearchParams();
//   const [profile, setProfile] = useState<Profile>();
//   const [token, setToken] = useState<string | null | undefined>();

//   useEffect(() => {
//     const getSession = async () => {
//       const token = await getToken();
//       setToken(token);
//     };

//     getSession();
//   }, []);

//   useEffect(() => {
//     const getUserProfile = async () => {
//       try {
//         if (token) {
//           const response = await axios.get(
//             'http://localhost:3001/auth/profile',
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           setProfile(response.data);
//         } else {
//           throw new Error('Token not found');
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//         // Tangani kesalahan
//         return null;
//       }
//     };
//     getUserProfile();
//   }, [token]);

//   console.log(profile);

//   return (
//     <section>
//       <Container className='my-6 '>
//         <h1 className='text-2xl font-semibold'>Welcome {profile?.name}!</h1>

//         <div>
//           <Button className='mt-8' asChild>
//             <Link href='/pilih-ujian'>Pilih Ujian</Link>
//           </Button>
//         </div>
//       </Container>
//     </section>
//   );
// }

import React from 'react';

export default function Auth() {
  return <div>Auth</div>;
}
