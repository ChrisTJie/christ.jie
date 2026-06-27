import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { markdownBlockKey, type MarkdownVariant } from "@/lib/markdown";

type MarkdownBlocksProps = {
  blocks: string[];
  variant?: MarkdownVariant;
  className?: string;
  blockClassName?: string;
};

/**
 * 將 `string[]` 渲染為多個 Markdown 區塊。
 * 適用於 `ProjectItem.summary`、`Profile.bio` 等段落陣列欄位。
 */
export function MarkdownBlocks({
  blocks,
  variant = "body",
  className = "",
  blockClassName = "mb-6 last:mb-0",
}: MarkdownBlocksProps) {
  return (
    <div className={className}>
      {blocks.map((block, index) => (
        <MarkdownContent
          key={markdownBlockKey(index, block)}
          variant={variant}
          className={blockClassName}
        >
          {block}
        </MarkdownContent>
      ))}
    </div>
  );
}
