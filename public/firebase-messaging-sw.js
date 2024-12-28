'use strict';

self.addEventListener('notificationclick', function (event) {
  const urlToRedirect = event.notification.data?.FCM_MSG.data.url;
  event.notification.close();
  event.waitUntil(self.clients.openWindow(urlToRedirect));
});

importScripts(
  'https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyAkwo_-u8Uk8v1fnbwc4kUXMoRJSCgmfUM',
  authDomain: 'duque-portafolio.firebaseapp.com',
  projectId: 'duque-portafolio',
  storageBucket: 'duque-portafolio.firebasestorage.app',
  messagingSenderId: '8065693035',
  appId: '1:8065693035:web:04d04fdb4d70788643482e',
  measurementId: 'G-45KQGQLQEC',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  // ...
});

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  // const notificationTitle = 'Background Message Title';
  // const notificationOptions = {
  //   body: 'Background Message body.',
  //   icon: '/firebase-logo.png'
  // };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
