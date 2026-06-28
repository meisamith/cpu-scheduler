import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none";

    const variants = {
      primary:
        "rounded-full border border-accent text-accent bg-transparent hover:bg-accent hover:text-[#0B0B0F]",
      ghost:
        "rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10",
      danger:
        "rounded text-gray-600 hover:text-gray-400 bg-transparent border-0",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2 text-sm gap-2",
      lg: "px-8 py-3 text-sm gap-2",
    };

    return (
      <button ref={ref} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
