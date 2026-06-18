import { MaterialIcon } from "@/components/ui/MaterialIcon";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  icon?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({
  children,
  href,
  variant = "primary",
  icon,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-[13px] font-medium uppercase tracking-wider transition-colors rounded-none";
  const variants = {
    primary:
      "bg-primary-container text-on-primary hover:bg-primary",
    secondary:
      "border border-tertiary/20 text-tertiary hover:border-tertiary hover:bg-tertiary/10",
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
        {icon && <MaterialIcon name={icon} className="text-[18px]" />}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
      {icon && <MaterialIcon name={icon} className="text-[18px]" />}
    </button>
  );
}
