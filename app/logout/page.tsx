'use client';

import Spinner from '@/src/components/spinner/Spinner';
import { useEffect } from 'react';

export default function LogoutPage() {
  useEffect(() => {
    (async () => {
      await fetch('/api/logout', { method: 'POST', cache: 'no-store' });
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    })();
  }, []);

  return (
    <div className='h-dvh flex justify-center items-center'>
      <div>
        <Spinner />
        <p>
          Su sesión ha expirado o ha cerrado sesión. Redirigiendo al inicio...
        </p>
      </div>
    </div>
  );
}
