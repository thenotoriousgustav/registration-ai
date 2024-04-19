'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import Container from './container';
import { TextAlignJustifyIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Separator } from './ui/separator';

export default function Navigation() {
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
          <Button>Sign Out</Button>
        </div>
      </nav>
    </Container>
  );
}
