"use client";

import { useSerwist } from "@serwist/next/react";
import { useEffect, useState } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function UpdatePrompt() {
  const { serwist } = useSerwist();
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (!serwist) return;

    const onWaiting = () => setWaiting(true);
    serwist.addEventListener("waiting", onWaiting);
    return () => serwist.removeEventListener("waiting", onWaiting);
  }, [serwist]);

  if (!waiting) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-3 rounded border border-tertiary/30 bg-surface-container-high/95 p-4 shadow-lg backdrop-blur-md"
    >
      <div className="flex items-start gap-2">
        <MaterialIcon
          name="system_update"
          className="mt-0.5 text-[18px] text-primary-container"
        />
        <div>
          <p className="font-mono text-[12px] tracking-wide text-primary-container">
            UPDATE_AVAILABLE
          </p>
          <p className="mt-1 text-sm text-on-surface-variant">
            有新版本可供安裝，更新後可取得最新作品內容。
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => serwist?.messageSkipWaiting()}
        className="self-end font-mono text-[12px] tracking-widest text-primary-container underline-offset-4 hover:underline"
      >
        立即更新
      </button>
    </div>
  );
}
