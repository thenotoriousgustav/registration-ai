'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Container from './container';
import { TextAlignJustifyIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { useRouter, useSearchParams } from 'next/navigation';
import { createSession, getSession } from '@/lib/session';

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const handleGoogleLogin = async () => {
    router.push(`${BASE_URL}/auth/google/login`);
  };

  useEffect(() => {
    setToken(params.get('token'));

    if (token) {
      const getTestSession = async () => {
        const session = await getSession();
        console.log(session);
      };

      const fetchingData = async () => {
        const response = await axios.get(`${BASE_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);

        if (response.status === 200) {
          createSession(response.data);
          getTestSession();
        }
        fetchingData();
      };
    }
  }, [token]);

  return (
    <Container className='border-b py-6'>
      <nav className='flex justify-between'>
        <Sheet key='left'>
          <SheetTrigger asChild>
            <Button variant='link' className='p-0'>
              <TextAlignJustifyIcon width='36' height='36' />
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <SheetHeader>
              <SheetTitle>CAT</SheetTitle>
              <SheetDescription>Ini Navigasi Cat</SheetDescription>
            </SheetHeader>
            <div className='flex flex-col items-start mt-10'>
              <Button
                variant='link'
                className='p-0 text-lg font-medium'
                asChild
              >
                <Link href='/'>Home</Link>
              </Button>
              <Button
                variant='link'
                className='p-0 text-lg font-medium'
                asChild
              >
                <Link href='/pilih-ujian'>Pilih Ujian</Link>
              </Button>
            </div>

            <Separator className='my-6' />
          </SheetContent>
        </Sheet>
        <div>
          <Button onClick={handleGoogleLogin}>Sign In</Button>
        </div>
      </nav>
    </Container>
  );
}
