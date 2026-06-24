"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { profile } from "@/content/profile";
import { resolveAssetSrc } from "@/lib/assets";
import { usePointerTilt } from "@/lib/use-pointer-tilt";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [pointerFine, setPointerFine] = useState(false);
  const [glow, setGlow] = useState({ x: 0, y: 0, visible: false });
  const {
    ref: portraitRef,
    style: portraitStyle,
    onPointerMove: onPortraitPointerMove,
    onPointerLeave: onPortraitPointerLeave,
    enabled: tiltEnabled,
  } = usePointerTilt({ maxTilt: 7, scale: 1.02 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const sync = () => setPointerFine(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const interactive = pointerFine && !reducedMotion;

  const onSectionPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!interactive || event.pointerType !== "mouse" || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      setGlow({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        visible: true,
      });
    },
    [interactive],
  );

  const onSectionPointerLeave = useCallback(() => {
    setGlow((current) => ({ ...current, visible: false }));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section min-h-[58vh] md:min-h-[70vh] flex flex-col justify-center relative"
      onPointerMove={onSectionPointerMove}
      onPointerLeave={onSectionPointerLeave}
    >
      {interactive && (
        <div
          aria-hidden="true"
          className="hero-cursor-glow"
          data-visible={glow.visible ? "" : undefined}
          style={{ left: glow.x, top: glow.y }}
        />
      )}

      <div className="absolute inset-0 z-0 opacity-20 blur-3xl rounded-full bg-primary-container w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen pointer-events-none" />
      <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
        <div className="flex flex-col gap-10 max-w-3xl">
          <div className="font-mono text-[13px] font-medium tracking-wider text-tertiary flex items-center gap-2">
            <span className="w-8 h-px bg-tertiary" />
            SYSTEM_INITIALIZED
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">
            {profile.headline}
            <br />
            <span className="text-primary-container motion-safe:animate-neon-pulse">
              {profile.headlineAccent}
            </span>
          </h1>
          <p className="text-base text-on-surface-variant max-w-2xl leading-relaxed">
            {profile.tagline}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/projects/" variant="primary" icon="arrow_forward">
              INITIATE_SEQUENCE
            </Button>
            <Button href="/experience/" variant="secondary" icon="terminal">
              VIEW_LOGS
            </Button>
          </div>
        </div>

        <div
          ref={portraitRef}
          className={`relative group max-w-sm mx-auto md:mx-0 md:ml-auto ${tiltEnabled ? "[transform-style:preserve-3d]" : ""}`}
          onPointerMove={onPortraitPointerMove}
          onPointerLeave={onPortraitPointerLeave}
          style={portraitStyle}
        >
          <div className="absolute -inset-1 bg-primary-container/20 blur-xl rounded opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="relative border border-primary/30 overflow-hidden rounded aspect-[3/4] xr-hologram">
            <Image
              src={resolveAssetSrc(profile.avatar)}
              alt={profile.name}
              width={400}
              height={533}
              className="w-full h-full object-cover xr-hologram-image"
              priority
            />
            <div className="xr-hologram-scan" aria-hidden="true" />
            <div className="xr-hologram-corners" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 text-tertiary/40 font-mono text-[10px] pointer-events-none">
        <div>&gt; XR_RUNTIME: ACTIVE</div>
        <div>&gt; SPATIAL_TRACK: 6DOF</div>
        <div>&gt; ANCHOR_SYNC: 12ms</div>
        <div className="h-32 w-px bg-gradient-to-b from-tertiary/40 to-transparent ml-2 mt-4" />
      </div>
    </section>
  );
}
