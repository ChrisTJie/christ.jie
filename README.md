# CHRIST.JIE

ChrisT.Jie 的個人作品集網站——以 **Cyber Obsidian** 視覺語言呈現的全端工程與 UI/UX 設計作品。內容由 TypeScript 靜態資料驅動，支援靜態匯出、GitHub Pages 部署與 PWA 離線體驗。

## 功能概覽

- **首頁** — 個人簡介、統計卡片、關於我與導覽入口
- **作品集** (`/projects/`) — 分類篩選、精選排序、卡片 hover 影片預覽
- **專案詳情** (`/projects/[slug]/`) — Hero 輪播、摘要、畫廊、外部連結
- **經歷** (`/experience/`) — 工作經歷、學歷、證照、技能時間軸
- **PWA** — Service Worker 快取、離線頁面、更新提示、可安裝至主畫面

## 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | [Next.js 16](https://nextjs.org)（App Router、靜態匯出） |
| UI | React 19、Tailwind CSS 4 |
| 語言 | TypeScript |
| PWA | [Serwist](https://serwist.pages.dev) |
| 部署 | GitHub Actions → GitHub Pages |

## 快速開始

```bash
npm install
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 預覽。

開發時若要同步建置 Service Worker，可使用：

```bash
npm run dev:pwa
```

## 常用指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器 |
| `npm run dev:pwa` | 開發模式 + Serwist watch |
| `npm run build` | 靜態匯出並建置 PWA |
| `npm run start` | 預覽 production build |
| `npm run lint` | ESLint 檢查 |
| `npm run typecheck` | TypeScript 型別檢查 |
| `npm run check` | lint + typecheck + build 完整驗證 |
| `npm run verify:pwa` | 驗證 PWA 產物與 basePath |

## 專案結構

```
app/                    # Next.js 頁面與路由
components/             # UI 元件（layout、projects、home、pwa）
content/                # 靜態內容資料
  profile.ts            # 首頁個人檔與 SEO
  experience.ts         # 經歷、學歷、證照、技能
  projects/             # 作品集項目
lib/                    # 型別、資產路徑、Hero 解析、PWA 設定
public/                 # 靜態媒體（profile/、projects/{slug}/、icons/）
docs/                   # 內容模型與範本文件
scripts/                # PWA 圖示產生、資產種子、驗證腳本
```

頁面元件不硬編碼文案，所有內容皆來自 `content/` 與 `public/`。修改個人資訊或新增專案時，通常只需更新資料檔與媒體，不必動 UI 程式碼。

## 內容管理

完整說明見 [`docs/content-model.md`](docs/content-model.md)。

**新增專案（精簡流程）：**

1. 在 `public/projects/{slug}/` 放置媒體（至少 `thumbnail.jpg`）
2. 新增 `content/projects/{slug}.ts`，匯出符合 `ProjectItem` 的物件
3. 在 `content/projects/index.ts` 註冊並設定排序
4. 執行 `npm run dev` 確認列表頁與詳情頁

範本與欄位說明：

- [`docs/examples/`](docs/examples/README.md) — 可複製的 Profile、Experience、專案範本
- [`docs/projects/fields.md`](docs/projects/fields.md) — 專案欄位與 UI 對照
- [`docs/projects/categories.md`](docs/projects/categories.md) — 分類篩選
- [`docs/projects/assets.md`](docs/projects/assets.md) — 媒體路徑慣例
- [`docs/projects/hero-media.md`](docs/projects/hero-media.md) — Hero 輪播與影片規則

## 部署

本站以 **靜態匯出**（`output: "export"`）建置，預設部署至 GitHub Pages 子路徑 `/christ.jie/`。

推送到 `main` 分支時，[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 會自動執行 `npm run build`（設定 `GITHUB_PAGES=true`）並發布 `out/` 目錄。

本地模擬 GitHub Pages 環境：

```bash
GITHUB_PAGES=true npm run build
npx serve out
```

`basePath` 由 `next.config.ts` 與 `NEXT_PUBLIC_BASE_PATH` 控制；本地資產路徑會經 `resolveAssetSrc()` 自動加上前綴，外部 URL 不受影響。

## 設計系統

視覺主題為 **Cyber Obsidian**——深色底、青色強調、玻璃質感卡片與 XR 風格背景層。設計 token 定義於 `app/globals.css`。

## 授權

本儲存庫採**雙重授權**：

### 原始碼（MIT）

`app/`、`components/`、`lib/`、`scripts/` 等程式碼，以及網站架構、元件與建置設定，以 [MIT License](LICENSE) 授權。你可自由使用、修改與散布，惟需保留版權聲明。

### 個人內容（保留所有權利）

以下內容著作權屬 **ChrisT.Jie**，**未**授權他人複製、修改或散布：

- `content/` 內的個人簡介、經歷、技能、專案文案等履歷資料
- `public/profile/`、`public/projects/` 內的個人照片與專案媒體

若要引用或重製上述內容，請事先取得作者同意。

`package.json` 的 `private: true` 僅防止誤發佈至 npm，與上述授權無關。
