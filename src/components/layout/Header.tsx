import { GiChessKnight } from "react-icons/gi";
import { APP_TITLE, APP_TAGLINE } from "../../constants/branding";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header = ({
  title = APP_TITLE,
  subtitle = APP_TAGLINE,
}: HeaderProps) => (
  <header className="text-center mb-8 animate-fade-in">
    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-900/40 border border-amber-700/30 mb-4">
      <GiChessKnight className="w-8 h-8 text-amber-500" />
    </div>
    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-100">
      {title}
    </h1>
    {subtitle && (
      <p className="mt-2 text-stone-400 text-sm sm:text-base">{subtitle}</p>
    )}
  </header>
);
