import { StateCreator } from 'zustand';
import {
  getNotifications,
  markNotificationAsSeen,
} from '../api/NotificationApi';
import { INotificationAttributes } from '../types/notification';

export type NotificationSlice = {
  notifications: INotificationAttributes[];
  totalNotifications: number;
  notificationPag: number;
  notificationTotalPages: number;
  getAllNotifications: () => void;
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
  totalNotifications: 0,
  getAllNotifications: async () => {
    const notifications = await getNotifications({
      isView: false,
    });
    set({
      totalNotifications: notifications.data.length,
    });
  },
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
