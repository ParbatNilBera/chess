import type { CapturedPiecesState } from "../../types";

interface CapturedPiecesProps {
  captured: CapturedPiecesState;
  compact?: boolean;
}

const PieceChip = ({
  symbol,
  compact,
}: {
  symbol: string;
  compact?: boolean;
}) => (
  <span
    className={`
      inline-flex items-center justify-center rounded-md
      bg-stone-800 border border-stone-600/80 leading-none shadow-sm
      ${compact ? "min-w-[1.5rem] h-6 px-1 text-base" : "min-w-[2rem] h-8 px-2 text-xl"}
    `}
  >
    {symbol}
  </span>
);

const CaptureRow = ({
  label,
  pieces,
  accent,
  compact,
}: {
  label: string;
  pieces: string[];
  accent: string;
  compact?: boolean;
}) => (
  <div
    className={`rounded-lg bg-stone-800/40 border border-stone-700/50 ${compact ? "p-2" : "p-3"}`}
  >
    <div className="flex items-center justify-between mb-1">
      <span
        className={`font-semibold uppercase tracking-wider ${accent} ${compact ? "text-[10px]" : "text-xs"}`}
      >
        {label}
      </span>
      {!compact && (
        <span className="text-xs text-stone-500 tabular-nums">
          {pieces.length}
        </span>
      )}
    </div>
    <div className={`flex flex-wrap ${compact ? "gap-1 min-h-[1.25rem]" : "gap-1.5 min-h-[2rem]"}`}>
      {pieces.length > 0 ? (
        pieces.map((symbol, i) => (
          <PieceChip key={`${symbol}-${i}`} symbol={symbol} compact={compact} />
        ))
      ) : (
        <span className={`text-stone-600 italic ${compact ? "text-[10px]" : "text-sm"}`}>
          —
        </span>
      )}
    </div>
  </div>
);

export const CapturedPieces = ({
  captured,
  compact = false,
}: CapturedPiecesProps) => (
  <div className={compact ? "grid grid-cols-2 gap-2" : "flex flex-col gap-3"}>
    <CaptureRow
      label="By White"
      pieces={captured.byWhite}
      accent="text-stone-200"
      compact={compact}
    />
    <CaptureRow
      label="By Black"
      pieces={captured.byBlack}
      accent="text-stone-400"
      compact={compact}
    />
  </div>
);
