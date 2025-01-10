'use client';
import { updatePushToken } from '@/src/api/AuthApi';
import { firebaseConfig } from '@/src/lib/firebase';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import Link from 'next/link';
import { useEffect } from 'react';

export const menuBtnStyles = `text-white flex lg:flex-col items-center gap-2 p-4 lg:p-0`;
export const subStyles = 'bottom-0 lg:-bottom-[5px]';

const vapidKey =
  'BLKmHa2MYsF5UMwTLpCphBmO35lzUJ1TATLOousQ_SGjEs2_fbxz7tUqDC7ZDh-eZ-VF88rzUsjRjB35EhBRc04';

export default function PushNotification() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initializeApp(firebaseConfig);
      const messaging = getMessaging();

      getToken(messaging, {
        vapidKey,
      })
        .then(async (currentToken) => {
          if (currentToken) {
            await updatePushToken({ tokenPush: currentToken });
          }
        })
        .catch((err) => {
          console.error('An error occurred while retrieving token. ', err);
        });

      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
      });
    }
  }, []);
  return (
    <Link href='/profile/notifications' className={menuBtnStyles}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 512 512'
      >
        <path
          fill='currentColor'
          d='m450.27 348.569l-43.67-80.624V184c0-83.813-68.187-152-152-152s-152 68.187-152 152v83.945l-43.672 80.623A24 24 0 0 0 80.031 384h86.935a89 89 0 0 0-.367 8a88 88 0 0 0 176 0c0-2.7-.129-5.364-.367-8h86.935a24 24 0 0 0 21.1-35.431ZM310.6 392a56 56 0 1 1-111.419-8h110.837a56 56 0 0 1 .582 8M93.462 352l41.138-75.945V184a120 120 0 0 1 240 0v92.055L415.736 352Z'
        />
      </svg>
      <sub className={subStyles}>Notificaciones</sub>
    </Link>
  );
}
