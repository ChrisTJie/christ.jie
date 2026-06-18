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

export type TransitionPhase = "idle" | "leaving" | "entering";

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
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    if (enterTimer.current) clearTimeout(enterTimer.current);
  }, []);

  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  useEffect(() => {
    if (!isNavigating.current) return;

    isNavigating.current = false;
    setShowCurtain(true);

    enterTimer.current = setTimeout(() => {
      setPhase("idle");
      setShowCurtain(false);
    }, ENTER_MS);
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      const target = normalizePath(href);
      const current = normalizePath(pathname);

      if (target === current || phase !== "idle") return;

      clearTimers();
      isNavigating.current = true;
      setPhase("leaving");
      setShowCurtain(true);

      leaveTimer.current = setTimeout(() => {
        setPhase("entering");
        startTransition(() => {
          router.push(href);
        });
      }, LEAVE_MS);
    },
    [clearTimers, pathname, phase, router],
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
