'use client';
import { useEffect } from 'react';
import { useAppGlobalStore } from '../store/useAppGlobalStore';

export const useBreadcrumb = (title: string, subTitle?: string) => {
  const setBreadcrumb = useAppGlobalStore((state) => state.setBreadcrumb);
  useEffect(() => {
    setBreadcrumb(title, subTitle);
  }, [setBreadcrumb, subTitle, title]);
};
