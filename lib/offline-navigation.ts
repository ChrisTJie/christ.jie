import { withBasePath } from "@/lib/base-path";

export function isOffline(): boolean {
  return typeof navigator !== "undefined" && !navigator.onLine;
}

export function hasOfflineController(): boolean {
  if (typeof navigator === "undefined") return false;
  return Boolean(navigator.serviceWorker?.controller);
}

/** Full document navigation so the service worker can serve precached HTML offline. */
export function navigateOffline(href: string): void {
  window.location.assign(withBasePath(href));
}
