import { apiUrl } from '@/src/lib/global';
import { useAuthStore } from '@/src/store/authStore';
import Image from 'next/image';

export default function AuthProfileImg() {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      {user && user.avatar ? (
        <Image
          className='rounded-full w-[24px] h-[24px]'
          src={`${apiUrl}/file/${user.avatar}`}
          alt='upload image'
          width={24}
          height={24}
          loading='lazy'
        />
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <g
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            color='currentColor'
          >
            <circle cx='12' cy='12' r='10' />
            <path d='M7.5 17c2.332-2.442 6.643-2.557 9 0m-2.005-7.5c0 1.38-1.12 2.5-2.503 2.5a2.5 2.5 0 0 1-2.504-2.5c0-1.38 1.12-2.5 2.504-2.5a2.5 2.5 0 0 1 2.503 2.5' />
          </g>
        </svg>
      )}
    </>
  );
}
