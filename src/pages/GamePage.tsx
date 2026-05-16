import { useCallback, useEffect, useRef, useState } from "react";
import type { Square } from "chess.js";
import { useChessGame } from "../hooks/useChessGame";
import { useAI } from "../hooks/useAI";
import { useTheme } from "../hooks/useTheme";
import type { Difficulty, GameMode } from "../types";
import { ChessBoard } from "../components/chess/ChessBoard";
import { GameSidebar } from "../components/chess/GameSidebar";
import { PromotionDialog } from "../components/chess/PromotionDialog";
import { GameResultModal } from "../components/chess/GameResultModal";
import { Footer } from "../components/layout/Footer";

interface GamePageProps {
  difficulty: Difficulty;
  gameMode: GameMode;
  onHome: () => void;
}

export const GamePage = ({ difficulty, gameMode, onHome }: GamePageProps) => {
  const isVsAI = gameMode === "ai";
  const { theme } = useTheme();
  const { computeMove, cancelAI } = useAI();
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [boardWidth, setBoardWidth] = useState(400);
  const aiTriggeredRef = useRef(false);
  const chessRef = useRef<ReturnType<typeof useChessGame> | null>(null);

  const chess = useChessGame(difficulty, gameMode);
  chessRef.current = chess;

  const getCheckSquare = (): Square | null => {
    if (chess.status !== "check" && chess.status !== "checkmate") return null;
    const board = chess.game.board();
    const turn = chess.turn;
    const files = "abcdefgh";
    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const piece = board[r][f];
        if (piece?.type === "k" && piece.color === turn) {
          return `${files[f]}${8 - r}` as Square;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    const updateWidth = () => {
      if (boardContainerRef.current) {
        const width = boardContainerRef.current.offsetWidth;
        setBoardWidth(Math.min(width, 560));
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const triggerAI = useCallback(async () => {
    if (!isVsAI) return;

    const state = chessRef.current;
    if (!state || state.isGameOver || state.isAiThinking || state.turn !== "b") {
      return;
    }

    state.setThinking(true);
    const move = await computeMove(state.fen, difficulty);

    const latest = chessRef.current;
    if (move && latest && latest.turn === "b" && !latest.isGameOver) {
      latest.applyAIMove(move);
    }
    chessRef.current?.setThinking(false);
    aiTriggeredRef.current = false;
  }, [computeMove, difficulty, isVsAI]);

  useEffect(() => {
    if (!isVsAI) return;

    if (chess.turn === "b" && !chess.isGameOver && !chess.isAiThinking) {
      if (!aiTriggeredRef.current) {
        aiTriggeredRef.current = true;
        void triggerAI();
      }
    }
  }, [
    chess.fen,
    chess.turn,
    chess.isGameOver,
    chess.isAiThinking,
    isVsAI,
    triggerAI,
  ]);

  useEffect(() => {
    return () => cancelAI();
  }, [cancelAI]);

  useEffect(() => {
    if (isVsAI && chess.turn === "w" && !chess.isGameOver) {
      aiTriggeredRef.current = false;
    }
  }, [chess.turn, chess.fen, chess.isGameOver, isVsAI]);

  const handleUndo = () => {
    if (!chess.undoMove()) return;
    cancelAI();
    chess.setThinking(false);
    aiTriggeredRef.current = false;
  };

  const handleRestart = () => {
    cancelAI();
    chess.restartGame();
    aiTriggeredRef.current = false;
  };

  const handleHome = () => {
    cancelAI();
    onHome();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 px-4 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center">
            <div
              ref={boardContainerRef}
              className="w-full max-w-[min(100%,560px)] mx-auto lg:mx-0 lg:flex-1"
            >
              <ChessBoard
                fen={chess.fen}
                selectedSquare={chess.selectedSquare}
                legalTargets={chess.legalTargets}
                lastMove={chess.lastMove}
                checkSquare={getCheckSquare()}
                onPieceDrop={chess.handlePieceDrop}
                onSquareClick={chess.handleSquareClick}
                arePiecesDraggable={chess.canInteract}
                boardWidth={boardWidth}
                theme={theme}
              />
            </div>

            <GameSidebar
              turn={chess.turn}
              status={chess.status}
              gameMode={gameMode}
              difficulty={difficulty}
              moveHistory={chess.moveHistory}
              captured={chess.captured}
              moveCount={chess.moveHistory.length}
              isAiThinking={chess.isAiThinking}
              canUndo={chess.canUndo}
              onUndo={handleUndo}
              onRestart={handleRestart}
              onHome={handleHome}
            />
          </div>
        </div>
      </div>

      <PromotionDialog
        isOpen={!!chess.pendingPromotion}
        color={chess.turn}
        onSelect={chess.completePromotion}
        onCancel={chess.cancelPromotion}
      />

      <GameResultModal
        isOpen={chess.isGameOver && !!chess.gameResult}
        result={chess.gameResult}
        gameMode={gameMode}
        onRestart={handleRestart}
        onHome={handleHome}
      />

      <Footer />
    </div>
  );
};
