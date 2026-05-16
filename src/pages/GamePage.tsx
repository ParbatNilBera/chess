import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Square } from "chess.js";
import { useChessGame } from "../hooks/useChessGame";
import { useAI } from "../hooks/useAI";
import { useSettings } from "../context/SettingsContext";
import { ChessBoard } from "../components/chess/ChessBoard";
import { GameSidebar } from "../components/chess/GameSidebar";
import { PromotionDialog } from "../components/chess/PromotionDialog";
import { GameResultModal } from "../components/chess/GameResultModal";
import { MobileGameBar } from "../components/game/MobileGameBar";
import { TopBar } from "../components/layout/TopBar";
import { Footer } from "../components/layout/Footer";

export const GamePage = () => {
  const navigate = useNavigate();
  const { gameMode, difficulty, boardColors } = useSettings();
  const isVsAI = gameMode === "ai";
  const { computeMove, cancelAI } = useAI();
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [boardWidth, setBoardWidth] = useState(320);
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
      const padding = 24;
      const max = window.innerWidth < 1024 ? window.innerWidth - padding : 560;
      if (boardContainerRef.current) {
        const containerW = boardContainerRef.current.offsetWidth;
        setBoardWidth(Math.min(containerW, max, 560));
      } else {
        setBoardWidth(Math.min(max, 560));
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
  }, [chess.fen, chess.turn, chess.isGameOver, chess.isAiThinking, isVsAI, triggerAI]);

  useEffect(() => () => cancelAI(), [cancelAI]);

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
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <TopBar title="Game" showBack backTo="/" />

      <div className="flex-1 flex flex-col lg:pb-0 pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
        <div className="flex-1 px-3 sm:px-4 py-3 sm:py-6 max-w-6xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start justify-center">
            <div
              ref={boardContainerRef}
              className="w-full flex justify-center shrink-0 lg:flex-1"
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
                boardColors={boardColors}
              />
            </div>

            {/* Mobile compact panel */}
            <div className="w-full lg:hidden">
              <GameSidebar
                compact
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

            {/* Desktop full sidebar */}
            <div className="hidden lg:block">
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

        <div className="hidden lg:block">
          <Footer />
        </div>
      </div>

      <MobileGameBar
        canUndo={chess.canUndo}
        isAiThinking={chess.isAiThinking}
        onUndo={handleUndo}
        onRestart={handleRestart}
        onHome={handleHome}
      />

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
    </div>
  );
};
