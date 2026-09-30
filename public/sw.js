// ============================================
// Service worker — aplicația merge și offline
// ============================================
// - index.html: întâi rețeaua (ca update-urile să apară imediat), cache la offline
// - /assets/* (nume cu hash, imuabile): întâi cache-ul
// - fonturi Google + restul: cache, reîmprospătat în fundal
// La instalare citim index.html și pre-încărcăm bundle-urile referite de el,
// altfel prima vizită (înainte ca SW-ul să controleze pagina) n-ar fi în cache.

const CACHE = 'invatam-germana-v2';

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const res = await fetch('/', { cache: 'no-cache' });
    const html = await res.clone().text();
    await cache.put('/', res);
    const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(m => m[1]);
    await cache.addAll([...new Set(assets), '/manifest.webmanifest', '/icon.svg']);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // API-ul (progresul sincronizat) și pagina de urmărire: mereu din rețea
  if (url.origin === location.origin &&
      (url.pathname.startsWith('/api/') || url.pathname.startsWith('/progres'))) return;

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res.ok) (await caches.open(CACHE)).put('/', res.clone());
        return res;
      } catch {
        return (await caches.match('/')) || Response.error();
      }
    })());
    return;
  }

  if (url.origin === location.origin && url.pathname.startsWith('/assets/')) {
    event.respondWith((async () => {
      const cached = await caches.match(req);
      if (cached) return cached;
      const res = await fetch(req);
      if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
      return res;
    })());
    return;
  }

  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin === location.origin || isFont) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(req);
      const network = fetch(req).then((res) => {
        if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
        return res;
      }).catch(() => cached || Response.error());
      return cached || network;
    })());
  }
});
