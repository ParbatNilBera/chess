import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: ReactNode;
}

const variantClasses = {
  primary:
    "bg-amber-700 hover:bg-amber-600 text-white shadow-lg shadow-amber-900/30",
  secondary:
    "bg-stone-700 hover:bg-stone-600 text-stone-100 border border-stone-600",
  ghost:
    "bg-transparent hover:bg-stone-800/80 text-stone-300 border border-stone-700",
  danger:
    "bg-red-900/80 hover:bg-red-800 text-red-100 border border-red-800",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
};

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  icon,
  className = "",
  disabled,
  ...props
}: ButtonProps) => (
  <button
    type="button"
    disabled={disabled}
    className={`
      inline-flex items-center justify-center font-medium rounded-xl
      transition-all duration-200 ease-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60
      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
      active:scale-[0.98]
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${className}
    `}
    {...props}
  >
    {icon}
    {children}
  </button>
);
