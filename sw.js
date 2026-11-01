const nombreCache = 'taskmanager-archivos-v1';
const archivos = [
  './',
  './index.html',
  './estilos.css',
  './js/app.js',
  './js/api.js',
  './js/almacenamiento.js'
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(caches.open(nombreCache).then((cache) => cache.addAll(archivos)));
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evento) => {
  const url = new URL(evento.request.url);
  if (evento.request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  evento.respondWith(
    caches.open(nombreCache).then(async (cache) => {
      const guardado = await cache.match(evento.request, { ignoreSearch: true });
      return guardado || fetch(evento.request);
    })
  );
});
