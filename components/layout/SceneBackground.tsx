"use client";

import { NeuralNetworkBackground } from "@/components/layout/NeuralNetworkBackground";
import { PerspectiveGridBackground } from "@/components/layout/PerspectiveGridBackground";
import { XRBackgroundLayer } from "@/components/layout/XRBackgroundLayer";

export function SceneBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <PerspectiveGridBackground />
      <NeuralNetworkBackground />
      <XRBackgroundLayer />
    </div>
  );
}
