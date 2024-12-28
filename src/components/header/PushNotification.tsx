import {
  messaging,
  onMessageFb,
  getTokenFb,
  vapidKey,
} from '@/src/lib/firebase';
import { useEffect } from 'react';

export const menuBtnStyles = `text-white flex lg:flex-col items-center gap-2 p-4 lg:p-0`;
export const subStyles = 'bottom-0 lg:-bottom-[5px]';

export default function PushNotification() {
  useEffect(() => {
    getTokenFb(messaging, {
      vapidKey,
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Token:', currentToken);
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
    onMessageFb(messaging, (payload) => {
      console.log('Message received. ', payload);
    });
  }, []);
  return (
    <div className={menuBtnStyles}>
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
    </div>
  );
}
