const PREFIX = 'V1';

self.addEventListener('install', (event) => {
    // Arrête le service worker précédent pour activer la nouvelle version
    self.skipWaiting();

    // Lecture de la page offline et mémorisation en cache
    event.waitUntil(
        (async () => {
            const cache = await caches.open(PREFIX);
            cache.add(new Request ('/offline.html'));
        })()
    );
});

self.addEventListener('activate', (event) => {
    // Active et fait fonctionner le service worker directement lors de la première visite
    clients.claim();

    // Vide les caches différents de la version actuelle (PREFIX)
    event.waitUntil(
        (async() => {
            const keys = await caches.keys();
            await Promise.all(
                keys.map(key => {
                    if(!key.includes(PREFIX)){
                        return caches.delete(key);
                    }
                })
            )
        })()
    );
});

// Le navigateur renvoie la page offline.html lorsqu'il n'est pas en mesure de se connecter au serveur
self.addEventListener("fetch", (event) => {
    if(event.request.mode == 'navigate'){
        event.respondWith(
            (async () => {
                try{
                    const preloadResponse = await event.preloadResponse;
                    if(preloadResponse){
                        return preloadResponse;
                    }
                    return await fetch(event.request);
                } catch (e) {
                    // Si l'utilisateur est hors-ligne, on lit le fichier offline du cache
                    const cache = await caches.open(PREFIX);
                    return await cache.match('/offline.html');
                }
            })()
        );
    }
});
