import type { ProjectItem } from "@/lib/types";
import { glitchCodeReel } from "@/content/projects/glitch-code-reel";
import { nexusGlobalMapping } from "@/content/projects/nexus-global-mapping";
import { projectOnyx } from "@/content/projects/project-onyx";
import { quantumLogic } from "@/content/projects/quantum-logic";
import { synapseUiKit } from "@/content/projects/synapse-ui-kit";
import { termEnvV4 } from "@/content/projects/term-env-v4";
import { voidRenderer } from "@/content/projects/void-renderer";

export const projects: ProjectItem[] = [
  projectOnyx,
  voidRenderer,
  quantumLogic,
  nexusGlobalMapping,
  termEnvV4,
  glitchCodeReel,
  synapseUiKit,
];

export const projectCategories = [
  "ALL_SYSTEMS",
  "WEBGL",
  "SEC_OPS",
  "SYS_ARCH",
  "DATA_VIZ",
  "CLI_TOOLS",
  "NEURAL_NETS",
  "UI_ENGINEERING",
] as const;

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((project) => project.slug === slug);
}
