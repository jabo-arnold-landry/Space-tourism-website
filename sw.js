const resourcesToCache = [
  "/",
  "/index.html",
  "/src/Javascript/index.js",
  "/src/output.css",
];

const cacheName = "version-1.0";
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
    caches.keys().then((allCachesNames) => {
      return Promise.all(
        allCachesNames
          .filter((cache) => cache !== cacheName || cache === "dynamic-cache")
          .map((key) => caches.delete(key)),
      )
        .then(() => console.log("cleared successful"))
        .catch((err) =>
          console.log("failed to delete resources from cache: ", err),
        );
    }),
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return (
        response ||
        fetch(e.request).then((response) => {
          return caches.open("dynamic-cache").then((cache) => {
            cache.put(e.request.url, response.clone());
            return response;
          });
        })
      );
    }),
  );
});
