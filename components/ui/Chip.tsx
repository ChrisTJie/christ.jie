type ChipProps = {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
};

export function Chip({ children, active, className = "" }: ChipProps) {
  return (
    <span
      className={`inline-block px-2 py-1 font-mono text-[13px] font-medium tracking-wider uppercase border rounded-sm transition-all duration-200 ${active
        ? "text-primary-container border-primary-container/30 bg-primary-container/10"
        : "text-tertiary border-tertiary/30 bg-surface/50 hover:border-primary-container/50 hover:bg-primary-container/5"
        } ${className}`}
    >
      {children}
    </span>
  );
}
