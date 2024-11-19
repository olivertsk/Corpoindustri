import Image from 'next/image';
import React from 'react';

export default function Logo() {
  return (
    <Image
      width={500}
      height={250}
      objectFit='contain'
      src='/logo.png'
      alt='Corpoindustri Logo'
    />
  );
}
