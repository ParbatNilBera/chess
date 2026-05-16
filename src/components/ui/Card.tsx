import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export const Card = ({ children, className = "", title }: CardProps) => (
  <div
    className={`rounded-2xl border border-stone-700/60 bg-stone-900/70 backdrop-blur-sm shadow-xl shadow-black/20 ${className}`}
  >
    {title && (
      <div className="px-4 py-3 border-b border-stone-700/50">
        <h3 className="text-sm font-semibold text-stone-300 uppercase tracking-wider">
          {title}
        </h3>
      </div>
    )}
    {children}
  </div>
);
