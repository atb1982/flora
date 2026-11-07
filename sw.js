/* Offline support for the Blue Ridge plant guide.
   App files: served from cache, refreshed in the background.
   Photos: cache first (filled by "Save photos for offline use" and by browsing).
   Wikipedia and iNaturalist data: network first, cache when offline. */
const SHELL = 'brg-shell-v1', IMG = 'brg-img-v1', DATA = 'brg-data-v1';
const ASSETS = ['./', 'index.html', 'species.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('brg-shell-') && k !== SHELL).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    e.respondWith(caches.open(SHELL).then(async c => {
      const hit = await c.match(req, { ignoreSearch: true });
      const net = fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }

  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(SHELL).then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      const res = await fetch(req); c.put(req, res.clone()); return res;
    }));
    return;
  }

  if (req.destination === 'image') {
    e.respondWith(caches.open(IMG).then(async c => {
      const hit = await c.match(req.url);
      if (hit) return hit;
      try { const res = await fetch(req); c.put(req.url, res.clone()); return res; }
      catch (err) { return Response.error(); }
    }));
    return;
  }

  if (url.hostname.endsWith('wikipedia.org') || url.hostname === 'commons.wikimedia.org' || url.hostname === 'api.inaturalist.org') {
    e.respondWith(caches.open(DATA).then(async c => {
      try { const res = await fetch(req); if (res.ok) c.put(req, res.clone()); return res; }
      catch (err) { const hit = await c.match(req); return hit || Response.error(); }
    }));
  }
});
