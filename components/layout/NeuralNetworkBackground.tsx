"use client";

import { useEffect, useRef } from "react";

const CYAN = { r: 0, g: 245, b: 255 };
const TEAL = { r: 141, g: 209, b: 220 };
const BG = "#051424";
const CONNECTION_DIST = 160;
const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
const MOUSE_RADIUS = 200;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  isHub: boolean;
}

interface Signal {
  from: number;
  to: number;
  t: number;
  speed: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mixColor(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
  t: number,
) {
  return {
    r: Math.round(lerp(a.r, b.r, t)),
    g: Math.round(lerp(a.g, b.g, t)),
    b: Math.round(lerp(a.b, b.b, t)),
  };
}

export function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

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
    let neurons: Neuron[] = [];
    let signals: Signal[] = [];
    let frameId = 0;
    let lastSignalSpawn = 0;

    const neuronCount = () =>
      Math.min(90, Math.max(35, Math.floor((width * height) / 18000)));

    function createNeurons() {
      const count = neuronCount();
      neurons = Array.from({ length: count }, () => {
        const isHub = Math.random() < 0.12;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isHub ? 0.15 : 0.35),
          vy: (Math.random() - 0.5) * (isHub ? 0.15 : 0.35),
          radius: isHub ? 2.8 + Math.random() * 1.2 : 1.2 + Math.random() * 1.4,
          phase: Math.random() * Math.PI * 2,
          isHub,
        };
      });
      signals = [];
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNeurons();
    }

    function spawnSignal(now: number) {
      if (now - lastSignalSpawn < 180) return;
      if (signals.length > 12) return;

      const from = Math.floor(Math.random() * neurons.length);
      const fromNode = neurons[from];
      if (!fromNode) return;

      let bestTo = -1;
      let bestDist = CONNECTION_DIST_SQ;

      for (let i = 0; i < neurons.length; i++) {
        if (i === from) continue;
        const dx = neurons[i].x - fromNode.x;
        const dy = neurons[i].y - fromNode.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < bestDist) {
          bestDist = distSq;
          bestTo = i;
        }
      }

      if (bestTo === -1) return;

      lastSignalSpawn = now;
      signals.push({
        from,
        to: bestTo,
        t: 0,
        speed: 0.006 + Math.random() * 0.01,
      });
    }

    function drawVignette() {
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.75,
      );
      gradient.addColorStop(0, "rgba(5, 20, 36, 0)");
      gradient.addColorStop(0.55, "rgba(5, 20, 36, 0.15)");
      gradient.addColorStop(1, "rgba(5, 20, 36, 0.65)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    function drawFrame(now: number) {
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;

      if (!reducedMotion) {
        for (const node of neurons) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          node.x = Math.max(0, Math.min(width, node.x));
          node.y = Math.max(0, Math.min(height, node.y));

          if (mouse.active) {
            const dx = node.x - mouse.x;
            const dy = node.y - mouse.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < MOUSE_RADIUS_SQ && distSq > 0) {
              const force = (1 - distSq / MOUSE_RADIUS_SQ) * 0.02;
              node.vx += (dx / Math.sqrt(distSq)) * force;
              node.vy += (dy / Math.sqrt(distSq)) * force;
            }
          }

          const speed = Math.hypot(node.vx, node.vy);
          const maxSpeed = node.isHub ? 0.5 : 0.7;
          if (speed > maxSpeed) {
            node.vx = (node.vx / speed) * maxSpeed;
            node.vy = (node.vy / speed) * maxSpeed;
          }
        }
      }

      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const a = neurons[i];
          const b = neurons[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > CONNECTION_DIST_SQ) continue;

          const dist = Math.sqrt(distSq);
          const proximity = 1 - dist / CONNECTION_DIST;
          const alpha = proximity * proximity * 0.22;

          const color = mixColor(TEAL, CYAN, proximity);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
          ctx.lineWidth = proximity * 1.2 + 0.3;
          ctx.stroke();
        }
      }

      if (!reducedMotion) spawnSignal(now);

      for (let s = signals.length - 1; s >= 0; s--) {
        const signal = signals[s];
        const from = neurons[signal.from];
        const to = neurons[signal.to];
        if (!from || !to) {
          signals.splice(s, 1);
          continue;
        }

        signal.t += signal.speed;
        if (signal.t >= 1) {
          signals.splice(s, 1);
          continue;
        }

        const sx = lerp(from.x, to.x, signal.t);
        const sy = lerp(from.y, to.y, signal.t);
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 6);
        glow.addColorStop(0, "rgba(0, 245, 255, 0.9)");
        glow.addColorStop(0.4, "rgba(0, 245, 255, 0.25)");
        glow.addColorStop(1, "rgba(0, 245, 255, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(sx, sy, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const node of neurons) {
        const pulse = reducedMotion
          ? 0.5
          : 0.5 + 0.5 * Math.sin(now * 0.002 + node.phase);
        const baseAlpha = node.isHub ? 0.55 + pulse * 0.35 : 0.3 + pulse * 0.25;
        const glowRadius = node.radius * (node.isHub ? 5 : 3.5);

        const glow = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          glowRadius,
        );
        glow.addColorStop(0, `rgba(0, 245, 255, ${baseAlpha})`);
        glow.addColorStop(0.5, `rgba(141, 209, 220, ${baseAlpha * 0.35})`);
        glow.addColorStop(1, "rgba(141, 209, 220, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(233, 254, 255, ${0.5 + pulse * 0.4})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      drawVignette();
    }

    function loop(now: number) {
      drawFrame(now);
      if (!reducedMotion) {
        frameId = requestAnimationFrame(loop);
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, active: false };
    };

    resize();
    frameId = requestAnimationFrame(loop);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
