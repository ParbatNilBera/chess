import type { Difficulty } from "../types";

export interface DifficultyConfig {
  id: Difficulty;
  label: string;
  description: string;
  depth: number;
  thinkingDelayMs: number;
}

export const DIFFICULTIES: DifficultyConfig[] = [
  {
    id: "easy",
    label: "Easy",
    description: "Great for beginners — shallow search, occasional mistakes.",
    depth: 2,
    thinkingDelayMs: 400,
  },
  {
    id: "medium",
    label: "Medium",
    description: "Balanced challenge with solid positional play.",
    depth: 3,
    thinkingDelayMs: 600,
  },
  {
    id: "hard",
    label: "Hard",
    description: "Deep search — strong tactical awareness.",
    depth: 5,
    thinkingDelayMs: 900,
  },
];

export const getDifficultyConfig = (id: Difficulty): DifficultyConfig =>
  DIFFICULTIES.find((d) => d.id === id) ?? DIFFICULTIES[1];
