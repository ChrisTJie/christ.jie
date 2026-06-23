import type { ProjectItem } from "@/lib/types";

export const projects: ProjectItem[] = [
  {
    slug: "project-onyx",
    title: "Project_Onyx",
    subtitle: "次世代威脅偵測介面",
    description:
      "運用預測性神經網路，即時視覺化網路異常的下一代威脅偵測介面。",
    category: "SEC_OPS",
    tags: ["REACT", "D3.JS", "PYTHON"],
    deployed: "2023.11",
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    hero: {
      slides: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&h=600&fit=crop",
          alt: "威脅偵測介面總覽",
          label: "01 // COMMAND_VIEW",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&h=600&fit=crop",
          alt: "終端機介面",
          label: "02 // TERMINAL_VIEW",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=600&fit=crop",
          alt: "全球節點地圖",
          label: "03 // GEO_NODES",
        },
      ],
    },
    role: "Lead UI/UX Engineer",
    timeline: "Q3 2023 - Q1 2024",
    summary: [
      "Project Onyx 旨在填補抽象機器學習演算法與即時視覺分析之間的鴻溝，為高效能資安營運中心打造。",
      "平台可攝取大量網路日誌，並轉譯為流暢的 3D 節點環境，讓分析師在數秒內定位異常。",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=600&fit=crop",
        alt: "終端機介面",
        label: "01 // TERMINAL_VIEW",
      },
      {
        src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=600&fit=crop",
        alt: "全球節點地圖",
        label: "02 // GEO_NODES",
      },
      {
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=600&fit=crop",
        alt: "伺服器機房",
        label: "03 // HARDWARE_SYNC",
        wide: true,
      },
    ],
    links: [
      { label: "LIVE_DEMO", href: "https://example.com/onyx", external: true },
      { label: "REPO", href: "https://github.com/christjie", external: true },
    ],
  },
  {
    slug: "void-renderer",
    title: "Void_Renderer",
    subtitle: "高效能 WebGL 渲染引擎",
    description:
      "專為瀏覽器環境打造的高效能抽象資料視覺化自訂 WebGL 渲染引擎。",
    category: "WEBGL",
    tags: ["WEBGL", "TYPESCRIPT", "GLSL"],
    deployed: "2024.02",
    thumbnail:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop",
    role: "Rendering Engineer",
    timeline: "Q1 2024 - Q2 2024",
    summary: [
      "Void Renderer 是一套輕量級 WebGL 抽象層，專注於百萬級節點的即時渲染。",
      "透過自訂著色器管線與 WASM 加速，在一般筆電上維持 60fps 以上的流暢體驗。",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop",
        alt: "3D 幾何渲染",
        label: "01 // WIREFRAME",
      },
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop",
        alt: "效能儀表板",
        label: "02 // PERF_METRICS",
      },
      {
        src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=600&fit=crop",
        alt: "程式碼編輯器",
        label: "03 // SHADER_DEV",
        wide: true,
      },
    ],
  },
  {
    slug: "quantum-logic",
    title: "Quantum_Logic",
    subtitle: "量子狀態監控儀表板",
    description:
      "實驗性硬體介面儀表板，用於監控局部量子態波動與錯誤率。",
    category: "SYS_ARCH",
    tags: ["RUST", "REACT", "MQTT"],
    deployed: "2023.08",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    role: "Systems Architect",
    timeline: "Q2 2023 - Q4 2023",
    summary: [
      "Quantum Logic 為研究團隊提供即時量子位元狀態監控，整合多種感測器資料流。",
      "介面採用模組化儀表板設計，支援自訂告警規則與歷史趨勢分析。",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1535378644916-2a4f1a90ae6b?w=600&h=600&fit=crop",
        alt: "電路板特寫",
        label: "01 // CIRCUIT_MAP",
      },
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop",
        alt: "資料視覺化",
        label: "02 // STATE_VIZ",
      },
      {
        src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=600&fit=crop",
        alt: "實驗室環境",
        label: "03 // LAB_ENV",
        wide: true,
      },
    ],
  },
  {
    slug: "nexus-global-mapping",
    title: "Nexus_Global_Mapping",
    subtitle: "全球資料流互動地圖",
    description:
      "運用自訂 WebGL 管線，可同時渲染數百萬節點的即時互動全球資料流地圖系統。",
    category: "DATA_VIZ",
    tags: ["REACT", "THREE.JS", "GLSL"],
    deployed: "2023.05",
    featured: true,
    wide: true,
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    hero: {
      slides: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=600&fit=crop",
          alt: "全球資料流地圖總覽",
          label: "01 // GLOBAL_MESH",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&h=600&fit=crop",
          alt: "終端機視圖",
          label: "02 // TERMINAL_VIEW",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&h=600&fit=crop",
          alt: "硬體同步節點",
          label: "03 // HARDWARE_SYNC",
        },
      ],
    },
    role: "Lead Architect UI/UX",
    timeline: "Q1 2023 - Q3 2023",
    summary: [
      "Nexus Global Mapping 是為高效能資安營運中心設計的即時全球資料流視覺化平台。",
      "透過 WebGL 著色器與 Rust 資料處理管線，在重負載下仍維持 120fps 渲染。介面設計以 cyber-industrial 美學呈現，讓異常一目了然。",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=600&fit=crop",
        alt: "終端機視圖",
        label: "01 // TERMINAL_VIEW",
      },
      {
        src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=600&fit=crop",
        alt: "地理節點",
        label: "02 // GEO_NODES",
      },
      {
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=600&fit=crop",
        alt: "硬體同步",
        label: "03 // HARDWARE_SYNC",
        wide: true,
      },
    ],
  },
  {
    slug: "term-env-v4",
    title: "Term_Env_V4",
    subtitle: "高效能終端機環境",
    description:
      "專注於開發者人體工學與極簡干擾的高度客製化、極速終端機環境設定。",
    category: "CLI_TOOLS",
    tags: ["NEOVIM", "TMUX", "ZSH"],
    deployed: "2024.01",
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
    summary: [
      "Term Env V4 是一套模組化終端機設定，整合 Neovim、Tmux 與自訂 Zsh 主題。",
      "啟動時間低於 50ms，支援一鍵切換多專案工作區與 Git 整合快捷鍵。",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=600&fit=crop",
        alt: "程式碼編輯",
        label: "01 // CODE_EDIT",
      },
      {
        src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=600&fit=crop",
        alt: "終端機畫面",
        label: "02 // TERM_UI",
      },
      {
        src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=600&fit=crop",
        alt: "設定檔",
        label: "03 // CONFIG",
        wide: true,
      },
    ],
  },
  {
    slug: "glitch-code-reel",
    title: "Glitch_Code_Reel",
    subtitle: "Glitch 程式碼視覺素材",
    description:
      "免費授權的 glitch、程式碼與終端機風格動態素材，適用於 cyber-industrial 介面背景與片頭。",
    category: "CLI_TOOLS",
    tags: ["GLITCH", "CODE", "STOCK_FOOTAGE"],
    deployed: "2026.06",
    featured: true,
    thumbnail: "/projects/glitch-code-reel/poster.jpg",
    hero: {
      slides: [
        {
          type: "video",
          src: "/projects/glitch-code-reel/demo.mp4",
          poster: "/projects/glitch-code-reel/poster.jpg",
          alt: "Glitch 程式碼 stock footage 完整片段",
          label: "01 // GLITCH_REEL",
        },
        {
          type: "image",
          src: "/projects/glitch-code-reel/poster.jpg",
          alt: "Glitch 程式碼素材靜態海報",
          label: "02 // POSTER_STILL",
        },
      ],
    },
    summary: [
      "一段約 10 秒的 glitch 程式碼 stock footage，以數位雜訊、終端機文字與干擾效果呈現 programming 視覺語彙。",
      "作為 christ.jie 的影音展示範例，支援專案卡片 hover 預覽、詳情頁 Hero 自動播放與畫廊手動播放。",
    ],
    gallery: [
      {
        type: "video",
        src: "/projects/glitch-code-reel/demo.mp4",
        poster: "/projects/glitch-code-reel/poster.jpg",
        alt: "Glitch 程式碼 stock footage 完整片段",
        label: "01 // GLITCH_REEL",
        wide: true,
      },
    ],
  },
  {
    slug: "synapse-ui-kit",
    title: "Synapse_UI_Kit",
    subtitle: "設計系統與元件庫",
    description:
      "可擴展的 React 設計系統，涵蓋無障礙元件、主題令牌與文件站點。",
    category: "UI_ENGINEERING",
    tags: ["REACT", "STORYBOOK", "A11Y"],
    deployed: "2024.05",
    featured: true,
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    role: "Design Systems Lead",
    timeline: "Q2 2024 - 進行中",
    summary: [
      "Synapse UI Kit 為內部產品線提供統一的視覺語言與互動模式。",
      "元件庫支援深色主題、鍵盤導覽與 WCAG 2.1 AA 對比標準。",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop",
        alt: "元件預覽",
        label: "01 // COMPONENTS",
      },
      {
        src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=600&fit=crop",
        alt: "文件站點",
        label: "02 // DOCS",
      },
    ],
  },
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
  return projects.find((p) => p.slug === slug);
}
