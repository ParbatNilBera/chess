import { IoHome, IoRefresh, IoArrowUndo } from "react-icons/io5";
import { Button } from "../ui/Button";

interface MobileGameBarProps {
  canUndo: boolean;
  isAiThinking: boolean;
  onUndo: () => void;
  onRestart: () => void;
  onHome: () => void;
}

export const MobileGameBar = ({
  canUndo,
  isAiThinking,
  onUndo,
  onRestart,
  onHome,
}: MobileGameBarProps) => (
  <div
    className="
      lg:hidden fixed bottom-0 left-0 right-0 z-40
      px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]
      bg-stone-950/95 backdrop-blur-lg border-t border-stone-800/80
      shadow-[0_-8px_32px_rgba(0,0,0,0.4)]
    "
  >
    <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto">
      <Button
        variant="secondary"
        size="md"
        icon={<IoArrowUndo className="w-5 h-5" />}
        onClick={onUndo}
        disabled={!canUndo}
        className="!py-3"
      >
        Undo
      </Button>
      <Button
        variant="secondary"
        size="md"
        icon={<IoRefresh className="w-5 h-5" />}
        onClick={onRestart}
        disabled={isAiThinking}
        className="!py-3"
      >
        Restart
      </Button>
      <Button
        variant="primary"
        size="md"
        icon={<IoHome className="w-5 h-5" />}
        onClick={onHome}
        className="!py-3"
      >
        Home
      </Button>
    </div>
  </div>
);
