'use client';
import Heading from '@/src/components/Heading';
import Spinner from '@/src/components/spinner/Spinner';
import { containerStyles } from '@/src/lib/global';
import { useAppGlobalStore } from '@/src/store/useAppGlobalStore';
import { INotificationAttributes } from '@/src/types/notification';
import { normalizeDate } from '@/src/utils/normalizeDate';
import { Pagination } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotificationsPage() {
  const markNotificationAsSeen = useAppGlobalStore(
    (store) => store.markNotificationAsSeen
  );
  const getNotifications = useAppGlobalStore((store) => store.getNotifications);
  const notifications = useAppGlobalStore((store) => store.notifications);
  const loading = useAppGlobalStore((store) => store.loading);

  const notificationPag = useAppGlobalStore((store) => store.notificationPag);
  const notificationTotalPages = useAppGlobalStore(
    (store) => store.notificationTotalPages
  );

  useEffect(() => {
    getNotifications();
  }, []);

  const router = useRouter();
  const manageClick = (id: INotificationAttributes['id'], url: string) => {
    markNotificationAsSeen(id);
    router.push(url);
  };

  const changePage = (page: number) => {
    useAppGlobalStore.setState({ notificationPag: page });
    getNotifications();
  };

  return (
    <main className='container mx-auto my-8'>
      <div className={containerStyles}>
        <Heading> Notificaciones </Heading>
        <div className='divide-y divide-slate-200 mt-8'>
          {loading ? (
            <Spinner />
          ) : (
            notifications.map((notification) => (
              <button
                onClick={() => manageClick(notification.id!, notification.url)}
                key={notification.id}
                className='p-3 flex items-center gap-4 hover:bg-gray-100 w-full'
              >
                <div className='w-8'>
                  {!notification.isView && (
                    <div className='w-4 h-4 bg-primary rounded-full'></div>
                  )}
                </div>
                <div className='text-left'>
                  <p className='font-bold'>{notification.title}</p>
                  <p>{notification.body}</p>
                  <p className='text-xs mt-3 text-slate-500'>
                    {normalizeDate(notification.createdAt!)}
                  </p>
                </div>
              </button>
            ))
          )}
          {notifications.length === 0 && !loading && (
            <div className='flex justify-center items-center min-h-[calc(100vh-28rem)]'>
              <p className='mt-4 text-slate-600'>
                No tienes notificaciones para mostrar.
              </p>
            </div>
          )}
          <div className='flex justify-center pt-8'>
            <Pagination
              count={notificationTotalPages}
              page={notificationPag}
              onChange={(_, page) => changePage(page)}
              showFirstButton
              showLastButton
            />
          </div>
        </div>
      </div>
    </main>
  );
}
