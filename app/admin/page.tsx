'use client';

import Logo from '@/src/components/Logo';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';

export default function AdminPage() {
  useBreadcrumb('Admin', 'Dashboard');
  return (
    <div>
      <div className='w-full h-full flex justify-center items-center mt-16'>
        <Logo />
      </div>
    </div>
  );
}
