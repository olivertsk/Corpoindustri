import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BreadcrumbSliceType, createBreadcrumbSlice } from './breadcrumbSlice';

export const useAppGlobalStore = create<BreadcrumbSliceType>()(
  devtools((...a) => ({
    ...createBreadcrumbSlice(...a),
  }))
);
