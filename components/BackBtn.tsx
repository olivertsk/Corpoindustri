'use client';

import { useRouter } from 'next/navigation';

export default function BackBtn() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className='flex gap-2 bg-accent-100 hover:bg-accent-200 transition-colors py-2 font-bold px-4 rounded-md'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
      >
        <path
          fill='currentColor'
          d='m10 18l-6-6l6-6l1.4 1.45L7.85 11H20v2H7.85l3.55 3.55z'
        />
      </svg>
      Volver
    </button>
  );
}
