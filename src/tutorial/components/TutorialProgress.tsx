import { motion } from "framer-motion";

interface TutorialProgressProps {
  current: number;
  total: number;
}

export const TutorialProgress = ({ current, total }: TutorialProgressProps) => (
  <motion.div
    className="flex items-center gap-2 w-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <span className="text-xs text-stone-500 tabular-nums shrink-0">
      {current + 1}/{total}
    </span>
    <div className="flex-1 h-1 bg-stone-800 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-amber-700 to-amber-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${((current + 1) / total) * 100}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  </motion.div>
);
