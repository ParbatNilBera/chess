import { Chess, type Square } from "chess.js";
import type { GameMode, GameStatus, PlayerColor } from "../types";

const PIECE_UNICODE: Record<string, string> = {
  wp: "♙",
  wn: "♘",
  wb: "♗",
  wr: "♖",
  wq: "♕",
  wk: "♔",
  bp: "♟",
  bn: "♞",
  bb: "♝",
  br: "♜",
  bq: "♛",
  bk: "♚",
};

export const getPieceSymbol = (color: PlayerColor, type: string): string =>
  PIECE_UNICODE[`${color}${type}`] ?? "?";

export const getGameStatus = (game: Chess): GameStatus => {
  if (game.isCheckmate()) return "checkmate";
  if (game.isStalemate()) return "stalemate";
  if (game.isDraw()) return "draw";
  if (game.isCheck()) return "check";
  return "playing";
};

export const getStatusMessage = (
  status: GameStatus,
  turn: PlayerColor,
  isAiThinking: boolean,
  gameMode: GameMode
): string => {
  if (gameMode === "ai" && isAiThinking) return "AI is thinking....";

  if (gameMode === "local") {
    switch (status) {
      case "checkmate":
        return turn === "w"
          ? "Checkmate! Black wins."
          : "Checkmate! White wins.";
      case "stalemate":
        return "Stalemate — it's a draw.";
      case "draw":
        return "Draw game.";
      case "check":
        return turn === "w" ? "White is in check!" : "Black is in check!";
      default:
        return turn === "w" ? "White to move" : "Black to move";
    }
  }

  switch (status) {
    case "checkmate":
      return turn === "w"
        ? "Checkmate! Black wins."
        : "Checkmate! You win!";
    case "stalemate":
      return "Stalemate — it's a draw.";
    case "draw":
      return "Draw game.";
    case "check":
      return "You're in check!";
    default:
      return turn === "w" ? "Your move" : "AI is thinking....";
  }
};

export const getLegalMoveSquares = (
  game: Chess,
  square: Square
): Square[] => {
  return game.moves({ square, verbose: true }).map((m) => m.to);
};

export const isPromotionMove = (
  game: Chess,
  from: Square,
  to: Square
): boolean => {
  const piece = game.get(from);
  if (!piece || piece.type !== "p") return false;
  const targetRank = to[1];
  return (
    (piece.color === "w" && targetRank === "8") ||
    (piece.color === "b" && targetRank === "1")
  );
};

export const cloneGame = (fen: string): Chess => new Chess(fen);
