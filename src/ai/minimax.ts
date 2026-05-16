import { Chess, type Move } from "chess.js";
import { evaluateBoard } from "./evaluateBoard";

const moveScore = (move: Move): number => {
  let score = 0;
  if (move.captured) {
    score += 10;
  }
  if (move.san.includes("+")) {
    score += 5;
  }
  if (move.san.includes("#")) {
    score += 100;
  }
  return score;
};

const orderMoves = (moves: Move[]): Move[] =>
  [...moves].sort((a, b) => moveScore(b) - moveScore(a));

export const minimax = (
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean
): number => {
  if (depth === 0 || game.isGameOver()) {
    return evaluateBoard(game);
  }

  const moves = orderMoves(game.moves({ verbose: true }));

  if (maximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      game.move(move);
      const evaluation = minimax(game, depth - 1, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  }

  let minEval = Infinity;
  for (const move of moves) {
    game.move(move);
    const evaluation = minimax(game, depth - 1, alpha, beta, true);
    game.undo();
    minEval = Math.min(minEval, evaluation);
    beta = Math.min(beta, evaluation);
    if (beta <= alpha) break;
  }
  return minEval;
};
