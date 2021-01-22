const cacheVersion = "1.4.0";

const cachedFiles = [
  "./",
  "./app.js",
  "./main.css",
  "./manifest.json"
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

let assetsLocation;
self.addEventListener("fetch", e => {
  if (!assetsLocation) {
    let url = new URL(location.href);
    let thisFilename = url.pathname.split("/").pop();
    assetsLocation = `${url.origin}${url.pathname.replace(thisFilename, "")}assets/`;
  }

  e.respondWith(caches.open(cacheVersion)
    .then(async cache => {
      let response = await cache.match(e.request);

      if (response) {
        log(`Fetched from cache: ${e.request.url}`);

        return response;
      }

      try {
        response = await fetch(e.request.clone());
      } catch (err) {
        log(`Error fetching ${e.request.url}, ${err.message}`);

        throw err;
      }

      if (
        response.ok &&
        e.request.url.startsWith(assetsLocation)
      ) {
        log(`Saved into cache ${e.request.url}`);
        cache.put(e.request, response.clone());
      }

      return response;
    })
  );
});