const cacheVersion="1.4.1",cachedFiles=["./","./app.js","./main.css","./manifest.json"];function log(e){"1.4.1".endsWith("-dev")&&console.log(`[Service Worker] ${e}`)}let assetsLocation;self.addEventListener("install",(e=>{log("Installing..."),e.waitUntil(caches.open("1.4.1").then((async e=>{log(`Catching ${cachedFiles.length} files.`),await e.addAll(cachedFiles),log("Installation finished."),self.skipWaiting()})))})),self.addEventListener("activate",(e=>{log("Activating..."),e.waitUntil(caches.keys().then((async e=>{await Promise.all(e.map((async e=>{"1.4.1"!==e&&(log(`Deleting cache: ${e}`),await caches.delete(e))}))),self.clients.claim()})))})),self.addEventListener("fetch",(e=>{if(!assetsLocation){let e=new URL(location.href),t=e.pathname.split("/").pop();assetsLocation=`${e.origin}${e.pathname.replace(t,"")}assets/`}e.respondWith(caches.open("1.4.1").then((async t=>{let a=await t.match(e.request);if(a)return log(`Fetched from cache: ${e.request.url}`),a;try{a=await fetch(e.request.clone())}catch(t){throw log(`Error fetching ${e.request.url}, ${t.message}`),t}return a.ok&&e.request.url.startsWith(assetsLocation)&&(log(`Saved into cache ${e.request.url}`),t.put(e.request,a.clone())),a})))}));