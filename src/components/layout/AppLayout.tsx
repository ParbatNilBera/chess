import { Outlet } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";

export const AppLayout = () => {
  const { isDark } = useSettings();

  return (
    <div
      className={`min-h-[100dvh] flex flex-col transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 text-stone-100"
          : "bg-gradient-to-br from-stone-100 via-stone-50 to-stone-200 text-stone-900"
      }`}
    >
      <Outlet />
    </div>
  );
};
