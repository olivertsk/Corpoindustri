import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <Link href='/'>
      <Image
        width={500}
        height={250}
        style={{
          objectFit: 'contain',
        }}
        src='/logo.png'
        alt='Corpoindustri Logo'
        loading='lazy'
      />
    </Link>
  );
}
