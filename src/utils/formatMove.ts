import type { MoveRecord } from "../types";

export const formatMovePair = (
  moveNumber: number,
  white?: MoveRecord,
  black?: MoveRecord
): string => {
  const whiteSan = white?.san ?? "";
  const blackSan = black?.san ?? "";
  return `${moveNumber}. ${whiteSan}${blackSan ? ` ${blackSan}` : ""}`;
};

export const groupMovesByRound = (
  moves: MoveRecord[]
): { white?: MoveRecord; black?: MoveRecord; number: number }[] => {
  const rounds: { white?: MoveRecord; black?: MoveRecord; number: number }[] =
    [];

  for (let i = 0; i < moves.length; i += 2) {
    rounds.push({
      number: Math.floor(i / 2) + 1,
      white: moves[i],
      black: moves[i + 1],
    });
  }

  return rounds;
};
