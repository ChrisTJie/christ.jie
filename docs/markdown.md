# Markdown 內容撰寫

站內部分文字欄位以 **Markdown（GFM）** 渲染，由 `react-markdown` + `remark-gfm` 解析。樣式與外掛集中管理，便於擴充與維護。

## 架構

```
lib/markdown.ts              ← 外掛、variant、工具函式（無 JSX）
lib/markdown-components.tsx  ← 主題化元素對應表 createMarkdownComponents()
components/ui/
  MarkdownContent.tsx        ← 單一字串 Markdown
  MarkdownBlocks.tsx         ← string[] 多區塊（summary、bio 等）
```

頁面只引用 `MarkdownContent` / `MarkdownBlocks`，不直接依賴 `react-markdown`，以降低日後換實作或加外掛的成本。

## 目前使用欄位

| 欄位 | 型別 | 頁面 | 元件 | variant |
|------|------|------|------|---------|
| `ProjectItem.summary` | `string[]` | 專案詳情 `EXECUTIVE_SUMMARY` | `MarkdownBlocks` | `prose-lg` |
| `ExperienceItem.description` | `string` | `/experience/` 時間軸卡片 | `MarkdownContent` | `body` |
| `ExperienceItem.highlights` | `string[]` | `/experience/` `>` 條列 | `MarkdownContent` | `inline` |
| `Profile.bio` | `string[]` | 首頁 `IDENTITY_DATA` | `MarkdownBlocks` | `body` |

### 擴充其他欄位（建議步驟）

1. 在對應頁面改用 `MarkdownContent`（單段）或 `MarkdownBlocks`（陣列）。
2. 於 `lib/types.ts` 加上 JSDoc 說明支援 Markdown。
3. 更新本文件與對應欄位文件。
4. 若需不同字級，使用 `variant`：`body`、`prose-lg` 或 `inline`（條列內行內語法）。

候選欄位：`EducationItem.detail`。

## 撰寫慣例

### `summary: string[]`

- **陣列每一項 = 一個獨立 Markdown 區塊**（區塊之間有 `mb-6` 間距）。
- 單一項內可用空行分段、條列、粗體等，不必為了換行拆成多個陣列元素。
- 純文字（無 Markdown 語法）與過去行為一致，既有內容無需修改。

範例：

```ts
summary: [
  "開場段落，可含 **重點** 與 `行內程式碼`。",
  `第二區塊可含條列：

- 調查與戰鬥兩階段
- [外部連結](https://example.com) 會自動新分頁開啟`,
],
```

### `ExperienceItem.description` / `highlights`

- **`description`**：單一 Markdown 區塊，支援段落、條列與連結。
- **`highlights`**：陣列每項為**行內 Markdown**（粗體、code、連結），保留時間軸 `>` 前綴樣式。
- 條列項請避免區塊級語法（如 `#` 標題、多段空行），以免破壞 `>` 列表版面。

```ts
{
  description: "主導**分散式架構**設計，吞吐量提升 **400%**。",
  highlights: [
    "將核心服務延遲降至 **40ms** 以內。",
    "詳見 [技術部落格](https://example.com)。",
  ],
}
```

### `Profile.bio: string[]`

- 與 `summary` 相同：**陣列每一項 = 一個 Markdown 區塊**。
- 首頁 `IDENTITY_DATA` 區塊使用 `variant="body"`，區塊間距 `mb-4`。
- 適合第一段定位、第二段條列專長或附連結。

```ts
bio: [
  "我活躍於**設計與工程的交界**，專注於高效能數位體驗。",
  `專長領域：

- \`Web\` 應用與互動體驗
- 設計系統與 **UI/UX** 工程化
- [GitHub](https://github.com/your-handle)`,
],
```

### 支援語法（GFM）

| 語法 | 說明 |
|------|------|
| `**粗體**` | 強調關鍵詞 |
| `*斜體*` | 次要強調 |
| `` `code` `` | 行內程式碼 |
| `[文字](url)` | 連結；`http(s)://` 自動 `target="_blank"` |
| `- 項目` / `1. 項目` | 無序 / 有序列表 |
| `> 引用` | 區塊引用 |
| ` ```lang ` | 程式碼區塊（無語法高亮） |
| 表格、刪除線等 | GFM 擴充 |

不建議在 summary 使用 `# 大標題`（會降級渲染為較小標題，避免破壞頁面層級）；區塊標題已由頁面 `EXECUTIVE_SUMMARY` 提供。

## 樣式 variant

| variant | 用途 | 字級 |
|---------|------|------|
| `body` | 一般內文（bio、經歷說明） | `text-base` |
| `prose-lg` | 專案摘要等較大內文 | `text-lg` |
| `inline` | 時間軸 `>` 條列內的行內語法 | `text-base`（不包 `<p>`） |

修改全站 Markdown 外觀時，只需編輯 `lib/markdown-components.tsx`。

## 安全與未來維護

| 情境 | 建議 |
|------|------|
| 目前（`content/*.ts` 靜態資料） | 不需 HTML 消毒；不啟用 `rehype-raw` |
| 未來接入 CMS / 使用者輸入 | 加入 `rehype-sanitize` 白名單 |
| 程式碼區塊語法高亮 | 可選 `rehype-starry-night` 或 `MarkdownAsync` |
| 鎖定解析器版本 | 依賴寫在 `package.json`，升級後跑 `npm run check` |

修改 `lib/markdown*.ts(x)` 或元件對應表時，建議執行 `npm run check` 並手動預覽使用 Markdown 的頁面。

## 相關文件

- [projects/fields.md](./projects/fields.md) — `summary` 欄位與 UI 對照
- [content-model.md](./content-model.md) — 內容模組總覽
- [examples/full-project.ts](./examples/full-project.ts) — 含 Markdown 範例的專案範本
