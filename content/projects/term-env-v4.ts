import type { ProjectItem } from "@/lib/types";
import { projectAsset } from "@/lib/assets";

const slug = "term-env-v4";

export const termEnvV4: ProjectItem = {
  slug,
  title: "Term_Env_V4",
  subtitle: "高效能終端機環境",
  description:
    "專注於開發者人體工學與極簡干擾的高度客製化、極速終端機環境設定。",
  category: "CLI_TOOLS",
  tags: ["NEOVIM", "TMUX", "ZSH"],
  deployed: "2024.01",
  thumbnail: projectAsset(slug, "thumbnail.jpg"),
  summary: [
    `**Term Env V4** 是一套模組化終端機設定，整合 \`Neovim\`、\`Tmux\` 與自訂 \`Zsh\` 主題，專注於開發者人體工學與極簡干擾。`,
    `啟動時間低於 **50ms**，並提供日常工作流加速：

- 一鍵切換多專案工作區
- Git 狀態與分支整合快捷鍵
- 可版本化的 dotfiles 模組結構`,
  ],
  gallery: [
    {
      src: projectAsset(slug, "gallery-01.jpg"),
      alt: "程式碼編輯",
      label: "01 // CODE_EDIT",
      layout: "portrait",
    },
    {
      src: projectAsset(slug, "gallery-02.jpg"),
      alt: "終端機畫面",
      label: "02 // TERM_UI",
      layout: "square",
    },
    {
      src: projectAsset(slug, "gallery-03.jpg"),
      alt: "設定檔",
      label: "03 // CONFIG",
      layout: "landscape",
    },
    {
      src: projectAsset(slug, "thumbnail.jpg"),
      alt: "工作區總覽",
      label: "04 // WORKSPACE_VIEW",
      layout: "wide",
    },
  ],
};
