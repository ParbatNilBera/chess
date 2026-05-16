import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
}

const variants = {
  default: "bg-stone-700/80 text-stone-200",
  success: "bg-emerald-900/60 text-emerald-300 border-emerald-800",
  warning: "bg-amber-900/60 text-amber-300 border-amber-800",
  danger: "bg-red-900/60 text-red-300 border-red-800",
};

export const Badge = ({ children, variant = "default" }: BadgeProps) => (
  <span
    className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
      ${variants[variant]}
    `}
  >
    {children}
  </span>
);
