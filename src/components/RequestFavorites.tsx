'use client';

import { useEffect } from 'react';
import { useAppGlobalStore } from '../store/useAppGlobalStore';
import { useAuthStore } from '../store/authStore';

export default function RequestFavorites() {
  const user = useAuthStore((state) => state.user);
  const getFavorites = useAppGlobalStore((state) => state.getFavorites);
  const setPage = useAppGlobalStore((state) => state.setPage);

  useEffect(() => {
    if (!user) {
      setPage(1);
    }
    getFavorites();
  }, [user]);

  return <></>;
}
