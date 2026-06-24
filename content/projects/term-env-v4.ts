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
    "Term Env V4 是一套模組化終端機設定，整合 Neovim、Tmux 與自訂 Zsh 主題。",
    "啟動時間低於 50ms，支援一鍵切換多專案工作區與 Git 整合快捷鍵。",
  ],
  gallery: [
    {
      src: projectAsset(slug, "gallery-01.jpg"),
      alt: "程式碼編輯",
      label: "01 // CODE_EDIT",
    },
    {
      src: projectAsset(slug, "gallery-02.jpg"),
      alt: "終端機畫面",
      label: "02 // TERM_UI",
    },
    {
      src: projectAsset(slug, "gallery-03.jpg"),
      alt: "設定檔",
      label: "03 // CONFIG",
      wide: true,
    },
  ],
};
