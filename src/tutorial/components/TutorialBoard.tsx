import { Chessboard } from "react-chessboard";

type BoardArrow = [Square, Square, string?];
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { Square } from "chess.js";
import { motion } from "framer-motion";
import { BOARD_THEMES } from "../../constants/theme";
import type { TutorialAccent, TutorialAnimStep, TutorialArrow } from "../tutorialData";
import { boardVariants } from "../tutorialAnimations";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;

const ACCENT_GLOW: Record<TutorialAccent, string> = {
  gold: "rgba(251, 191, 36, 0.75)",
  amber: "rgba(217, 119, 6, 0.75)",
  crimson: "rgba(239, 68, 68, 0.85)",
  emerald: "rgba(52, 211, 153, 0.75)",
  violet: "rgba(167, 139, 250, 0.75)",
};

interface TutorialBoardProps {
  fen: string;
  focusSquares?: Square[];
  highlightSquares?: Square[];
  arrows?: TutorialArrow[];
  dimBoard?: boolean;
  accent?: TutorialAccent;
  animationSteps?: TutorialAnimStep[];
  boardWidth: number;
}

const allSquares = (): Square[] => {
  const squares: Square[] = [];
  for (let r = 1; r <= 8; r++) {
    for (const f of FILES) {
      squares.push(`${f}${r}` as Square);
    }
  }
  return squares;
};

const buildSquareStyles = (
  focusSquares: Square[],
  highlightSquares: Square[],
  dimBoard: boolean,
  accent: TutorialAccent,
  checkGlow?: boolean
): Record<string, CSSProperties> => {
  const styles: Record<string, CSSProperties> = {};
  const glow = ACCENT_GLOW[accent];

  if (dimBoard) {
    for (const sq of allSquares()) {
      if (!focusSquares.includes(sq) && !highlightSquares.includes(sq)) {
        styles[sq] = {
          backgroundColor: "rgba(0, 0, 0, 0.55)",
        };
      }
    }
  }

  for (const sq of highlightSquares) {
    if (focusSquares.includes(sq)) continue;
    styles[sq] = {
      ...styles[sq],
      background: `radial-gradient(circle, ${glow.replace("0.75", "0.45")} 28%, transparent 30%)`,
      backgroundSize: "100% 100%",
    };
  }

  for (const sq of focusSquares) {
    styles[sq] = {
      ...styles[sq],
      backgroundColor: checkGlow
        ? "rgba(239, 68, 68, 0.55)"
        : "rgba(251, 191, 36, 0.28)",
      boxShadow: checkGlow
        ? "inset 0 0 28px rgba(239, 68, 68, 0.9)"
        : `inset 0 0 28px ${glow}`,
    };
  }

  return styles;
};

export const TutorialBoard = ({
  fen,
  focusSquares = [],
  highlightSquares = [],
  arrows = [],
  dimBoard = false,
  accent = "gold",
  animationSteps,
  boardWidth,
}: TutorialBoardProps) => {
  const colors = BOARD_THEMES.dark;
  const [stepIndex, setStepIndex] = useState(0);

  const hasSteps = animationSteps && animationSteps.length > 0;
  const currentStep = hasSteps ? animationSteps[stepIndex] : null;

  const displayFen = currentStep?.fen ?? fen;
  const displayFocus = currentStep?.focusSquares ?? focusSquares;
  const displayHighlight = currentStep?.highlightSquares ?? highlightSquares;
  const displayArrows = currentStep?.arrows ?? arrows;
  const displayDim = currentStep?.dimBoard ?? dimBoard;
  const isCheckScene = accent === "crimson";

  useEffect(() => {
    if (!animationSteps?.length) {
      setStepIndex(0);
      return;
    }

    setStepIndex(0);
    const timers: ReturnType<typeof setTimeout>[] = [];

    animationSteps.forEach((step, i) => {
      if (i === 0) return;
      timers.push(
        setTimeout(() => setStepIndex(i), step.delayMs)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [animationSteps, fen]);

  const customSquareStyles = useMemo(
    () =>
      buildSquareStyles(
        displayFocus,
        displayHighlight,
        displayDim,
        accent,
        isCheckScene
      ),
    [displayFocus, displayHighlight, displayDim, accent, isCheckScene]
  );

  const customArrows = useMemo<BoardArrow[]>(
    () =>
      displayArrows.map((a) => [
        a.from,
        a.to,
        a.color ?? ACCENT_GLOW[accent],
      ]),
    [displayArrows, accent]
  );

  return (
    <motion.div
      variants={boardVariants}
      initial="hidden"
      animate="visible"
      className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-950/30 ring-2 ring-amber-700/30"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none z-10" />
      <Chessboard
        position={displayFen}
        boardOrientation="white"
        arePiecesDraggable={false}
        customSquareStyles={customSquareStyles}
        customArrows={customArrows}
        customDarkSquareStyle={{ backgroundColor: colors.darkSquare }}
        customLightSquareStyle={{ backgroundColor: colors.lightSquare }}
        animationDuration={400}
        boardWidth={boardWidth}
      />
    </motion.div>
  );
};
