import { IoHome, IoRefresh, IoArrowUndo } from "react-icons/io5";
import { GiChessKing } from "react-icons/gi";
import { HiUsers } from "react-icons/hi2";
import type {
  CapturedPiecesState,
  Difficulty,
  GameMode,
  GameStatus,
  MoveRecord,
  PlayerColor,
} from "../../types";
import { getDifficultyConfig } from "../../constants/difficulties";
import { getStatusMessage } from "../../utils/chessHelpers";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { CapturedPieces } from "./CapturedPieces";
import { MoveHistory } from "./MoveHistory";

interface GameSidebarProps {
  turn: PlayerColor;
  status: GameStatus;
  gameMode: GameMode;
  difficulty: Difficulty;
  moveHistory: MoveRecord[];
  captured: CapturedPiecesState;
  isAiThinking: boolean;
  canUndo: boolean;
  moveCount: number;
  onUndo: () => void;
  onRestart: () => void;
  onHome: () => void;
}

export const GameSidebar = ({
  turn,
  status,
  gameMode,
  difficulty,
  moveHistory,
  captured,
  isAiThinking,
  canUndo,
  moveCount,
  onUndo,
  onRestart,
  onHome,
}: GameSidebarProps) => {
  const isVsAI = gameMode === "ai";
  const config = getDifficultyConfig(difficulty);
  const statusMessage = getStatusMessage(status, turn, isAiThinking, gameMode);

  const statusVariant =
    status === "checkmate"
      ? "danger"
      : status === "check"
        ? "warning"
        : isAiThinking
          ? "warning"
          : "success";

  const turnBadge = () => {
    if (isAiThinking) return "AI";
    if (!isVsAI) return turn === "w" ? "White" : "Black";
    return turn === "w" ? "You" : "AI";
  };

  return (
    <aside className="flex flex-col gap-4 w-full lg:w-80 xl:w-96 shrink-0">
      {/* Status */}
      <Card className="overflow-hidden p-0">
        <div className="bg-gradient-to-r from-amber-900/30 to-stone-900/50 px-4 py-3 border-b border-stone-700/50">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-amber-500/90 uppercase tracking-widest">
              Game Status
            </p>
            <Badge variant={statusVariant}>{turnBadge()}</Badge>
          </div>
        </div>
        <div className="px-4 py-4">
          <p
            className={`text-base font-medium text-stone-100 leading-snug ${
              isAiThinking ? "animate-pulse text-amber-200" : ""
            }`}
          >
            {statusMessage}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {isVsAI ? (
              <Badge>
                <GiChessKing className="inline mr-1 opacity-80" />
                {config.label}
              </Badge>
            ) : (
              <Badge>
                <HiUsers className="inline mr-1 opacity-80" />
                1 vs 1
              </Badge>
            )}
            <Badge variant="default">
              {moveCount} {moveCount === 1 ? "move" : "moves"}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Captured */}
      <Card title="Captured Pieces" className="p-4">
        <CapturedPieces captured={captured} />
      </Card>

      {/* History */}
      <Card title="Move History" className="p-4">
        <MoveHistory moves={moveHistory} />
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        <Button
          variant="secondary"
          size="sm"
          icon={<IoArrowUndo className="w-4 h-4" />}
          onClick={onUndo}
          disabled={!canUndo}
          className="!px-2"
          title="Undo last move"
        >
          Undo
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={<IoRefresh className="w-4 h-4" />}
          onClick={onRestart}
          disabled={isAiThinking}
          className="!px-2"
        >
          Restart
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={<IoHome className="w-4 h-4" />}
          onClick={onHome}
          className="!px-2"
        >
          Home
        </Button>
      </div>
    </aside>
  );
};
