self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("camera-pwa-v1").then((cache) => {
      return cache.addAll(["/", "/index.html", "/app.js", "styles.css"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

//background sync
self.addEventListener("sync", (event) => {
  if (event.tag === "syncData") {
    event.waitUntil(syncData());
  }
});

function syncData() {
  return new Promise((resolve, reject) => {
    console.log("Background Sync: Syncing data to the server...");

    setTimeout(() => {
      console.log("Background Sync: Data synced successfully!");
      resolve();
    }, 3000);
  });
}
