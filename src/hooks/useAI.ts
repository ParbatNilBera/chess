import { useCallback, useRef } from "react";
import { getBestMove } from "../ai/getBestMove";
import { getDifficultyConfig } from "../constants/difficulties";
import type { AIMove, Difficulty } from "../types";

export const useAI = () => {
  const abortRef = useRef(false);

  const cancelAI = useCallback(() => {
    abortRef.current = true;
  }, []);

  const computeMove = useCallback(
  async (fen: string, difficulty: Difficulty): Promise<AIMove | null> => {
    abortRef.current = false;
    const { thinkingDelayMs } = getDifficultyConfig(difficulty);

    await new Promise<void>((resolve) => {
      setTimeout(resolve, thinkingDelayMs);
    });

    if (abortRef.current) return null;

    return new Promise<AIMove | null>((resolve) => {
      setTimeout(() => {
        if (abortRef.current) {
          resolve(null);
          return;
        }
        try {
          const move = getBestMove(fen, difficulty);
          resolve(move);
        } catch {
          resolve(null);
        }
      }, 0);
    });
  },
  []);

  return { computeMove, cancelAI };
};
