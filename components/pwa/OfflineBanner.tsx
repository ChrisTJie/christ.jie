"use client";

import { useEffect, useState } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const sync = () => setOffline(!navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded border border-primary-container/40 bg-surface-container-high/95 px-4 py-2 font-mono text-[12px] tracking-wide text-primary-container shadow-lg backdrop-blur-md"
    >
      <MaterialIcon name="wifi_off" className="text-[16px]" />
      OFFLINE_MODE // 離線瀏覽中
    </div>
  );
}
