"use client";

import { useEffect, useRef } from "react";

const CYAN = "rgba(0, 245, 255";
const TEAL = "rgba(141, 209, 220";
const BG = "#051424";

export function PerspectiveGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const context = canvasEl.getContext("2d");
    if (!context) return;

    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let scrollOffset = 0;
    let frameId = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawFrame() {
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, width, height);

      const horizonY = height * 0.42;
      const vanishX = width * 0.5;
      const vanishY = horizonY;

      if (!reducedMotion) {
        scrollOffset = (scrollOffset + 0.35) % 40;
      }

      const hLines = 14;
      for (let i = 0; i <= hLines; i++) {
        const t = i / hLines;
        const eased = t * t;
        const y = vanishY + (height - vanishY) * eased;

        if (y <= vanishY + 1) continue;

        const alpha = 0.04 + eased * 0.14;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = `${TEAL}, ${alpha})`;
        ctx.lineWidth = 0.5 + eased * 0.5;
        ctx.stroke();
      }

      const vLines = 22;
      for (let i = -vLines / 2; i <= vLines / 2; i++) {
        const spread = (i / (vLines / 2)) * (width * 0.55);
        const xBottom = vanishX + spread;
        const alpha = 0.05 + (1 - Math.abs(i) / (vLines / 2)) * 0.1;

        ctx.beginPath();
        ctx.moveTo(vanishX, vanishY);
        ctx.lineTo(xBottom, height);
        ctx.strokeStyle = `${CYAN}, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      const floorBands = 8;
      for (let i = 0; i <= floorBands; i++) {
        const bandT = i / floorBands;
        const y1 =
          vanishY +
          (height - vanishY) * bandT * bandT +
          scrollOffset * bandT * 0.15;
        const y2 =
          vanishY +
          (height - vanishY) * ((i + 1) / floorBands) ** 2 +
          scrollOffset * ((i + 1) / floorBands) * 0.15;

        if (y2 > height + 2) continue;

        ctx.beginPath();
        ctx.moveTo(vanishX - width, y1);
        ctx.lineTo(vanishX + width, y1);
        ctx.strokeStyle = `${CYAN}, ${0.03 + bandT * 0.06})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (i % 2 === 0 && y2 < height) {
          ctx.fillStyle = `${CYAN}, 0.015)`;
          ctx.fillRect(0, y1, width, Math.min(y2 - y1, height - y1));
        }
      }

      const horizonGlow = ctx.createLinearGradient(0, vanishY - 40, 0, vanishY + 80);
      horizonGlow.addColorStop(0, "rgba(5, 20, 36, 0)");
      horizonGlow.addColorStop(0.5, "rgba(0, 245, 255, 0.06)");
      horizonGlow.addColorStop(1, "rgba(5, 20, 36, 0)");
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, vanishY - 40, width, 120);

      const fade = ctx.createLinearGradient(0, 0, 0, height);
      fade.addColorStop(0, "rgba(5, 20, 36, 0.85)");
      fade.addColorStop(0.35, "rgba(5, 20, 36, 0.2)");
      fade.addColorStop(0.65, "rgba(5, 20, 36, 0.05)");
      fade.addColorStop(1, "rgba(5, 20, 36, 0.35)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, width, height);
    }

    function loop() {
      drawFrame();
      if (!reducedMotion) {
        frameId = requestAnimationFrame(loop);
      }
    }

    resize();
    frameId = requestAnimationFrame(loop);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-70"
      aria-hidden="true"
    />
  );
}
