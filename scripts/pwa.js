/* PWA — service-worker registration + custom "install app" button.
   Standalone classic script; loaded after bundle.js in index.html. */
(function () {
  'use strict';

  /* ---- Service worker ----
     Pages live at different depths (/, /placement/, …); each sets
     window.__SW_PATH__ to the correct relative path to the root sw.js.
     The SW file sits at the app root, so its scope covers every tool. */
  if ('serviceWorker' in navigator) {
    var swPath = window.__SW_PATH__ || 'sw.js';
    window.addEventListener('load', function () {
      navigator.serviceWorker.register(swPath).catch(function (err) {
        console.warn('[pwa] service worker registration failed:', err);
      });
    });
  }

  /* ---- Custom install button (beforeinstallprompt) ---- */
  var btn = document.getElementById('install-btn');
  if (!btn) return;

  var deferredPrompt = null;

  function show() {
    btn.classList.remove('hidden');
    btn.classList.add('flex');
  }
  function hide() {
    btn.classList.add('hidden');
    btn.classList.remove('flex');
    deferredPrompt = null;
  }

  // Chromium fires this when the app is installable — stash it, reveal the button.
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    show();
  });

  btn.addEventListener('click', function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.finally(hide);
  });

  // Already installed (or just installed) — no need for the button.
  window.addEventListener('appinstalled', hide);
})();
