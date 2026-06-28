import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export function Card({ active, className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`glass rounded-xl p-5 transition-colors duration-200 ${
        active ? "border-accent/40" : "hover:border-white/[0.12]"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
