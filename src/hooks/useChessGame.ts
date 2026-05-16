import { Chess, type Move, type Square } from "chess.js";
import { useCallback, useMemo, useRef, useState } from "react";
import type {
  AIMove,
  CapturedPiecesState,
  Difficulty,
  GameMode,
  GameResult,
  GameStatus,
  MoveRecord,
  PlayerColor,
  PromotionMove,
} from "../types";
import {
  cloneGame,
  getGameStatus,
  getLegalMoveSquares,
  isPromotionMove,
} from "../utils/chessHelpers";
import {
  createMoveRecord,
  deriveCapturedPieces,
  getLastMoveHighlight,
  getUndoPopCount,
} from "../utils/moveStack";
import {
  playCaptureSound,
  playCheckSound,
  playMoveSound,
} from "../utils/sounds";

const HUMAN_COLOR: PlayerColor = "w";
const AI_COLOR: PlayerColor = "b";
const INITIAL_FEN = new Chess().fen();

export const useChessGame = (difficulty: Difficulty, gameMode: GameMode) => {
  const isVsAI = gameMode === "ai";

  const [fen, setFen] = useState(INITIAL_FEN);
  const [fenStack, setFenStack] = useState<string[]>([INITIAL_FEN]);
  const [moveStack, setMoveStack] = useState<MoveRecord[]>([]);

  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalTargets, setLegalTargets] = useState<Square[]>([]);
  const [pendingPromotion, setPendingPromotion] =
    useState<PromotionMove | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const gameRef = useRef(new Chess(INITIAL_FEN));

  const syncGame = useCallback((fenString: string) => {
    const game = cloneGame(fenString);
    gameRef.current = game;
    setFen(fenString);
  }, []);

  const game = useMemo(() => cloneGame(fen), [fen]);
  const moveHistory = moveStack;
  const captured: CapturedPiecesState = useMemo(
    () => deriveCapturedPieces(moveStack),
    [moveStack]
  );
  const lastMove = useMemo(() => getLastMoveHighlight(moveStack), [moveStack]);

  const status: GameStatus = useMemo(() => getGameStatus(game), [game]);
  const turn = game.turn();
  const canUndo =
    moveStack.length > 0 && !isAiThinking && !pendingPromotion;

  const isGameOver =
    status === "checkmate" || status === "stalemate" || status === "draw";

  const canInteract = isVsAI
    ? turn === HUMAN_COLOR && !isGameOver && !isAiThinking
    : !isGameOver;

  const gameResult: GameResult | null = useMemo(() => {
    if (!isGameOver) return null;
    if (status === "stalemate" || status === "draw") {
      return { winner: "draw", reason: "Draw" };
    }
    const winner = turn === "w" ? "b" : "w";
    if (isVsAI) {
      return {
        winner,
        reason:
          winner === HUMAN_COLOR
            ? "You won by checkmate!"
            : "AI wins by checkmate!",
      };
    }
    return {
      winner,
      reason:
        winner === "w"
          ? "White wins by checkmate!"
          : "Black wins by checkmate!",
    };
  }, [isGameOver, isVsAI, status, turn]);

  const commitMove = useCallback(
    (current: Chess, move: Move): boolean => {
      const record = createMoveRecord(move, current.isCheck());
      const newFen = current.fen();

      setFenStack((prev) => [...prev, newFen]);
      setMoveStack((prev) => [...prev, record]);
      syncGame(newFen);
      setSelectedSquare(null);
      setLegalTargets([]);

      if (move.captured) playCaptureSound();
      else if (current.isCheck()) playCheckSound();
      else playMoveSound();

      return true;
    },
    [syncGame]
  );

  const applyMove = useCallback(
    (
      from: Square,
      to: Square,
      promotion?: "q" | "r" | "b" | "n"
    ): boolean => {
      const current = cloneGame(fen);
      const mover = current.turn();
      if (isVsAI && mover !== HUMAN_COLOR) return false;

      const piece = current.get(from);
      if (!piece || piece.color !== mover) return false;

      try {
        const move = current.move({
          from,
          to,
          promotion: promotion ?? "q",
        });
        if (!move) return false;
        return commitMove(current, move);
      } catch {
        return false;
      }
    },
    [commitMove, fen, isVsAI]
  );

  const handleSquareClick = useCallback(
    (square: Square) => {
      if (!canInteract) return;

      const current = cloneGame(fen);
      const activeColor = current.turn();
      const piece = current.get(square);

      if (selectedSquare === square) {
        setSelectedSquare(null);
        setLegalTargets([]);
        return;
      }

      if (selectedSquare && legalTargets.includes(square)) {
        if (isPromotionMove(current, selectedSquare, square)) {
          setPendingPromotion({ from: selectedSquare, to: square });
          return;
        }
        applyMove(selectedSquare, square);
        return;
      }

      if (piece && piece.color === activeColor) {
        setSelectedSquare(square);
        setLegalTargets(getLegalMoveSquares(current, square));
      } else {
        setSelectedSquare(null);
        setLegalTargets([]);
      }
    },
    [applyMove, canInteract, fen, legalTargets, selectedSquare]
  );

  const handlePieceDrop = useCallback(
    (from: Square, to: Square): boolean => {
      if (!canInteract) return false;

      const current = cloneGame(fen);
      const activeColor = current.turn();
      const piece = current.get(from);
      if (!piece || piece.color !== activeColor) return false;

      const legal = getLegalMoveSquares(current, from);
      if (!legal.includes(to)) return false;

      if (isPromotionMove(current, from, to)) {
        setPendingPromotion({ from, to });
        return false;
      }

      return applyMove(from, to);
    },
    [applyMove, canInteract, fen]
  );

  const completePromotion = useCallback(
    (piece: "q" | "r" | "b" | "n") => {
      if (!pendingPromotion) return;
      applyMove(pendingPromotion.from, pendingPromotion.to, piece);
      setPendingPromotion(null);
    },
    [applyMove, pendingPromotion]
  );

  const cancelPromotion = useCallback(() => {
    setPendingPromotion(null);
    setSelectedSquare(null);
    setLegalTargets([]);
  }, []);

  const applyAIMove = useCallback(
    (move: AIMove): boolean => {
      const current = cloneGame(fen);
      if (current.turn() !== AI_COLOR) return false;

      try {
        const result = current.move({
          from: move.from,
          to: move.to,
          promotion: move.promotion ?? "q",
        });
        if (!result) return false;
        return commitMove(current, result);
      } catch {
        return false;
      }
    },
    [commitMove, fen]
  );

  const undoMove = useCallback(() => {
    if (isAiThinking || pendingPromotion) return false;

    const popCount = getUndoPopCount(moveStack, gameMode);
    if (popCount === 0) return false;

    const newMoveStack = moveStack.slice(0, -popCount);
    const newFenStack = fenStack.slice(0, -(popCount));
    const previousFen = newFenStack[newFenStack.length - 1];

    setMoveStack(newMoveStack);
    setFenStack(newFenStack);
    syncGame(previousFen);
    setSelectedSquare(null);
    setLegalTargets([]);
    setPendingPromotion(null);

    return true;
  }, [
    fenStack,
    gameMode,
    isAiThinking,
    moveStack,
    pendingPromotion,
    syncGame,
  ]);

  const restartGame = useCallback(() => {
    setFenStack([INITIAL_FEN]);
    setMoveStack([]);
    syncGame(INITIAL_FEN);
    setSelectedSquare(null);
    setLegalTargets([]);
    setPendingPromotion(null);
    setIsAiThinking(false);
  }, [syncGame]);

  const setThinking = useCallback((value: boolean) => {
    setIsAiThinking(value);
  }, []);

  return {
    fen,
    game,
    turn,
    status,
    moveHistory,
    captured,
    selectedSquare,
    legalTargets,
    lastMove,
    pendingPromotion,
    isAiThinking,
    canInteract,
    canUndo,
    isGameOver,
    gameResult,
    gameMode,
    difficulty,
    handleSquareClick,
    handlePieceDrop,
    completePromotion,
    cancelPromotion,
    applyAIMove,
    undoMove,
    restartGame,
    setThinking,
  };
};
