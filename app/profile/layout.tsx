'use client';

import Spinner from '@/src/components/spinner/Spinner';
import { useAuthStore } from '@/src/store/authStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

const queryClient = new QueryClient();

export default function PageLayout({ children }: { children: ReactNode }) {
  const [loadedLayout, setLoadedLayout] = useState(false);
  const user = useAuthStore((store) => store.user);
  const router = useRouter();

  useEffect(() => {
    if (loadedLayout) {
      if (!user) {
        router.replace('/');
      }
    }
    setLoadedLayout(true);
  }, [loadedLayout, user]);

  if (!user) {
    return <Spinner />;
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
