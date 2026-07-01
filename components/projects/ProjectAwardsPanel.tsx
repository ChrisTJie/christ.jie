import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { resolveAssetSrc } from "@/lib/assets";
import type { ProjectAwardItem } from "@/lib/types";

type ProjectAwardsPanelProps = {
  awards: ProjectAwardItem[];
};

export function ProjectAwardsPanel({ awards }: ProjectAwardsPanelProps) {
  if (awards.length === 0) return null;

  return (
    <div className="bg-surface-container-low border border-tertiary/10 p-6">
      <h3 className="font-mono text-[12px] font-medium tracking-widest text-tertiary mb-6 flex items-center gap-2">
        <MaterialIcon name="emoji_events" className="text-[18px]" />
        AWARDS
      </h3>
      <div className="flex flex-col gap-6">
        {awards.map((award, index) => (
          <article
            key={`award-${index}-${award.image?.src ?? award.title ?? "item"}`}
            className={
              index > 0 ? "pt-6 border-t border-tertiary/10" : undefined
            }
          >
            {award.image && (
              <div className="mb-4 overflow-hidden border border-tertiary/10 bg-surface-container-high">
                <Image
                  src={resolveAssetSrc(award.image.src)}
                  alt={award.image.alt}
                  width={480}
                  height={240}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
            {award.title && (
              <p className="text-base font-semibold text-pure-white mb-2">
                {award.title}
              </p>
            )}
            {award.text && (
              <MarkdownContent variant="body" className="text-sm text-on-surface-variant">
                {award.text}
              </MarkdownContent>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
