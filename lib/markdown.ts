import remarkGfm from "remark-gfm";

/** 站內 Markdown 共用的 remark 外掛（GFM：表格、刪除線、任務列表等） */
export const markdownRemarkPlugins = [remarkGfm];

export type MarkdownVariant = "body" | "prose-lg" | "inline";

export const markdownVariantTextClass: Record<MarkdownVariant, string> = {
  body: "text-base",
  "prose-lg": "text-lg",
  inline: "text-base",
};

/** 判斷是否為外部連結（http/https 或 protocol-relative） */
export function isExternalHref(href: string | undefined): boolean {
  if (!href) return false;
  return /^https?:\/\//i.test(href) || href.startsWith("//");
}

/** 為 `string[]` Markdown 區塊產生穩定 React key */
export function markdownBlockKey(index: number, content: string): string {
  const fingerprint = content.trim().slice(0, 48).replace(/\s+/g, "_");
  return `md-block-${index}-${fingerprint}`;
}

export function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}
