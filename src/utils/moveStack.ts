import type { Move } from "chess.js";
import type { CapturedPiecesState, GameMode, MoveRecord } from "../types";
import { getPieceSymbol } from "./chessHelpers";

export const createMoveRecord = (move: Move, isCheck: boolean): MoveRecord => ({
  san: move.san,
  color: move.color,
  from: move.from,
  to: move.to,
  captured: move.captured,
  capturedColor: move.captured
    ? move.color === "w"
      ? "b"
      : "w"
    : undefined,
  isCheck,
  isCheckmate: move.san.includes("#"),
});

export const deriveCapturedPieces = (
  moves: MoveRecord[]
): CapturedPiecesState => {
  const byWhite: string[] = [];
  const byBlack: string[] = [];

  for (const m of moves) {
    if (!m.captured || !m.capturedColor) continue;
    const symbol = getPieceSymbol(m.capturedColor, m.captured);
    if (m.color === "w") {
      byWhite.push(symbol);
    } else {
      byBlack.push(symbol);
    }
  }

  return { byWhite, byBlack };
};

export const getUndoPopCount = (
  moves: MoveRecord[],
  gameMode: GameMode
): number => {
  if (moves.length === 0) return 0;
  if (gameMode === "local") return 1;

  const last = moves[moves.length - 1];
  if (last.color === "b") {
    return Math.min(2, moves.length);
  }
  return 1;
};

export const getLastMoveHighlight = (
  moves: MoveRecord[]
): { from: MoveRecord["from"]; to: MoveRecord["to"] } | null => {
  if (moves.length === 0) return null;
  const last = moves[moves.length - 1];
  return { from: last.from, to: last.to };
};
