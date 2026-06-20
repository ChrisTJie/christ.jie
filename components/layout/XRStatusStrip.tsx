"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const XR_STATUS = [
  "XR_PIPELINE: ACTIVE",
  "TRACKING: 6DOF",
  "SPATIAL_MESH: STABLE",
  "ANCHORS: 4 LOCKED",
] as const;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function XRStatusStrip() {
  const [statusIndex, setStatusIndex] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  useEffect(() => {
    if (reducedMotion) return;

    const interval = window.setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % XR_STATUS.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="xr-status-strip font-mono" aria-hidden="true">
      <span className="xr-status-dot" />
      <span key={statusIndex} className="xr-status-message">
        {XR_STATUS[statusIndex]}
      </span>
      <span className="xr-status-divider">|</span>
      <span>EXTENDED_REALITY</span>
    </div>
  );
}
