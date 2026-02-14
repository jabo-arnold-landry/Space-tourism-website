const resourcesToCache = [
  "/",
  "/index.html",
  "/src/Javascript/index.js",
  "/src/output.css",
];

const cacheName = "version-2.3";
self.addEventListener("install", (e) => {
  console.log(e);
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        return cache.addAll(resourcesToCache);
      })
      .catch((err) => console.log(`failed to cache`, err)),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((arrOfkeys) => {
      return Promise.all(
        arrOfkeys
          .filter((key) => key !== cacheName)
          .map((key) => caches.delete(key)),
      )
        .then((res) => console.log("res"))
        .catch((err) => console.log(`unable to delete a cache`, err));
    }),
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    }),
  );
});
