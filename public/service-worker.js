self.addEventListener("activate", (event) => {
  console.log("Service Worker ativado com sucesso!");
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-app-cache").then((cache) => {
      return cache.addAll([
        "./",
        "index.html",
        /* adicione aqui os recursos que você deseja armazenar em cache */
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Service Worker interceptou uma requisição:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
