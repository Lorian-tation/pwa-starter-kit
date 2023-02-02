function setCacheForAll() {
    const cacheVersion = "v1";
    const assets = ["/", "/index.php"];
    
    //Est déclenché lorsque le service worker est installé pour la première fois. 
    //L'événement "waitUntil" est utilisé pour garantir que toutes les ressources spécifiées 
    //dans la liste "assets" sont correctement mises en cache avant de considérer l'installation comme terminée.
    self.addEventListener("install", (e) => {
      e.waitUntil(
        caches.open(cacheVersion).then((cache) => {
          cache.addAll(assets);
        })
      );
    });
    
    // Est déclenché lorsque le navigateur effectue une requête de ressources (par exemple, une image ou une page HTML). 
    // Le code dans cet écouteur vérifie si la ressource demandée est déjà en cache, et si c'est le cas, il la retourne immédiatement. 
    // Sinon, il effectue une requête réseau pour la ressource et la met en cache pour une utilisation future.
    self.addEventListener("fetch", (event) => {
      event.respondWith(
        caches.match(event.request).then(function (response) {
          if (response) {
            return response;
          }
    
          var fetchRequest = event.request.clone();
    
          return fetch(fetchRequest).then(function (response) {
            if (!response || response.status !== 200 || response.type !== "basic") {
              return response;
            }
    
            var responseToCache = response.clone();
    
            caches.open(cacheVersion).then(function (cache) {
              if((event.request.url.indexOf('http') === 0)){ 
                      cache.put(event.request, responseToCache);
                }
            });
    
            return response;
          });
        })
      );
    });
    
    // Est déclenché lorsque le service worker est activé et commence à gérer les requêtes. 
    // Le code dans cet écouteur efface tous les anciens caches qui ne sont pas celui défini par "cacheVersion".
    self.addEventListener("activate", (e) => {
      e.waitUntil(
        caches.keys().then((keys) => {
          return Promise.all(
            keys
              .filter((key) => key !== cacheVersion)
              .map((key) => caches.delete(key))
          );
        })
      );
    });    
}

setCacheForAll();
