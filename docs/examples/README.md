# 內容範本

複製以下檔案至 `content/` 對應位置，替換 placeholder 後即可驅動頁面。範本 **不會** 被應用程式匯入，僅供參考與型別檢查。

## 檔案一覽

| 檔案 | 用途 | 複製目標 |
|------|------|----------|
| [`full-project.ts`](./full-project.ts) | 專案全部欄位與媒體組合 | `content/projects/{slug}.ts` |
| [`profile.template.ts`](./profile.template.ts) | 首頁與 SEO 個人檔 | `content/profile.ts` |
| [`experience.template.ts`](./experience.template.ts) | 經歷頁四種資料 | `content/experience.ts` |

## 新增專案流程

### 1. 建立內容檔

```bash
cp docs/examples/full-project.ts content/projects/my-project.ts
```

編輯檔案：

- 將 `slug`、`myFullProject` 匯出名稱改為實際專案
- 依需求刪除 `featured`、`wide`、`links`、`hero`、`awards` 等選填區塊
- 確認 `category` 為合法值（見 [projects/categories.md](../projects/categories.md)）

### 2. 建立媒體目錄

```
public/projects/{slug}/
├── thumbnail.jpg      # 建議；列表縮圖（`thumbnail` 欄位指向的檔案）
├── poster.png         # 亦可作為縮圖或影片 poster
├── hero-01.jpg        # 選填（Hero）
├── hero-02.jpg
├── poster.jpg
├── demo.mp4
├── gallery-01.jpg     # 畫廊
├── gallery-02.jpg
└── award-01.png       # 選填（獎項徽章）
```

素材較少時可只保留列表縮圖與實際使用的畫廊檔案，並從範本中刪除對應的 `hero` slides 與 `gallery` 項目。

### 3. 註冊至清單

在 `content/projects/index.ts`：

```ts
import { myProject } from "@/content/projects/my-project";

export const projects: ProjectItem[] = [
  // ...
  myProject,
];
```

陣列順序即列表頁 **CURATED** 排序。

### 4. 驗證

```bash
npm run dev
```

- 開啟 `/projects/` 確認卡片、篩選、排序
- 開啟 `/projects/{slug}/` 確認 Hero、摘要、側欄（時程、獎項、連結）、畫廊

可選執行 `npm run check` 做 lint、型別與建置驗證。

## 欄位取捨建議

| 情境 | 可省略 | 參考 |
|------|--------|------|
| 快速上架、素材少 | `hero`、`role`、`timeline`、`awards`、`links`、`featured`、`wide`；畫廊保留一項即可 | `term-env-v4` |
| 精選大卡、多媒體 | 保留 `featured`、`wide`；依實際刪減 hero slides / gallery 項目 | `nexus-global-mapping` |
| 影片為主作品 | 可刪多圖 hero slides，保留影片 slide + poster | `glitch-code-reel` |
| 獎項展示 | 保留 `awards`（含 `image` 與 Markdown `text`） | `project-onyx` |
| 僅縮圖展示 | 整個 `hero` 區塊 | `void-renderer` |

## 型別檢查

`docs/examples/*.ts` 納入專案 `tsconfig.json`，修改範本後若型別不符，`tsc` / IDE 會即時提示。
