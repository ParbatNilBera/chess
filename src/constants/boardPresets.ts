export interface BoardColorSet {
  id: string;
  name: string;
  lightSquare: string;
  darkSquare: string;
  highlight: string;
  lastMoveFrom: string;
  lastMoveTo: string;
  check: string;
  legal: string;
}

export const BOARD_PRESETS: BoardColorSet[] = [
  {
    id: "classic",
    name: "Classic Wood",
    lightSquare: "#f0d9b5",
    darkSquare: "#b58863",
    highlight: "rgba(255, 215, 0, 0.5)",
    lastMoveFrom: "rgba(205, 210, 106, 0.55)",
    lastMoveTo: "rgba(155, 199, 0, 0.7)",
    check: "rgba(255, 0, 0, 0.5)",
    legal: "rgba(20, 85, 30, 0.5)",
  },
  {
    id: "walnut",
    name: "Walnut",
    lightSquare: "#e8d4b8",
    darkSquare: "#785c3a",
    highlight: "rgba(255, 215, 0, 0.45)",
    lastMoveFrom: "rgba(205, 210, 106, 0.55)",
    lastMoveTo: "rgba(155, 199, 0, 0.65)",
    check: "rgba(255, 0, 0, 0.5)",
    legal: "rgba(20, 85, 30, 0.45)",
  },
  {
    id: "midnight",
    name: "Midnight",
    lightSquare: "#8ca2ad",
    darkSquare: "#4a5f6b",
    highlight: "rgba(147, 197, 253, 0.45)",
    lastMoveFrom: "rgba(125, 211, 252, 0.4)",
    lastMoveTo: "rgba(56, 189, 248, 0.55)",
    check: "rgba(248, 113, 113, 0.55)",
    legal: "rgba(34, 197, 94, 0.45)",
  },
  {
    id: "forest",
    name: "Forest",
    lightSquare: "#dce8d0",
    darkSquare: "#5a7d52",
    highlight: "rgba(255, 215, 0, 0.45)",
    lastMoveFrom: "rgba(190, 220, 140, 0.55)",
    lastMoveTo: "rgba(134, 179, 98, 0.7)",
    check: "rgba(255, 0, 0, 0.5)",
    legal: "rgba(20, 100, 40, 0.5)",
  },
  {
    id: "marble",
    name: "Marble",
    lightSquare: "#eeeed2",
    darkSquare: "#769656",
    highlight: "rgba(255, 215, 0, 0.5)",
    lastMoveFrom: "rgba(220, 225, 130, 0.6)",
    lastMoveTo: "rgba(170, 200, 90, 0.75)",
    check: "rgba(255, 0, 0, 0.45)",
    legal: "rgba(30, 90, 40, 0.45)",
  },
  {
    id: "royal",
    name: "Royal Gold",
    lightSquare: "#e8c99b",
    darkSquare: "#6b4423",
    highlight: "rgba(255, 215, 0, 0.55)",
    lastMoveFrom: "rgba(251, 191, 36, 0.35)",
    lastMoveTo: "rgba(217, 119, 6, 0.5)",
    check: "rgba(239, 68, 68, 0.55)",
    legal: "rgba(20, 85, 30, 0.5)",
  },
];

export const DEFAULT_BOARD_PRESET_ID = "classic";

export const getBoardPreset = (id: string): BoardColorSet =>
  BOARD_PRESETS.find((p) => p.id === id) ?? BOARD_PRESETS[0];
