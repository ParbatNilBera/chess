import { motion } from "framer-motion";
import { GiChessQueen } from "react-icons/gi";
import { IoChevronForward } from "react-icons/io5";

interface TutorialEntryButtonProps {
  onClick: () => void;
}

export const TutorialEntryButton = ({ onClick }: TutorialEntryButtonProps) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="
      group relative w-full overflow-hidden rounded-2xl
      border border-amber-600/30 bg-stone-900/40
      backdrop-blur-xl shadow-xl shadow-amber-950/20
      text-left transition-shadow duration-300
      hover:border-amber-500/50 hover:shadow-amber-900/30
    "
  >
    <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-stone-900/80" />
    <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors" />

    <div className="relative flex items-center gap-4 p-5">
      <div className="w-12 h-12 rounded-xl bg-amber-900/50 border border-amber-600/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
        <GiChessQueen className="w-7 h-7 text-amber-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-stone-100 text-lg">Tutorial</p>
        <p className="text-sm text-stone-400 mt-0.5">
          Cinematic story mode — learn every piece
        </p>
      </div>
      <IoChevronForward className="w-5 h-5 text-amber-500 shrink-0 group-hover:translate-x-1 transition-transform" />
    </div>
  </motion.button>
);
