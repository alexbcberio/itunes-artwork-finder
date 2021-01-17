const cacheVersion = "2021011702";

const cachedFiles = [
  "./",
  "./app.js",
  "./main.css",
  "https://fonts.googleapis.com/css?family=Roboto",
  "./manifest.json",
  "./img/favicon.png",
  "./img/icon128.png",
  "./img/icon256.png",
  "./img/icon512.png",
  "./img/image-file-icon.svg",
  "./img/pen-icon.svg",
  "./img/search-icon.svg"
];

function log(txt) {
  if (cacheVersion.endsWith("-dev")) {
    console.log(`[Service Worker] ${txt}`);
  }
}

self.addEventListener("install", e => {
  log("Installing...");

  e.waitUntil(caches.open(cacheVersion)
    .then(async cache => {
      log(`Catching ${cachedFiles.length} files.`);
      await cache.addAll(cachedFiles);

      log("Installation finished.");
      self.skipWaiting();
    })
  );
});

self.addEventListener("activate", e => {
  log("Activating...");

  e.waitUntil(caches.keys()
    .then(async cacheKeys => {
      await Promise.all(
        cacheKeys.map(async cacheKey => {
          if (cacheKey !== cacheVersion) {
            log(`Deleting cache: ${cacheKey}`);
            await caches.delete(cacheKey);
          }
        })
      );

      self.clients.claim();
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.open(cacheVersion)
    .then(async cache => {
      let response = await cache.match(e.request);

      if (response) {
        log(`Fetched from cache: ${e.request.url}`);

        return response;
      }

      try {
        return await fetch(e.request.clone());
      } catch (err) {
        log(`Error fetching ${e.request.url}, ${err.message}`);

        throw err;
      }
    })
  );
});