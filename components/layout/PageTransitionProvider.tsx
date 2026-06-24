"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { startTransition } from "react";
import {
  hasOfflineController,
  isOffline,
  navigateOffline,
} from "@/lib/offline-navigation";

export type TransitionPhase = "idle" | "leaving" | "loading" | "entering";

type PageTransitionContextValue = {
  phase: TransitionPhase;
  navigate: (href: string) => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue>({
  phase: "idle",
  navigate: () => { },
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

const LEAVE_MS = 420;
const ENTER_MS = 720;

function normalizePath(path: string) {
  if (path === "/") return "/";
  return path.replace(/\/$/, "") || "/";
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [showCurtain, setShowCurtain] = useState(false);
  const isNavigating = useRef(false);
  const routeReady = useRef(false);
  const pendingTarget = useRef<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    if (enterTimer.current) clearTimeout(enterTimer.current);
    leaveTimer.current = null;
    enterTimer.current = null;
  }, []);

  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  const beginEntering = useCallback(() => {
    if (!routeReady.current || !isNavigating.current) return;

    routeReady.current = false;
    pendingTarget.current = null;
    isNavigating.current = false;
    clearTimers();
    setPhase("entering");
    setShowCurtain(true);

    enterTimer.current = setTimeout(() => {
      setPhase("idle");
      setShowCurtain(false);
    }, ENTER_MS);
  }, [clearTimers]);

  useEffect(() => {
    if (!pendingTarget.current) return;
    if (normalizePath(pathname) !== pendingTarget.current) return;

    routeReady.current = true;
    if (phase === "loading") {
      beginEntering();
    }
  }, [beginEntering, pathname, phase]);

  const navigate = useCallback(
    (href: string) => {
      if (isOffline()) {
        // On some mobile browsers, airplane mode can report offline before
        // SW takes control. Hard navigation would then bypass cache and fail.
        if (hasOfflineController()) {
          navigateOffline(href);
        }
        return;
      }

      const target = normalizePath(href);
      const current = normalizePath(pathname);

      if (target === current || phase !== "idle") return;

      clearTimers();
      routeReady.current = false;
      pendingTarget.current = target;
      isNavigating.current = true;
      setPhase("leaving");
      setShowCurtain(true);

      leaveTimer.current = setTimeout(() => {
        setPhase("loading");
        startTransition(() => {
          router.push(href);
        });
        if (routeReady.current) {
          beginEntering();
        }
      }, LEAVE_MS);
    },
    [beginEntering, clearTimers, pathname, phase, router],
  );

  return (
    <PageTransitionContext.Provider value={{ phase, navigate }}>
      {children}
      {showCurtain && (
        <div
          className="transition-curtain"
          data-phase={phase}
          aria-hidden="true"
        />
      )}
    </PageTransitionContext.Provider>
  );
}
