import type { Metadata } from "next";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "技術部署與互動系統作品集",
};

export default function ProjectsPage() {
  return (
    <main className="flex-grow pt-32 md:pt-[100px] pb-20 md:pb-[120px] px-4 md:px-16 max-w-[1280px] mx-auto w-full">
      <header className="mb-12 md:mb-16 mt-4 md:mt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-tertiary/20 bg-surface-container-high/50 font-mono text-[12px] font-medium tracking-widest text-tertiary mb-6 rounded-sm">
          <MaterialIcon name="grid_view" className="text-[14px]" />
          DATA_ARCHIVE_ACCESS
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-pure-white mb-6">
          ARCHIVED{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary">
            INITIATIVES
          </span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl border-l-2 border-primary-container pl-4">
          探索粗獷數位設計與高效能運算的交會。精選技術部署與互動系統作品集。
        </p>
      </header>

      <ProjectGrid projects={projects} />
    </main>
  );
}
