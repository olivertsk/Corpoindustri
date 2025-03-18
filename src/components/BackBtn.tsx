'use client';

import {} from 'next/navigation';

export default function BackBtn() {
  return (
    <button
      onClick={() => window.history.back()}
      className='flex gap-2 text-sm  transition-colors items-center font-bold px-4 rounded-full'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18'
        height='18'
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
