import type { Square } from "chess.js";

export type Difficulty = "easy" | "medium" | "hard";

export type GameMode = "ai" | "local";

export type ThemeMode = "dark" | "light";

export type AppScreen = "welcome" | "game" | "tutorial";

export type GameStatus =
  | "playing"
  | "check"
  | "checkmate"
  | "stalemate"
  | "draw";

export type PlayerColor = "w" | "b";

export interface GameSettings {
  difficulty: Difficulty;
}

export interface MoveRecord {
  san: string;
  color: PlayerColor;
  from: Square;
  to: Square;
  captured?: string;
  capturedColor?: PlayerColor;
  isCheck: boolean;
  isCheckmate: boolean;
}

export interface CapturedPiecesState {
  byWhite: string[];
  byBlack: string[];
}

export interface PromotionMove {
  from: Square;
  to: Square;
}

export interface AIMove {
  from: Square;
  to: Square;
  promotion?: "q" | "r" | "b" | "n";
}

export interface GameResult {
  winner: PlayerColor | "draw" | null;
  reason: string;
}
