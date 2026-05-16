import type { PieceSymbol } from "chess.js";

export const PIECE_VALUES: Record<PieceSymbol, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

export const getPieceValue = (piece: PieceSymbol): number =>
  PIECE_VALUES[piece];
