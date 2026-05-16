import { useSettings } from "../context/SettingsContext";

/** @deprecated Use useSettings() instead */
export const useTheme = () => {
  const { theme, toggleTheme, isDark } = useSettings();
  return { theme, toggleTheme, isDark };
};
