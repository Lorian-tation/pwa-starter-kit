// Enregistrement du Service Worker
window.addEventListener('load', () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/serviceWorker.js");
    }
})

