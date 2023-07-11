self.addEventListener("install", (event) => {
  console.log("Service Worker instalado com sucesso!");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker ativado com sucesso!");
});

self.addEventListener("fetch", (event) => {
  console.log("Service Worker interceptou uma requisição:", event.request.url);
});
