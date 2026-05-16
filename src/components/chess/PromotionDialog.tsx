import { Modal } from "../ui/Modal";
import type { PlayerColor } from "../../types";

interface PromotionDialogProps {
  isOpen: boolean;
  color: PlayerColor;
  onSelect: (piece: "q" | "r" | "b" | "n") => void;
  onCancel: () => void;
}

const PIECES: { id: "q" | "r" | "b" | "n"; label: string; symbol: string }[] = [
  { id: "q", label: "Queen", symbol: "♕" },
  { id: "r", label: "Rook", symbol: "♖" },
  { id: "b", label: "Bishop", symbol: "♗" },
  { id: "n", label: "Knight", symbol: "♘" },
];

export const PromotionDialog = ({
  isOpen,
  color,
  onSelect,
  onCancel,
}: PromotionDialogProps) => {
  const symbols =
    color === "w"
      ? ["♕", "♖", "♗", "♘"]
      : ["♛", "♜", "♝", "♞"];

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Promote Pawn">
      <p className="text-stone-400 text-sm mb-4">
        Choose a piece to promote your pawn:
      </p>
      <div className="grid grid-cols-4 gap-3">
        {PIECES.map((piece, i) => (
          <button
            key={piece.id}
            type="button"
            onClick={() => onSelect(piece.id)}
            className="
              flex flex-col items-center gap-1 p-4 rounded-xl
              bg-stone-800 hover:bg-amber-900/40 border border-stone-700
              hover:border-amber-600 transition-all duration-200
              hover:scale-105 active:scale-95
            "
          >
            <span className="text-4xl">{symbols[i]}</span>
            <span className="text-xs text-stone-400">{piece.label}</span>
          </button>
        ))}
      </div>
    </Modal>
  );
};
