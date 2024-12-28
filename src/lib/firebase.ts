import { initializeApp } from 'firebase/app';
import {
  getMessaging,
  onMessage as onMessageFb,
  getToken as getTokenFb,
} from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyAkwo_-u8Uk8v1fnbwc4kUXMoRJSCgmfUM',
  authDomain: 'duque-portafolio.firebaseapp.com',
  projectId: 'duque-portafolio',
  storageBucket: 'duque-portafolio.firebasestorage.app',
  messagingSenderId: '8065693035',
  appId: '1:8065693035:web:04d04fdb4d70788643482e',
  measurementId: 'G-45KQGQLQEC',
};

const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);
export const vapidKey =
  'BLKmHa2MYsF5UMwTLpCphBmO35lzUJ1TATLOousQ_SGjEs2_fbxz7tUqDC7ZDh-eZ-VF88rzUsjRjB35EhBRc04';
export { onMessageFb, getTokenFb };
