import { useEffect, useRef } from "react";
import type { MoveRecord } from "../../types";
import { groupMovesByRound } from "../../utils/formatMove";

interface MoveHistoryProps {
  moves: MoveRecord[];
}

const MoveCell = ({ move }: { move?: MoveRecord }) => {
  if (!move) {
    return <span className="text-stone-600">—</span>;
  }

  return (
    <span className="inline-flex items-center gap-1">
      <span className={move.color === "w" ? "text-stone-100" : "text-stone-300"}>
        {move.san}
      </span>
      {move.isCheckmate && (
        <span className="text-red-400 text-xs font-bold">#</span>
      )}
      {move.isCheck && !move.isCheckmate && (
        <span className="text-amber-400 text-xs font-bold">+</span>
      )}
    </span>
  );
};

export const MoveHistory = ({ moves }: MoveHistoryProps) => {
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
      className="max-h-52 overflow-y-auto scrollbar-thin rounded-xl bg-stone-950/40 border border-stone-800/60"
    >
      {rounds.length === 0 ? (
        <p className="text-stone-500 text-center py-8 text-sm">
          No moves yet
        </p>
      ) : (
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-stone-900/95 backdrop-blur-sm z-10">
            <tr className="text-stone-500 text-xs border-b border-stone-800">
              <th className="text-left py-2 px-3 w-10 font-medium">#</th>
              <th className="text-left py-2 px-2 font-medium">White</th>
              <th className="text-left py-2 px-3 font-medium">Black</th>
            </tr>
          </thead>
          <tbody>
            {rounds.map((round) => (
              <tr
                key={round.number}
                className="border-b border-stone-800/40 hover:bg-stone-800/30 transition-colors"
              >
                <td className="py-2 px-3 text-stone-500 font-mono tabular-nums">
                  {round.number}
                </td>
                <td className="py-2 px-2 font-mono">
                  <MoveCell move={round.white} />
                </td>
                <td className="py-2 px-3 font-mono">
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
