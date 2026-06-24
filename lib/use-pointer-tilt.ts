"use client";

import { useCallback, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type PointerTiltOptions = {
  maxTilt?: number;
  scale?: number;
};

export function usePointerTilt({
  maxTilt = 7,
  scale = 1.02,
}: PointerTiltOptions = {}) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>("");

  const reset = useCallback(() => {
    setTransform("");
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (reducedMotion || event.pointerType !== "mouse" || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const rotateY = x * maxTilt * 2;
      const rotateX = -y * maxTilt * 2;

      setTransform(
        `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      );
    },
    [maxTilt, reducedMotion, scale],
  );

  const onPointerLeave = useCallback(() => {
    reset();
  }, [reset]);

  const style = reducedMotion
    ? undefined
    : {
      transform: transform || undefined,
      transition: "transform 0.22s ease-out",
      transformStyle: "preserve-3d" as const,
    };

  return {
    ref,
    style,
    onPointerMove,
    onPointerLeave,
    enabled: !reducedMotion,
  };
}
