import Markdown from "react-markdown";
import { createMarkdownComponents } from "@/lib/markdown-components";
import { markdownRemarkPlugins, type MarkdownVariant } from "@/lib/markdown";

type MarkdownContentProps = {
  children: string;
  variant?: MarkdownVariant;
  className?: string;
};

/**
 * 渲染單一 Markdown 字串（Server Component 友善）。
 * 樣式與外掛集中於 `lib/markdown.ts`。
 */
export function MarkdownContent({
  children,
  variant = "body",
  className = "",
}: MarkdownContentProps) {
  return (
    <div className={className}>
      <Markdown
        remarkPlugins={markdownRemarkPlugins}
        components={createMarkdownComponents({ variant })}
      >
        {children}
      </Markdown>
    </div>
  );
}
