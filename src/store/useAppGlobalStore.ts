import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BreadcrumbSliceType, createBreadcrumbSlice } from './breadcrumbSlice';
import { createFavoriteSlice, FavoriteSlice } from './favoriteSlice';
import {
  createNotificationSlice,
  NotificationSlice,
} from './notificationSlice';

export const useAppGlobalStore = create<
  BreadcrumbSliceType & FavoriteSlice & NotificationSlice
>()(
  devtools((...a) => ({
    ...createBreadcrumbSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a),
  }))
);
