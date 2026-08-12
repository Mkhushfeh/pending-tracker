// This file intentionally replaces the old cache-first service worker.
// Its only job is to remove itself and every cache it left behind, then
// force any open tab to reload with a clean slate. Once every visiting
// browser has picked this up once, it needs no further action — a browser
// with no service worker registered will simply never fetch this file
// again, which is fine.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.map((n) => caches.delete(n))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => {
        clients.forEach((client) => client.navigate(client.url));
      })
  );
});
