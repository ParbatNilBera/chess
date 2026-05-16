import { FaTrophy } from "react-icons/fa";
import { GiChessKing } from "react-icons/gi";
import type { GameMode, GameResult } from "../../types";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

interface GameResultModalProps {
  isOpen: boolean;
  result: GameResult | null;
  gameMode: GameMode;
  onRestart: () => void;
  onHome: () => void;
}

export const GameResultModal = ({
  isOpen,
  result,
  gameMode,
  onRestart,
  onHome,
}: GameResultModalProps) => {
  if (!result) return null;

  const isVsAI = gameMode === "ai";
  const isDraw = result.winner === "draw";
  const isPlayerWin = isVsAI && result.winner === "w";
  const isPositive = isDraw ? false : isVsAI ? isPlayerWin : true;

  const title = isDraw
    ? "Draw Game"
    : isVsAI
      ? isPlayerWin
        ? "Victory!"
        : "Defeat"
      : result.winner === "w"
        ? "White Wins!"
        : "Black Wins!";

  return (
    <Modal isOpen={isOpen} onClose={onHome} title={title}>
      <div className="flex flex-col items-center text-center gap-4">
        <div
          className={`
            w-16 h-16 rounded-full flex items-center justify-center
            ${
              isPositive
                ? "bg-amber-900/50 text-amber-400"
                : isDraw
                  ? "bg-stone-800 text-stone-400"
                  : "bg-red-900/50 text-red-400"
            }
          `}
        >
          {isPositive ? (
            <FaTrophy className="w-8 h-8" />
          ) : (
            <GiChessKing className="w-8 h-8" />
          )}
        </div>
        <p className="text-stone-300">{result.reason}</p>
        <div className="flex gap-3 w-full pt-2">
          <Button variant="primary" onClick={onRestart} className="flex-1">
            Play Again
          </Button>
          <Button variant="ghost" onClick={onHome} className="flex-1">
            Main Menu
          </Button>
        </div>
      </div>
    </Modal>
  );
};
