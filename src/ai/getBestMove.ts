import { Chess, type Move } from "chess.js";
import type { AIMove, Difficulty } from "../types";
import { getDifficultyConfig } from "../constants/difficulties";
import { minimax } from "./minimax";

interface ScoredMove {
  move: Move;
  score: number;
}

const pickEasyMove = (scoredMoves: ScoredMove[]): Move => {
  if (scoredMoves.length === 0) {
    throw new Error("No legal moves available");
  }

  const bestScore = scoredMoves[0].score;
  const threshold = 120;
  const competitive = scoredMoves.filter(
    (m) => Math.abs(m.score - bestScore) <= threshold
  );

  if (Math.random() < 0.35 && competitive.length > 1) {
    const suboptimal = competitive.slice(1);
    return suboptimal[Math.floor(Math.random() * suboptimal.length)].move;
  }

  return scoredMoves[0].move;
};

export const getBestMove = (
  fen: string,
  difficulty: Difficulty
): AIMove | null => {
  const game = new Chess(fen);
  if (game.isGameOver()) return null;

  const { depth } = getDifficultyConfig(difficulty);
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;

  const isMaximizing = game.turn() === "w";
  const scoredMoves: ScoredMove[] = [];

  for (const move of moves) {
    game.move(move);
    const score = minimax(
      game,
      depth - 1,
      -Infinity,
      Infinity,
      !isMaximizing
    );
    game.undo();
    scoredMoves.push({ move, score });
  }

  scoredMoves.sort((a, b) =>
    isMaximizing ? b.score - a.score : a.score - b.score
  );

  const selected =
    difficulty === "easy"
      ? pickEasyMove(scoredMoves)
      : scoredMoves[0].move;

  return {
    from: selected.from,
    to: selected.to,
    promotion: selected.promotion as AIMove["promotion"],
  };
};
