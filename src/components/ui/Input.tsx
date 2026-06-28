import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full bg-white/5 border rounded-lg px-3 py-1.5 text-sm font-mono text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-accent/40 transition-colors ${
        error ? "border-red-500/50" : "border-white/[0.08] focus:border-accent/40"
      } ${className}`}
      {...props}
    />
  )
);

Input.displayName = "Input";
