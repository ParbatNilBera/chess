import { Chessboard } from "react-chessboard";
import { useMemo, type CSSProperties } from "react";
import type { Square } from "chess.js";
import type { BoardColorSet } from "../../constants/boardPresets";

interface ChessBoardProps {
  fen: string;
  orientation?: "white" | "black";
  selectedSquare: Square | null;
  legalTargets: Square[];
  lastMove: { from: Square; to: Square } | null;
  checkSquare: Square | null;
  onPieceDrop: (from: Square, to: Square) => boolean;
  onSquareClick: (square: Square) => void;
  arePiecesDraggable: boolean;
  boardWidth?: number;
  boardColors: BoardColorSet;
}

const lastMoveRing = "inset 0 0 0 3px rgba(155, 199, 0, 0.85)";

export const ChessBoard = ({
  fen,
  orientation = "white",
  selectedSquare,
  legalTargets,
  lastMove,
  checkSquare,
  onPieceDrop,
  onSquareClick,
  arePiecesDraggable,
  boardWidth,
  boardColors: colors,
}: ChessBoardProps) => {
  const customSquareStyles = useMemo(() => {
    const styles: Record<string, CSSProperties> = {};

    if (lastMove) {
      styles[lastMove.from] = {
        backgroundColor: colors.lastMoveFrom,
        boxShadow: lastMoveRing,
      };
      styles[lastMove.to] = {
        backgroundColor: colors.lastMoveTo,
        boxShadow: lastMoveRing,
      };
    }

    if (selectedSquare) {
      styles[selectedSquare] = {
        backgroundColor: colors.highlight,
      };
    }

    for (const sq of legalTargets) {
      if (sq === lastMove?.from || sq === lastMove?.to) continue;
      styles[sq] = {
        background: `radial-gradient(circle, ${colors.legal} 25%, transparent 26%)`,
        backgroundSize: "100% 100%",
      };
    }

    if (checkSquare) {
      styles[checkSquare] = {
        backgroundColor: colors.check,
        boxShadow: "inset 0 0 0 3px rgba(220, 38, 38, 0.9)",
      };
    }

    return styles;
  }, [checkSquare, colors, lastMove, legalTargets, selectedSquare]);

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-stone-700/50 mx-auto w-fit max-w-full">
      <Chessboard
        position={fen}
        boardOrientation={orientation}
        onPieceDrop={(source, target) => onPieceDrop(source, target)}
        onSquareClick={(square) => onSquareClick(square)}
        arePiecesDraggable={arePiecesDraggable}
        customSquareStyles={customSquareStyles}
        customDarkSquareStyle={{ backgroundColor: colors.darkSquare }}
        customLightSquareStyle={{ backgroundColor: colors.lightSquare }}
        animationDuration={200}
        boardWidth={boardWidth}
      />
    </div>
  );
};
