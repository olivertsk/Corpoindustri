'use client';
import { useAuthStore } from '@/src/store/authStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    if (user !== null) {
      toast.success(`Bienvenido ${user.name}`);
      router.push('/');
    }
  }, [user]);

  return (
    <>
      <main className='min-h-screen  from-primary to-secondary grid grid-cols-5'>
        <div className='col-span-5 lg:col-span-3 h-full flex items-center justify-center'>
          <div className='max-w-[500px]'>
            <Image
              src='/login-bg.png'
              width={4000}
              height={4000}
              alt='Distribucion comida'
            />
          </div>
        </div>
        <div className='col-span-5 lg:col-span-2 flex items-center justify-center p-3 lg:p-8'>
          {children}
        </div>
      </main>
    </>
  );
}
