import type { CapturedPiecesState } from "../../types";

interface CapturedPiecesProps {
  captured: CapturedPiecesState;
}

const PieceChip = ({ symbol }: { symbol: string }) => (
  <span
    className="
      inline-flex items-center justify-center min-w-[2rem] h-8 px-2
      rounded-lg bg-stone-800 border border-stone-600/80
      text-xl leading-none shadow-sm
    "
    title="Captured piece"
  >
    {symbol}
  </span>
);

const CaptureRow = ({
  label,
  pieces,
  accent,
}: {
  label: string;
  pieces: string[];
  accent: string;
}) => (
  <div className="rounded-xl bg-stone-800/40 border border-stone-700/50 p-3">
    <div className="flex items-center justify-between mb-2">
      <span className={`text-xs font-semibold uppercase tracking-wider ${accent}`}>
        {label}
      </span>
      <span className="text-xs text-stone-500 tabular-nums">
        {pieces.length} {pieces.length === 1 ? "piece" : "pieces"}
      </span>
    </div>
    <div className="flex flex-wrap gap-1.5 min-h-[2rem]">
      {pieces.length > 0 ? (
        pieces.map((symbol, i) => (
          <PieceChip key={`${symbol}-${i}`} symbol={symbol} />
        ))
      ) : (
        <span className="text-sm text-stone-600 italic py-1">None yet</span>
      )}
    </div>
  </div>
);

export const CapturedPieces = ({ captured }: CapturedPiecesProps) => (
  <div className="flex flex-col gap-3">
    <CaptureRow
      label="By White"
      pieces={captured.byWhite}
      accent="text-stone-200"
    />
    <CaptureRow
      label="By Black"
      pieces={captured.byBlack}
      accent="text-stone-400"
    />
  </div>
);
