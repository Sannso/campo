self.addEventListener("install", (e) => {
  // console.log("Install!"); all this run just once
  e.waitUntil(
    caches.open("static").then((cache) => {
      return cache.addAll(["./", "./login", "./images/vaca192.webp"]); // Se carga tambien el css etc
    })
  );
});

//run when we have a fetch request
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
