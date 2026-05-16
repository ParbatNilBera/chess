import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { TutorialSlideData } from "./tutorialData";
import { TutorialBoard } from "./components/TutorialBoard";
import { TutorialNarration } from "./components/TutorialNarration";
import { fadeUpVariants } from "./tutorialAnimations";

const ACCENT_TITLE: Record<TutorialSlideData["accent"], string> = {
  gold: "text-amber-400",
  amber: "text-amber-500",
  crimson: "text-red-400",
  emerald: "text-emerald-400",
  violet: "text-violet-400",
};

interface TutorialSlideProps {
  slide: TutorialSlideData;
  direction: number;
}

export const TutorialSlide = ({ slide, direction }: TutorialSlideProps) => {
  const [boardWidth, setBoardWidth] = useState(320);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setBoardWidth(Math.min(w - 48, 300));
      else if (w < 768) setBoardWidth(340);
      else setBoardWidth(380);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const showBoard = slide.showBoard !== false;

  return (
    <motion.div
      custom={direction}
      initial={{ opacity: 0, x: direction * 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -60 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full max-w-5xl mx-auto"
    >
      {showBoard && (
        <div className="w-full lg:w-auto flex justify-center shrink-0 order-1 lg:order-none">
          <TutorialBoard
            fen={slide.fen}
            focusSquares={slide.focusSquares}
            highlightSquares={slide.highlightSquares}
            arrows={slide.arrows}
            dimBoard={slide.dimBoard}
            accent={slide.accent}
            animationSteps={slide.animationSteps}
            boardWidth={boardWidth}
          />
        </div>
      )}

      <div className="flex-1 w-full order-2 space-y-5">
        <motion.div variants={fadeUpVariants} initial="hidden" animate="visible">
          <span
            className={`text-xs font-bold uppercase tracking-[0.2em] ${ACCENT_TITLE[slide.accent]}`}
          >
            Chapter {slide.section}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-50 mt-1 tracking-tight">
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className="text-stone-500 text-sm mt-1">{slide.subtitle}</p>
          )}
        </motion.div>

        <TutorialNarration lines={slide.lines} slideKey={slide.id} />
      </div>
    </motion.div>
  );
};
