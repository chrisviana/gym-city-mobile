const CACHE_VERSION = "v1";
const CACHE_NAME = `my-app-cache-${CACHE_VERSION}`;

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "./",
        "index.html",
        /* adicione aqui os recursos que você deseja armazenar em cache */
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Responder com cache, se disponível
      if (response) {
        return response;
      }

      // Caso contrário, buscar a requisição da rede
      return fetch(event.request).then((response) => {
        // Se a resposta for bem-sucedida, cloná-la para poder armazená-la em cache
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
