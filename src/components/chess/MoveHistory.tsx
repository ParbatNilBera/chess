import { useEffect, useRef } from "react";
import type { MoveRecord } from "../../types";
import { groupMovesByRound } from "../../utils/formatMove";

interface MoveHistoryProps {
  moves: MoveRecord[];
  compact?: boolean;
}

const MoveCell = ({ move }: { move?: MoveRecord }) => {
  if (!move) {
    return <span className="text-stone-600">—</span>;
  }

  return (
    <span className="inline-flex items-center gap-0.5">
      <span className={move.color === "w" ? "text-stone-100" : "text-stone-300"}>
        {move.san}
      </span>
      {move.isCheckmate && (
        <span className="text-red-400 font-bold text-[10px]">#</span>
      )}
      {move.isCheck && !move.isCheckmate && (
        <span className="text-amber-400 font-bold text-[10px]">+</span>
      )}
    </span>
  );
};

export const MoveHistory = ({ moves, compact = false }: MoveHistoryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rounds = groupMovesByRound(moves);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [moves.length]);

  return (
    <div
      ref={scrollRef}
      className={`
        overflow-y-auto scrollbar-thin rounded-lg bg-stone-950/40 border border-stone-800/60
        ${compact ? "max-h-24 text-[11px]" : "max-h-52 text-sm"}
      `}
    >
      {rounds.length === 0 ? (
        <p
          className={`text-stone-500 text-center ${compact ? "py-3 text-[11px]" : "py-8 text-sm"}`}
        >
          No moves yet
        </p>
      ) : (
        <table className="w-full">
          <thead className="sticky top-0 bg-stone-900/95 backdrop-blur-sm z-10">
            <tr className="text-stone-500 border-b border-stone-800">
              <th
                className={`text-left font-medium ${compact ? "py-1 px-2 w-7 text-[10px]" : "py-2 px-3 w-10 text-xs"}`}
              >
                #
              </th>
              <th
                className={`text-left font-medium ${compact ? "py-1 px-1 text-[10px]" : "py-2 px-2 text-xs"}`}
              >
                W
              </th>
              <th
                className={`text-left font-medium ${compact ? "py-1 px-2 text-[10px]" : "py-2 px-3 text-xs"}`}
              >
                B
              </th>
            </tr>
          </thead>
          <tbody>
            {rounds.map((round) => (
              <tr
                key={round.number}
                className="border-b border-stone-800/40"
              >
                <td
                  className={`text-stone-500 font-mono tabular-nums ${compact ? "py-0.5 px-2" : "py-2 px-3"}`}
                >
                  {round.number}
                </td>
                <td className={`font-mono ${compact ? "py-0.5 px-1" : "py-2 px-2"}`}>
                  <MoveCell move={round.white} />
                </td>
                <td className={`font-mono ${compact ? "py-0.5 px-2" : "py-2 px-3"}`}>
                  <MoveCell move={round.black} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
