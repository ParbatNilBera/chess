import type { ReactNode } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useTheme } from "../../hooks/useTheme";

interface AppLayoutProps {
  children: ReactNode;
  showThemeToggle?: boolean;
}

export const AppLayout = ({
  children,
  showThemeToggle = true,
}: AppLayoutProps) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 text-stone-100"
          : "bg-gradient-to-br from-stone-100 via-stone-50 to-stone-200 text-stone-900"
      }`}
      data-theme={theme}
    >
      {showThemeToggle && (
        <button
          type="button"
          onClick={toggleTheme}
          className="
            fixed top-4 right-4 z-40 p-2.5 rounded-xl
            bg-stone-800/80 hover:bg-stone-700 border border-stone-600/50
            text-stone-300 hover:text-amber-400 transition-all duration-200
            shadow-lg backdrop-blur-sm
          "
          aria-label="Toggle theme"
        >
          {isDark ? (
            <IoSunny className="w-5 h-5" />
          ) : (
            <IoMoon className="w-5 h-5" />
          )}
        </button>
      )}
      <main className="relative">{children}</main>
    </div>
  );
};
