"use client";

import { useMemo, useState } from "react";
import { Link } from "@/lib/navigation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { ProjectCardPreview } from "@/components/projects/ProjectMedia";
import type { ProjectItem } from "@/lib/types";
import { projectCategories } from "@/content/projects";

type ProjectGridProps = {
  projects: ProjectItem[];
};

const SORT_MODES = ["CURATED", "CHRONOLOGICAL_DESC", "CHRONOLOGICAL"] as const;
type SortMode = (typeof SORT_MODES)[number];

const SORT_LABELS: Record<SortMode, string> = {
  CURATED: "CURATED",
  CHRONOLOGICAL: "CHRONOLOGICAL",
  CHRONOLOGICAL_DESC: "REVERSE_CHRONO",
};

const SORT_ICONS: Record<SortMode, string> = {
  CURATED: "swap_vert",
  CHRONOLOGICAL: "arrow_upward",
  CHRONOLOGICAL_DESC: "arrow_downward",
};

const categoryMap: Record<string, string[]> = {
  ALL_SYSTEMS: [],
  WEBGL: ["WEBGL"],
  SEC_OPS: ["SEC_OPS"],
  SYS_ARCH: ["SYS_ARCH"],
  DATA_VIZ: ["DATA_VIZ"],
  CLI_TOOLS: ["CLI_TOOLS"],
  NEURAL_NETS: ["NEURAL_NETS"],
  UI_ENGINEERING: ["UI_ENGINEERING"],
};

const categoryFilterClass =
  "relative px-4 py-1.5 font-mono text-[12px] font-medium tracking-widest uppercase border rounded-sm transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-primary-container after:origin-left after:scale-x-0 after:transition-transform after:duration-300 motion-reduce:after:transition-none hover:after:scale-x-100 data-active:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container/60";

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState("ALL_SYSTEMS");
  const [sortMode, setSortMode] = useState<SortMode>("CURATED");

  const curatedOrder = useMemo(
    () => new Map(projects.map((p, i) => [p.slug, i])),
    [projects],
  );

  const filtered = useMemo(
    () =>
      activeCategory === "ALL_SYSTEMS"
        ? projects
        : projects.filter((p) => {
          const cats = categoryMap[activeCategory] ?? [];
          return cats.includes(p.category);
        }),
    [projects, activeCategory],
  );

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sortMode === "CURATED") {
      return list.sort(
        (a, b) =>
          (curatedOrder.get(a.slug) ?? 0) - (curatedOrder.get(b.slug) ?? 0),
      );
    }
    return list.sort((a, b) =>
      sortMode === "CHRONOLOGICAL"
        ? a.deployed.localeCompare(b.deployed)
        : b.deployed.localeCompare(a.deployed),
    );
  }, [filtered, sortMode, curatedOrder]);

  function cycleSortMode() {
    setSortMode((prev) => {
      const idx = SORT_MODES.indexOf(prev);
      return SORT_MODES[(idx + 1) % SORT_MODES.length];
    });
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 border-b border-tertiary/20 pb-4">
        <div className="flex flex-wrap gap-3">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              data-active={activeCategory === cat ? "" : undefined}
              onClick={() => setActiveCategory(cat)}
              className={`${categoryFilterClass} ${activeCategory === cat
                ? "bg-primary-container/10 text-primary-container border-primary-container"
                : "text-on-surface-variant hover:text-primary-container hover:border-primary-container/50 border-transparent"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={cycleSortMode}
          className={`flex items-center gap-2 px-4 py-1.5 font-mono text-[12px] font-medium tracking-widest uppercase border rounded-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container/60 ${sortMode !== "CURATED"
            ? "bg-primary-container/10 text-primary-container border-primary-container"
            : "text-on-surface-variant border-tertiary/30 hover:text-primary-container hover:border-primary-container/50"
            }`}
          aria-label={`排序方式：${SORT_LABELS[sortMode]}，點擊切換`}
        >
          <MaterialIcon name={SORT_ICONS[sortMode]} className="text-[18px]" />
          SORT_BY: {SORT_LABELS[sortMode]}
        </button>
      </div>

      <div
        key={`${activeCategory}-${sortMode}`}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {sorted.map((project, index) => (
          <div
            key={project.slug}
            className={`motion-safe:animate-fade-up ${project.wide ? "lg:col-span-2" : ""}`}
            style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-on-surface-variant font-mono py-16">
          NO_RECORDS_FOUND // 此分類尚無作品
        </p>
      )}
    </>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const [hovered, setHovered] = useState(false);
  const isWide = project.wide;

  return (
    <Link
      href={`/projects/${project.slug}/`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") setHovered(true);
      }}
      onPointerUp={(event) => {
        if (event.pointerType === "touch") setHovered(false);
      }}
      onPointerCancel={() => setHovered(false)}
      className="cyber-card group block bg-surface-container-high border border-tertiary/10 rounded overflow-hidden"
    >
      <div
        className={`relative overflow-hidden bg-surface-dim ${isWide ? "h-64 md:h-80" : "h-64 md:h-72"
          }`}
      >
        <ProjectCardPreview project={project} hovered={hovered} />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high to-transparent opacity-90" />
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="px-2 py-1 bg-surface/80 backdrop-blur-md border border-tertiary/30 font-mono text-[10px] text-tertiary tracking-widest uppercase">
            {project.category}
          </span>
          {project.featured && (
            <span className="px-2 py-1 bg-surface/80 backdrop-blur-md border border-primary-container/30 font-mono text-[10px] text-primary-container tracking-widest uppercase">
              FEATURED
            </span>
          )}
        </div>
      </div>
      <div className={`p-6 relative z-10 ${isWide ? "-mt-12 lg:-mt-20" : "-mt-12"}`}>
        <div
          className={`glass-panel rounded border-l-2 border-l-primary-container ${isWide ? "p-6 border-t-2 border-t-primary-container" : "p-4"
            }`}
        >
          <h3
            className={`font-semibold text-pure-white mb-2 group-hover:text-primary-container transition-colors ${isWide ? "text-2xl md:text-3xl" : "text-2xl"
              }`}
          >
            {project.title}
          </h3>
          <p
            className={`text-on-surface-variant mb-4 ${isWide ? "text-lg max-w-3xl" : "text-base line-clamp-2"
              }`}
          >
            {project.description}
          </p>
          {isWide && (
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[12px] text-outline-variant border border-outline-variant px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between mt-auto">
            <span className="font-mono text-[10px] text-outline-variant">
              DEPL: {project.deployed}
            </span>
            <MaterialIcon
              name="arrow_forward"
              className="text-primary-container group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
