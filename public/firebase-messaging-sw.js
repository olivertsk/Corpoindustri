'use strict';

self.addEventListener('notificationclick', function (event) {
  const urlToRedirect = event?.data.url;
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
  apiKey: 'AIzaSyAP85QzGsuktR0EJqP-7JXFm45-y_s3V8A',
  authDomain: 'corpoindustri-5b46c.firebaseapp.com',
  projectId: 'corpoindustri-5b46c',
  storageBucket: 'corpoindustri-5b46c.firebasestorage.app',
  messagingSenderId: '490704821305',
  appId: '1:490704821305:web:3ed99a938fee89ba0541e8',
  measurementId: 'G-DCPK0TYTBP',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.error('Received background message ', payload);

  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  // };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
