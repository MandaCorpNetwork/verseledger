import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('push', (event) => {
  const payload = event.data ? event.data.text() : 'no payload';

  event.waitUntil(
    new Promise((resolve) => {
      if (Notification.permission === 'granted') {
        resolve(self.registration.showNotification('Verseledger', { body: payload }));
      } else resolve(false);
    }),
  );
});
