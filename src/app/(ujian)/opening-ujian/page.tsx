import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function OpeningUjianPage() {
  return (
    <section className='flex flex-col justify-center items-center h-screen w-full'>
      <div>selamat ujian</div>
      <Button variant={'default'} asChild>
        <Link href='/ujian'>Ujian</Link>
      </Button>
    </section>
  );
}
