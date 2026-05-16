import { Chess, type Color, type PieceSymbol, type Square } from "chess.js";
import { getPieceValue } from "./pieceValues";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;

const PAWN_TABLE: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5, 5, 10, 25, 25, 10, 5, 5],
  [0, 0, 0, 20, 20, 0, 0, 0],
  [5, -5, -10, 0, 0, -10, -5, 5],
  [5, 10, 10, -20, -20, 10, 10, 5],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const KNIGHT_TABLE: number[][] = [
  [-50, -40, -30, -30, -30, -30, -40, -50],
  [-40, -20, 0, 0, 0, 0, -20, -40],
  [-30, 0, 10, 15, 15, 10, 0, -30],
  [-30, 5, 15, 20, 20, 15, 5, -30],
  [-30, 0, 15, 20, 20, 15, 0, -30],
  [-30, 5, 10, 15, 15, 10, 5, -30],
  [-40, -20, 0, 5, 5, 0, -20, -40],
  [-50, -40, -30, -30, -30, -30, -40, -50],
];

const BISHOP_TABLE: number[][] = [
  [-20, -10, -10, -10, -10, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 10, 10, 5, 0, -10],
  [-10, 5, 5, 10, 10, 5, 5, -10],
  [-10, 0, 10, 10, 10, 10, 0, -10],
  [-10, 10, 10, 10, 10, 10, 10, -10],
  [-10, 5, 0, 0, 0, 0, 5, -10],
  [-20, -10, -10, -10, -10, -10, -10, -20],
];

const ROOK_TABLE: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [5, 10, 10, 10, 10, 10, 10, 5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [0, 0, 0, 5, 5, 0, 0, 0],
];

const QUEEN_TABLE: number[][] = [
  [-20, -10, -10, -5, -5, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 5, 5, 5, 0, -10],
  [-5, 0, 5, 5, 5, 5, 0, -5],
  [0, 0, 5, 5, 5, 5, 0, -5],
  [-10, 5, 5, 5, 5, 5, 0, -10],
  [-10, 0, 5, 0, 0, 0, 0, -10],
  [-20, -10, -10, -5, -5, -10, -10, -20],
];

const KING_MIDDLEGAME_TABLE: number[][] = [
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-20, -30, -30, -40, -40, -30, -30, -20],
  [-10, -20, -20, -20, -20, -20, -20, -10],
  [20, 20, 0, 0, 0, 0, 20, 20],
  [20, 30, 10, 0, 0, 10, 30, 20],
];

const POSITION_TABLES: Record<PieceSymbol, number[][]> = {
  p: PAWN_TABLE,
  n: KNIGHT_TABLE,
  b: BISHOP_TABLE,
  r: ROOK_TABLE,
  q: QUEEN_TABLE,
  k: KING_MIDDLEGAME_TABLE,
};

const squareToCoords = (square: Square): { file: number; rank: number } => {
  const file = FILES.indexOf(square[0] as (typeof FILES)[number]);
  const rank = parseInt(square[1], 10) - 1;
  return { file, rank };
};

const getPositionalBonus = (
  piece: PieceSymbol,
  square: Square,
  color: Color
): number => {
  const { file, rank } = squareToCoords(square);
  const table = POSITION_TABLES[piece];
  const tableRank = color === "w" ? 7 - rank : rank;
  return table[tableRank][file];
};

const evaluateMobility = (game: Chess): number => {
  const mobility = game.moves().length;
  return game.turn() === "w" ? mobility * 3 : -mobility * 3;
};

const evaluateCenterControl = (game: Chess): number => {
  const centerSquares: Square[] = ["d4", "d5", "e4", "e5"];
  let score = 0;
  const board = game.board();

  for (const sq of centerSquares) {
    const { file, rank } = squareToCoords(sq);
    const piece = board[7 - rank][file];
    if (piece) {
      const value = piece.type === "p" ? 15 : 8;
      score += piece.color === "w" ? value : -value;
    }
  }
  return score;
};

export const evaluateBoard = (game: Chess): number => {
  if (game.isCheckmate()) {
    return game.turn() === "w" ? -100000 : 100000;
  }
  if (game.isStalemate() || game.isDraw()) {
    return 0;
  }

  let score = 0;
  const board = game.board();

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const piece = board[rank][file];
      if (!piece) continue;

      const square = `${FILES[file]}${8 - rank}` as Square;
      const material = getPieceValue(piece.type);
      const positional = getPositionalBonus(piece.type, square, piece.color);
      const pieceScore = material + positional;

      score += piece.color === "w" ? pieceScore : -pieceScore;
    }
  }

  score += evaluateMobility(game);
  score += evaluateCenterControl(game);

  if (game.isCheck()) {
    score += game.turn() === "w" ? -50 : 50;
  }

  return score;
};
