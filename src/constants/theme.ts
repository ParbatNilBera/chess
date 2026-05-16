export const THEME_STORAGE_KEY = "chess-theme";

export const BOARD_THEMES = {
  dark: {
    lightSquare: "#b58863",
    darkSquare: "#785c3a",
    highlight: "rgba(255, 215, 0, 0.45)",
    lastMoveFrom: "rgba(205, 210, 106, 0.55)",
    lastMoveTo: "rgba(155, 199, 0, 0.7)",
    check: "rgba(255, 0, 0, 0.5)",
    legal: "rgba(20, 85, 30, 0.5)",
  },
  light: {
    lightSquare: "#f0d9b5",
    darkSquare: "#b58863",
    highlight: "rgba(255, 215, 0, 0.5)",
    lastMoveFrom: "rgba(205, 210, 106, 0.5)",
    lastMoveTo: "rgba(155, 199, 0, 0.65)",
    check: "rgba(255, 0, 0, 0.45)",
    legal: "rgba(20, 120, 50, 0.4)",
  },
} as const;
