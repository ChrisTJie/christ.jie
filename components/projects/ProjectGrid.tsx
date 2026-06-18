"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/lib/navigation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { ProjectItem } from "@/lib/types";
import { projectCategories } from "@/content/projects";

type ProjectGridProps = {
  projects: ProjectItem[];
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

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState("ALL_SYSTEMS");

  const filtered =
    activeCategory === "ALL_SYSTEMS"
      ? projects
      : projects.filter((p) => {
        const cats = categoryMap[activeCategory] ?? [];
        return cats.includes(p.category);
      });

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 border-b border-tertiary/20 pb-4">
        <div className="flex flex-wrap gap-3">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 font-mono text-[12px] font-medium tracking-widest uppercase border rounded-sm transition-colors ${activeCategory === cat
                ? "bg-primary-container/10 text-primary-container border-primary-container"
                : "text-on-surface-variant hover:text-primary-container hover:border-primary-container/50 border-transparent"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant font-mono text-sm">
          <MaterialIcon name="sort" className="text-[18px]" />
          SORT_BY: CHRONOLOGICAL
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
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
  const isWide = project.wide;

  return (
    <Link
      href={`/projects/${project.slug}/`}
      className={`cyber-card group block bg-surface-container-high border border-tertiary/10 rounded overflow-hidden ${isWide ? "lg:col-span-2" : ""
        }`}
    >
      <div
        className={`relative overflow-hidden bg-surface-dim ${isWide ? "h-64 md:h-80" : "h-64 md:h-72"
          }`}
      >
        <Image
          src={project.thumbnail}
          alt={project.title}
          width={800}
          height={600}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />
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
      <div className={`p-6 relative z-10 ${isWide ? "-mt-20" : "-mt-12"}`}>
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
