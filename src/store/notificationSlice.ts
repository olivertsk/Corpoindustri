import { StateCreator } from 'zustand';
import {
  getNotifications,
  markNotificationAsSeen,
} from '../api/NotificationApi';
import { INotificationAttributes } from '../types/notification';

export type NotificationSlice = {
  notifications: INotificationAttributes[];
  notificationPag: number;
  notificationTotalPages: number;
  getNotifications: () => void;
  markNotificationAsSeen: (id: INotificationAttributes['id']) => void;
  setPage: (page: number) => void;
  loading: boolean;
};

export const createNotificationSlice: StateCreator<
  NotificationSlice,
  [],
  [],
  NotificationSlice
> = (set, get) => ({
  notifications: [],
  loading: true,
  getNotifications: async () => {
    set({
      loading: true,
    });
    const notifications = await getNotifications({
      pag: get().notificationPag,
    });
    set({
      notifications: notifications.data,
      notificationTotalPages: notifications.meta.totalPage,
      loading: false,
    });
    console.log(notifications);
  },
  markNotificationAsSeen: async (id) => {
    await markNotificationAsSeen(id);
    set({
      notificationPag: 1,
    });
    get().getNotifications();
  },
  setPage: (page) => {
    set({ notificationPag: page });
  },
  notificationPag: 1,
  notificationTotalPages: 1,
});
