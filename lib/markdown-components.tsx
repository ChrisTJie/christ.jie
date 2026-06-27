import type { Components } from "react-markdown";
import {
  cn,
  isExternalHref,
  markdownVariantTextClass,
  type MarkdownVariant,
} from "@/lib/markdown";

type CreateMarkdownComponentsOptions = {
  variant?: MarkdownVariant;
};

/**
 * 主題化 Markdown 元素對應表。
 * 集中管理樣式，供 MarkdownContent / 未來 CMS 內容共用。
 */
export function createMarkdownComponents(
  options: CreateMarkdownComponentsOptions = {},
): Components {
  const variant = options.variant ?? "body";
  const textSize = markdownVariantTextClass[variant];
  const isInline = variant === "inline";

  return {
    p({ children }) {
      if (isInline) {
        return <>{children}</>;
      }
      return (
        <p
          className={cn(
            textSize,
            "text-on-surface-variant leading-relaxed mb-4 last:mb-0",
          )}
        >
          {children}
        </p>
      );
    },
    strong({ children }) {
      return (
        <strong className="font-semibold text-pure-white">{children}</strong>
      );
    },
    em({ children }) {
      return <em className="italic text-on-surface">{children}</em>;
    },
    a({ href, children }) {
      const external = isExternalHref(href);
      return (
        <a
          href={href}
          className="text-primary-container underline decoration-primary-container/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary/60"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
    ul({ children }) {
      return (
        <ul
          className={cn(
            textSize,
            "list-disc pl-6 text-on-surface-variant space-y-2 mb-4 last:mb-0",
          )}
        >
          {children}
        </ul>
      );
    },
    ol({ children }) {
      return (
        <ol
          className={cn(
            textSize,
            "list-decimal pl-6 text-on-surface-variant space-y-2 mb-4 last:mb-0",
          )}
        >
          {children}
        </ol>
      );
    },
    li({ children }) {
      return <li className="leading-relaxed">{children}</li>;
    },
    blockquote({ children }) {
      return (
        <blockquote
          className={cn(
            textSize,
            "border-l-2 border-primary-container/40 pl-4 text-on-surface-variant/90 italic mb-4 last:mb-0",
          )}
        >
          {children}
        </blockquote>
      );
    },
    hr() {
      return <hr className="my-6 border-tertiary/20" />;
    },
    h1({ children }) {
      return (
        <h3
          className={cn(
            textSize,
            "text-xl font-semibold text-pure-white mb-3 last:mb-0",
          )}
        >
          {children}
        </h3>
      );
    },
    h2({ children }) {
      return (
        <h3
          className={cn(
            textSize,
            "text-lg font-semibold text-pure-white mb-3 last:mb-0",
          )}
        >
          {children}
        </h3>
      );
    },
    h3({ children }) {
      return (
        <h4
          className={cn(
            textSize,
            "text-base font-semibold text-pure-white mb-2 last:mb-0",
          )}
        >
          {children}
        </h4>
      );
    },
    h4({ children }) {
      return (
        <h4
          className={cn(
            textSize,
            "text-sm font-semibold text-pure-white mb-2 last:mb-0",
          )}
        >
          {children}
        </h4>
      );
    },
    code({ className, children }) {
      const isBlock = Boolean(className?.includes("language-"));
      if (isBlock) {
        return (
          <code className={cn("font-mono text-[0.9em]", className)}>
            {children}
          </code>
        );
      }
      return (
        <code className="font-mono text-[0.9em] text-primary-container bg-surface-container-high px-1.5 py-0.5 rounded-sm">
          {children}
        </code>
      );
    },
    pre({ children }) {
      return (
        <pre className="font-mono text-sm text-on-surface bg-surface-container-high border border-tertiary/20 rounded-sm p-4 overflow-x-auto mb-4 last:mb-0">
          {children}
        </pre>
      );
    },
    table({ children }) {
      return (
        <div className="mb-4 last:mb-0 overflow-x-auto">
          <table className="w-full text-left text-sm text-on-surface-variant border-collapse">
            {children}
          </table>
        </div>
      );
    },
    thead({ children }) {
      return <thead className="border-b border-tertiary/30">{children}</thead>;
    },
    th({ children }) {
      return (
        <th className="px-3 py-2 font-mono text-[12px] font-medium tracking-wider text-tertiary uppercase">
          {children}
        </th>
      );
    },
    td({ children }) {
      return <td className="px-3 py-2 border-t border-tertiary/10">{children}</td>;
    },
    del({ children }) {
      return (
        <del className="text-on-surface-variant/60 line-through">{children}</del>
      );
    },
  };
}
