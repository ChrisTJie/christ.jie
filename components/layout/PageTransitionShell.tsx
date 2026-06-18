"use client";

import { usePageTransition } from "@/components/layout/PageTransitionProvider";

export function PageTransitionShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { phase } = usePageTransition();

  return (
    <div className={`page-content flex-grow page-phase-${phase}`}>{children}</div>
  );
}
