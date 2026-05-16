import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_BOARD_PRESET_ID,
  getBoardPreset,
  type BoardColorSet,
} from "../constants/boardPresets";
import { THEME_STORAGE_KEY } from "../constants/theme";
import type { Difficulty, GameMode, ThemeMode } from "../types";

const BOARD_PRESET_KEY = "chess-board-preset";
const GAME_MODE_KEY = "chess-game-mode";
const DIFFICULTY_KEY = "chess-difficulty";

interface SettingsContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  isDark: boolean;
  boardPresetId: string;
  boardColors: BoardColorSet;
  setBoardPresetId: (id: string) => void;
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

const readStorage = <T,>(key: string, fallback: T, parse: (v: string) => T): T => {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return parse(raw);
  } catch {
    return fallback;
  }
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>(() =>
    readStorage(THEME_STORAGE_KEY, "dark", (v) => (v === "light" ? "light" : "dark"))
  );
  const [boardPresetId, setBoardPresetIdState] = useState(() =>
    readStorage(BOARD_PRESET_KEY, DEFAULT_BOARD_PRESET_ID, (v) => v)
  );
  const [gameMode, setGameModeState] = useState<GameMode>(() =>
    readStorage(GAME_MODE_KEY, "ai", (v) => (v === "local" ? "local" : "ai"))
  );
  const [difficulty, setDifficultyState] = useState<Difficulty>(() =>
    readStorage(DIFFICULTY_KEY, "medium", (v) =>
      v === "easy" || v === "hard" ? v : "medium"
    )
  );

  const boardColors = useMemo(
    () => getBoardPreset(boardPresetId),
    [boardPresetId]
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setBoardPresetId = useCallback((id: string) => {
    setBoardPresetIdState(id);
    localStorage.setItem(BOARD_PRESET_KEY, id);
  }, []);

  const setGameMode = useCallback((mode: GameMode) => {
    setGameModeState(mode);
    localStorage.setItem(GAME_MODE_KEY, mode);
  }, []);

  const setDifficulty = useCallback((d: Difficulty) => {
    setDifficultyState(d);
    localStorage.setItem(DIFFICULTY_KEY, d);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      isDark: theme === "dark",
      boardPresetId,
      boardColors,
      setBoardPresetId,
      gameMode,
      setGameMode,
      difficulty,
      setDifficulty,
    }),
    [
      theme,
      toggleTheme,
      boardPresetId,
      boardColors,
      setBoardPresetId,
      gameMode,
      setGameMode,
      difficulty,
      setDifficulty,
    ]
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextValue => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return ctx;
};
