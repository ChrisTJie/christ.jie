"use client";

import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { TransitionLink } from "@/components/ui/TransitionLink";

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
    "group inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-[13px] font-medium uppercase tracking-wider rounded-none transition-all duration-200 ease-out motion-safe:active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container/60";
  const variants = {
    primary:
      "bg-primary-container text-on-primary hover:bg-primary hover:shadow-[0_0_20px_rgba(0,245,255,0.25)]",
    secondary:
      "border border-tertiary/20 text-tertiary hover:border-tertiary hover:bg-tertiary/10 hover:shadow-[0_0_16px_rgba(0,245,255,0.12)]",
  };
  const iconClass =
    "text-[18px] motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5";
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const isInternal = href.startsWith("/") && !href.startsWith("//");

    if (isInternal) {
      return (
        <TransitionLink href={href} className={classes}>
          {children}
          {icon && <MaterialIcon name={icon} className={iconClass} />}
        </TransitionLink>
      );
    }

    return (
      <a href={href} className={classes}>
        {children}
        {icon && <MaterialIcon name={icon} className={iconClass} />}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
      {icon && <MaterialIcon name={icon} className={iconClass} />}
    </button>
  );
}
