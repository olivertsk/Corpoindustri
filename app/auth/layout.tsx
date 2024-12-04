'use client';
import Logo from '@/src/components/Logo';
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
  }, [user, router]);

  return (
    <>
      <main className='bg-login-bg bg-cover bg-center bg-no-repeat min-h-screen  from-primary to-secondary grid grid-cols-5'>
        <div className='col-span-5 lg:col-span-3 h-full flex items-center justify-center'>
          <div className='max-w-[500px] relative'>
            <div className='max-w-[250px] mx-auto my-8'>
              <Logo />
            </div>
            <Image
              width={2048}
              height={2048}
              src='/viveres.png'
              objectFit='cover'
              alt='Viveres'
            />
          </div>
        </div>
        <div className='col-span-5 lg:col-span-2 flex gap-2 flex-col items-center justify-center p-3 lg:p-8'>
          <p className='text-accent-200 text-2xl font-bold italic'>
            Tu Mayorista de confianza
          </p>
          {children}
        </div>
      </main>
    </>
  );
}
