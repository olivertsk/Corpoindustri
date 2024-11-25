'use client';
import { useEffect } from 'react';
import { useAppGlobalStore } from '../stores/useAppGlobalStore';

export const useBreadcrumb = (title: string, subTitle?: string) => {
  const setBreadcrumb = useAppGlobalStore((state) => state.setBreadcrumb);
  useEffect(() => {
    setBreadcrumb(title, subTitle);
  }, []);
};
