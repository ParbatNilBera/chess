import { Link, useLocation } from "react-router-dom";
import { IoMoon, IoSunny, IoHome, IoChevronBack } from "react-icons/io5";
import { GiChessKing } from "react-icons/gi";
import { useSettings } from "../../context/SettingsContext";
import { APP_TITLE } from "../../constants/branding";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  backTo?: string;
}

export const TopBar = ({
  title = APP_TITLE,
  showBack = false,
  backTo = "/",
}: TopBarProps) => {
  const { theme, toggleTheme, isDark } = useSettings();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header
      className="
        sticky top-0 z-50 shrink-0
        h-14 px-3 sm:px-4
        flex items-center justify-between gap-2
        border-b border-stone-800/60
        bg-stone-950/90 dark:bg-stone-950/90
        backdrop-blur-md
        supports-[backdrop-filter]:bg-stone-950/75
      "
      data-theme={theme}
    >
      <div className="flex items-center gap-2 min-w-0">
        {(showBack || !isHome) && (
          <Link
            to={backTo}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800/80 transition-colors shrink-0"
            aria-label="Go back"
          >
            <IoChevronBack className="w-5 h-5" />
          </Link>
        )}
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-amber-900/40 border border-amber-700/30 flex items-center justify-center shrink-0">
            <GiChessKing className="w-4 h-4 text-amber-500" />
          </div>
          <span className="font-semibold text-stone-100 truncate text-sm sm:text-base">
            {title}
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {!isHome && (
          <Link
            to="/"
            className="p-2 rounded-lg text-stone-400 hover:text-amber-400 hover:bg-stone-800/80 transition-colors"
            aria-label="Home"
          >
            <IoHome className="w-5 h-5" />
          </Link>
        )}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-lg text-stone-400 hover:text-amber-400 hover:bg-stone-800/80 border border-transparent hover:border-stone-700 transition-all"
          aria-label="Toggle app theme"
        >
          {isDark ? (
            <IoSunny className="w-5 h-5" />
          ) : (
            <IoMoon className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
};
