import { PageTransitionShell } from "@/components/layout/PageTransitionShell";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransitionShell>{children}</PageTransitionShell>;
}
