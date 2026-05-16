import type { Square } from "chess.js";

export type TutorialAccent = "gold" | "amber" | "crimson" | "emerald" | "violet";

export interface TutorialArrow {
  from: Square;
  to: Square;
  color?: string;
}

export interface TutorialAnimStep {
  fen?: string;
  focusSquares?: Square[];
  highlightSquares?: Square[];
  arrows?: TutorialArrow[];
  dimBoard?: boolean;
  delayMs: number;
}

export interface TutorialSlideData {
  id: string;
  section: number;
  title: string;
  subtitle?: string;
  lines: string[];
  fen: string;
  focusSquares?: Square[];
  highlightSquares?: Square[];
  arrows?: TutorialArrow[];
  dimBoard?: boolean;
  accent: TutorialAccent;
  showBoard?: boolean;
  animationSteps?: TutorialAnimStep[];
}

const START =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const TUTORIAL_SLIDES: TutorialSlideData[] = [
  {
    id: "intro",
    section: 1,
    title: "The Battlefield",
    subtitle: "A war of mind and patience",
    lines: [
      "Chess is not just a game.",
      "It is a battlefield of strategy, sacrifice, patience, and intelligence.",
      "The entire kingdom stands to protect one piece — The King.",
      "Every soldier exists for one purpose: protect the king at all costs.",
    ],
    fen: START,
    focusSquares: ["e1"],
    highlightSquares: ["d1", "e2", "f1", "d2", "f2", "e3"],
    dimBoard: true,
    accent: "gold",
    animationSteps: [
      {
        fen: START,
        focusSquares: ["e1"],
        dimBoard: true,
        delayMs: 0,
      },
      {
        fen: START,
        focusSquares: ["e1", "d1", "f1", "e2"],
        highlightSquares: ["a1", "h1", "a8", "h8"],
        dimBoard: true,
        delayMs: 2200,
      },
    ],
  },
  {
    id: "king",
    section: 2,
    title: "The King",
    subtitle: "Heart of the kingdom",
    lines: [
      "The King is the heart of the kingdom.",
      "He is not the strongest warrior… but if the king falls, the battle is over.",
      "The king moves only one square at a time — carefully and cautiously.",
    ],
    fen: "8/8/8/8/8/8/8/4K3 w - - 0 1",
    focusSquares: ["e1"],
    highlightSquares: ["d1", "d2", "e2", "f2", "f1"],
    dimBoard: false,
    accent: "gold",
    animationSteps: [
      {
        fen: "8/8/8/8/8/8/8/4K3 w - - 0 1",
        focusSquares: ["e1"],
        highlightSquares: ["d1"],
        arrows: [{ from: "e1", to: "d1", color: "rgba(251,191,36,0.9)" }],
        delayMs: 0,
      },
      {
        fen: "8/8/8/8/8/8/8/4K3 w - - 0 1",
        focusSquares: ["e1"],
        highlightSquares: ["d1", "d2", "e2", "f2", "f1"],
        delayMs: 1400,
      },
      {
        fen: "8/8/8/8/8/4K3/8/8 w - - 0 1",
        focusSquares: ["e4"],
        highlightSquares: ["d3", "d4", "d5", "e3", "e5", "f3", "f4", "f5"],
        arrows: [{ from: "e1", to: "e4", color: "rgba(251,191,36,0.7)" }],
        delayMs: 2800,
      },
    ],
  },
  {
    id: "queen",
    section: 3,
    title: "The Queen",
    subtitle: "Power incarnate",
    lines: [
      "The Queen is the most powerful piece on the battlefield.",
      "She moves diagonally, vertically, and horizontally.",
      "No warrior controls the board like the queen — speed, power, and domination.",
    ],
    fen: "8/8/8/8/3Q4/8/8/8 w - - 0 1",
    focusSquares: ["d4"],
    highlightSquares: [
      "a4", "b4", "c4", "e4", "f4", "g4", "h4",
      "d1", "d2", "d3", "d5", "d6", "d7", "d8",
      "a1", "b2", "c3", "e5", "f6", "g7", "h8",
      "a7", "b6", "c5", "e3", "f2", "g1",
    ],
    dimBoard: true,
    accent: "gold",
    arrows: [
      { from: "d4", to: "h8", color: "rgba(251,191,36,0.85)" },
      { from: "d4", to: "d8", color: "rgba(251,191,36,0.85)" },
      { from: "d4", to: "h4", color: "rgba(251,191,36,0.85)" },
    ],
    animationSteps: [
      {
        fen: "8/8/8/8/3Q4/8/8/8 w - - 0 1",
        focusSquares: ["d4"],
        dimBoard: true,
        delayMs: 0,
      },
      {
        fen: "8/8/8/3Q4/8/8/8/8 w - - 0 1",
        focusSquares: ["d5"],
        highlightSquares: ["d1", "d2", "d3", "d4", "d6", "d7", "d8"],
        arrows: [{ from: "d4", to: "d5", color: "rgba(251,191,36,0.9)" }],
        dimBoard: true,
        delayMs: 1800,
      },
      {
        fen: "8/8/7Q/8/8/8/8/8 w - - 0 1",
        focusSquares: ["g7"],
        highlightSquares: ["a1", "b2", "c3", "d4", "e5", "f6", "h8"],
        arrows: [{ from: "d5", to: "g7", color: "rgba(251,191,36,0.9)" }],
        dimBoard: true,
        delayMs: 3600,
      },
    ],
  },
  {
    id: "rook",
    section: 4,
    title: "The Rook",
    subtitle: "Fortress of force",
    lines: [
      "The Rook is a fortress of power.",
      "It controls entire rows and columns with unstoppable force.",
      "Rooks become deadly in open spaces.",
    ],
    fen: "8/8/8/8/8/8/8/R7 w - - 0 1",
    focusSquares: ["a1"],
    highlightSquares: [
      "a2", "a3", "a4", "a5", "a6", "a7", "a8",
      "b1", "c1", "d1", "e1", "f1", "g1", "h1",
    ],
    dimBoard: true,
    accent: "amber",
    arrows: [
      { from: "a1", to: "a8", color: "rgba(180, 130, 70, 0.9)" },
      { from: "a1", to: "h1", color: "rgba(180, 130, 70, 0.9)" },
    ],
    animationSteps: [
      {
        fen: "8/8/8/8/8/8/8/R7 w - - 0 1",
        focusSquares: ["a1"],
        highlightSquares: ["a2", "a3", "a4", "a5", "a6", "a7", "a8"],
        arrows: [{ from: "a1", to: "a8" }],
        dimBoard: true,
        delayMs: 0,
      },
      {
        fen: "R7/8/8/8/8/8/8/8 w - - 0 1",
        focusSquares: ["a8"],
        highlightSquares: ["b8", "c8", "d8", "e8", "f8", "g8", "h8"],
        arrows: [{ from: "a1", to: "a8" }],
        dimBoard: true,
        delayMs: 2000,
      },
    ],
  },
  {
    id: "bishop",
    section: 5,
    title: "The Bishop",
    subtitle: "Silent precision",
    lines: [
      "The Bishop moves silently across diagonals.",
      "Fast, elegant, and dangerous from long distance.",
    ],
    fen: "8/8/8/8/8/8/5B2/8 w - - 0 1",
    focusSquares: ["f2"],
    highlightSquares: [
      "e1", "d2", "c3", "b4", "a5",
      "g3", "h4", "g1", "e3", "d4", "c5", "b6", "a7",
    ],
    dimBoard: true,
    accent: "violet",
    arrows: [
      { from: "f2", to: "a7", color: "rgba(167, 139, 250, 0.9)" },
      { from: "f2", to: "c5", color: "rgba(167, 139, 250, 0.7)" },
    ],
    animationSteps: [
      {
        fen: "8/8/8/8/8/8/5B2/8 w - - 0 1",
        focusSquares: ["f2"],
        highlightSquares: ["g3", "h4", "e3", "d4", "c5", "b6", "a7"],
        arrows: [{ from: "f2", to: "a7" }],
        dimBoard: true,
        delayMs: 0,
      },
      {
        fen: "8/8/8/3B4/8/8/8/8 w - - 0 1",
        focusSquares: ["d5"],
        highlightSquares: ["c4", "b3", "a2", "e6", "f7", "g8"],
        arrows: [{ from: "f2", to: "d5" }],
        dimBoard: true,
        delayMs: 2200,
      },
    ],
  },
  {
    id: "knight",
    section: 6,
    title: "The Knight",
    subtitle: "The unpredictable warrior",
    lines: [
      "The Knight moves unlike any other piece.",
      "It jumps over pieces and attacks unexpectedly.",
      "The Knight is unpredictable — a true tactical warrior.",
    ],
    fen: "8/8/8/8/8/8/1N6/8 w - - 0 1",
    focusSquares: ["b2"],
    highlightSquares: ["a4", "c4", "d3", "d1", "a1", "c1"],
    dimBoard: true,
    accent: "emerald",
    arrows: [
      { from: "b2", to: "c4", color: "rgba(52, 211, 153, 0.9)" },
      { from: "b2", to: "d3", color: "rgba(52, 211, 153, 0.7)" },
    ],
    animationSteps: [
      {
        fen: "8/8/8/8/8/8/1N6/8 w - - 0 1",
        focusSquares: ["b2"],
        highlightSquares: ["a4", "c4", "d3", "d1"],
        dimBoard: true,
        delayMs: 0,
      },
      {
        fen: "8/8/5p2/8/8/3N4/8/8 w - - 0 1",
        focusSquares: ["d4"],
        highlightSquares: ["f5", "b5", "c6", "e6", "f3", "b3"],
        arrows: [{ from: "b2", to: "d4" }],
        dimBoard: true,
        delayMs: 1800,
      },
      {
        fen: "8/8/5N2/8/8/8/8/8 w - - 0 1",
        focusSquares: ["f6"],
        highlightSquares: ["e8", "g8", "h7", "h5", "g4", "e4", "d7", "d5"],
        arrows: [{ from: "d4", to: "f6" }],
        dimBoard: true,
        delayMs: 3400,
      },
    ],
  },
  {
    id: "pawn",
    section: 7,
    title: "The Pawns",
    subtitle: "Soldiers of the realm",
    lines: [
      "These are the soldiers of the kingdom.",
      "They may look weak… but together they build powerful defenses.",
      "Every great victory begins with the pawns.",
      "A pawn that reaches the far rank may be promoted — often into a Queen.",
    ],
    fen: "8/8/8/8/8/4P3/8/8 w - - 0 1",
    focusSquares: ["e3"],
    highlightSquares: ["e4"],
    dimBoard: true,
    accent: "amber",
    arrows: [{ from: "e3", to: "e4", color: "rgba(251,191,36,0.8)" }],
    animationSteps: [
      {
        fen: "8/8/8/8/4P3/8/8/8 w - - 0 1",
        focusSquares: ["e4"],
        highlightSquares: ["e5"],
        arrows: [{ from: "e4", to: "e5" }],
        dimBoard: true,
        delayMs: 0,
      },
      {
        fen: "8/8/8/8/3pP3/8/8/8 w - - 0 1",
        focusSquares: ["e4"],
        highlightSquares: ["d5"],
        arrows: [{ from: "e4", to: "d5" }],
        dimBoard: true,
        delayMs: 2000,
      },
      {
        fen: "4Q3/8/8/8/8/8/8/8 w - - 0 1",
        focusSquares: ["e8"],
        highlightSquares: ["e8"],
        dimBoard: false,
        delayMs: 4000,
      },
    ],
  },
  {
    id: "check",
    section: 8,
    title: "Check & Checkmate",
    subtitle: "The king in danger",
    lines: [
      "When the king is under attack… it is called CHECK.",
      "The king must escape, block, or capture the threat.",
      "But when escape becomes impossible… the battle ends with CHECKMATE.",
    ],
    fen: "7k/5Q2/6K1/8/8/8/8/8 w - - 0 1",
    focusSquares: ["h8"],
    highlightSquares: ["g8", "h7", "g7"],
    dimBoard: true,
    accent: "crimson",
    animationSteps: [
      {
        fen: "6k1/8/8/8/8/8/5Q2/6K1 w - - 0 1",
        focusSquares: ["g8"],
        highlightSquares: ["f8", "h8", "f7", "h7"],
        dimBoard: true,
        delayMs: 0,
      },
      {
        fen: "7k/5Q2/6K1/8/8/8/8/8 w - - 0 1",
        focusSquares: ["h8", "f7"],
        highlightSquares: ["g8", "h7"],
        dimBoard: true,
        delayMs: 2200,
      },
    ],
  },
  {
    id: "finale",
    section: 9,
    title: "Your Battlefield Awaits",
    subtitle: "The story begins with you",
    lines: [
      "Every move matters.",
      "Sometimes sacrifice creates victory.",
      "Sometimes patience defeats power.",
      "Now the battlefield is yours.",
    ],
    fen: START,
    focusSquares: [],
    showBoard: true,
    accent: "gold",
    dimBoard: false,
  },
];
