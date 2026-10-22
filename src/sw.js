// Service worker: keeps a copy of the offline help page on the phone.
// The first visit (to the hub or to offline.html) saves it. After that,
// if there's no internet, any page in the hub opens offline.html instead.
// Only works when the site comes from a web address, not opened as a file.

const CACHE = "offline-help-v2";
const SAVE = ["offline.html", "data/help-now.js", "images/turtle-toast-game-a-pixel.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SAVE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Clear out older copies when the version number above changes
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // Internet first, so people always get the latest. Saved copy if that fails.
  event.respondWith(
    fetch(req)
      .then((res) => {
        // Keep the saved copies of our offline files up to date
        const url = new URL(req.url);
        if (res.ok && SAVE.some((p) => url.pathname.endsWith("/" + p))) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: true }).then((hit) =>
          hit || (req.mode === "navigate" ? caches.match("offline.html") : Response.error())
        )
      )
  );
});
