/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from "serwist";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare const __PWA_BASE_PATH__: string;

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const basePath = __PWA_BASE_PATH__;
const offlineUrl = `${basePath}/~offline/`;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: ({ request }) => request.destination === "document",
      handler: new NetworkFirst({
        cacheName: "pages",
        networkTimeoutSeconds: 3,
        plugins: [
          {
            handlerDidError: async () =>
              (await caches.match(offlineUrl)) ??
              Response.error(),
          },
        ],
      }),
    },
    {
      matcher: ({ url }) =>
        url.pathname.startsWith(`${basePath}/projects/`) ||
        url.pathname.startsWith("/projects/") ||
        url.pathname.startsWith(`${basePath}/profile/`) ||
        url.pathname.startsWith("/profile/"),
      handler: new CacheFirst({
        cacheName: "repo-assets",
      }),
    },
    {
      matcher: ({ url }) => url.pathname.endsWith(".mp4"),
      handler: new NetworkFirst({
        cacheName: "video-media",
        networkTimeoutSeconds: 5,
        matchOptions: { ignoreVary: true },
      }),
    },
    {
      matcher: ({ url }) =>
        url.hostname === "fonts.googleapis.com" ||
        url.hostname === "fonts.gstatic.com",
      handler: new StaleWhileRevalidate({
        cacheName: "remote-fonts",
      }),
    },
    {
      matcher: ({ request }) =>
        request.destination === "script" ||
        request.destination === "style" ||
        request.destination === "font" ||
        request.destination === "image",
      handler: new StaleWhileRevalidate({
        cacheName: "static-assets",
      }),
    },
  ],
  fallbacks: {
    entries: [
      {
        url: offlineUrl,
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();
