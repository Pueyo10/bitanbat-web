import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-heading text-center transition-all duration-300";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-primary font-semibold hover:bg-white hover:scale-105",
  secondary:
    "border border-white/30 text-white font-medium hover:bg-white/10 hover:border-white/50",
};

const sizes: Record<Size, string> = {
  md: "min-h-[44px] px-8 py-3 text-base",
  lg: "min-h-[48px] px-10 py-4 text-lg",
};

export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "lg",
  className?: string
) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps {
  href?: string;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  href,
  external,
  variant = "primary",
  size = "lg",
  className,
  children,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const classes = buttonClasses(variant, size, className);

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link
        href={href as ComponentProps<typeof Link>["href"]}
        className={classes}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
