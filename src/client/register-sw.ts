export function registerServiceWorker() {
  document.addEventListener("DOMContentLoaded", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(`/static/bundle/service-worker.js?v=${__APP_VERSION__}`)
        .then(() => console.log("SW registered"))
        .catch((err) => console.error("SW registration failed:", err));
    }
  });
}
