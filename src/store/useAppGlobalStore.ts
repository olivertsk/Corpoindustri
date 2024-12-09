import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BreadcrumbSliceType, createBreadcrumbSlice } from './breadcrumbSlice';
import { createFavoriteSlice, FavoriteSlice } from './favoriteSlice';

export const useAppGlobalStore = create<BreadcrumbSliceType & FavoriteSlice>()(
  devtools((...a) => ({
    ...createBreadcrumbSlice(...a),
    ...createFavoriteSlice(...a),
  }))
);
