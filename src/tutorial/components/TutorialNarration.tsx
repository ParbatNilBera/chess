import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUpVariants } from "../tutorialAnimations";

interface TutorialNarrationProps {
  lines: string[];
  slideKey: string;
}

export const TutorialNarration = ({ lines, slideKey }: TutorialNarrationProps) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");

  const currentLine = lines[lineIndex] ?? "";

  useEffect(() => {
    setLineIndex(0);
    setDisplayed("");
  }, [slideKey]);

  useEffect(() => {
    setDisplayed("");
    let charIndex = 0;
    const typeTimer = setInterval(() => {
      charIndex += 1;
      setDisplayed(currentLine.slice(0, charIndex));
      if (charIndex >= currentLine.length) {
        clearInterval(typeTimer);
        if (lineIndex < lines.length - 1) {
          setTimeout(() => setLineIndex((p) => p + 1), 850);
        }
      }
    }, 26);
    return () => clearInterval(typeTimer);
  }, [currentLine, lineIndex, lines.length]);

  return (
    <motion.div className="space-y-4 min-h-[8rem]">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${slideKey}-${lineIndex}`}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -8 }}
        >
          <p className="text-lg sm:text-xl text-stone-200 leading-relaxed font-light">
            {displayed}
            <span className="inline-block w-0.5 h-5 ml-0.5 bg-amber-400 animate-pulse align-middle" />
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-1.5">
        {lines.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === lineIndex
                ? "w-8 bg-amber-500"
                : i < lineIndex
                  ? "w-3 bg-amber-700/60"
                  : "w-3 bg-stone-700"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};
