import { makeGet, makePost } from '../config/fetch';
import { Meta } from '../types';
import { INotificationAttributes } from '../types/notification';

export type notificationParams = {
  pag: number;
  limit?: number;
};

type NotificationResponse = {
  meta: Meta;
  data: INotificationAttributes[];
};

export const getNotifications = async (
  params: notificationParams
): Promise<NotificationResponse> => {
  try {
    console.log('params :>> ', params);
    return await makeGet(`/notifications/all/`, params);
  } catch (error) {
    throw error;
  }
};

export const markNotificationAsSeen = async (
  notificationId: INotificationAttributes['id']
): Promise<NotificationResponse> => {
  try {
    return await makePost(
      `/notifications/isView/`,
      { notificationId },
      'PATCH'
    );
  } catch (error) {
    throw error;
  }
};
