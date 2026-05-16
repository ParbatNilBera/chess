import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoChevronBack,
  IoChevronForward,
  IoClose,
  IoPlay,
  IoRefresh,
} from "react-icons/io5";
import { GiChessKing } from "react-icons/gi";
import { TUTORIAL_SLIDES } from "./tutorialData";
import { TutorialSlide } from "./TutorialSlide";
import { TutorialProgress } from "./components/TutorialProgress";
import { pageTransition } from "./tutorialAnimations";
import { Button } from "../components/ui/Button";
import { APP_TAGLINE } from "../constants/branding";
import { useSettings } from "../context/SettingsContext";

export const TutorialPage = () => {
  const navigate = useNavigate();
  const { setGameMode } = useSettings();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const slide = TUTORIAL_SLIDES[index];
  const isFirst = index === 0;
  const isLast = index === TUTORIAL_SLIDES.length - 1;

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index]
  );

  const handleNext = () => {
    if (!isLast) go(index + 1);
  };

  const handlePrev = () => {
    if (!isFirst) go(index - 1);
  };

  const handleReplay = () => {
    setDirection(-1);
    setIndex(0);
  };

  const handlePracticeAI = () => {
    setGameMode("ai");
    navigate("/game");
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden"
      {...pageTransition}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-black" />
      <motion.div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_50%_0%,rgba(180,120,40,0.15),transparent_55%)]" />

      <header className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-stone-800/60 bg-stone-950/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-900/40 border border-amber-700/40 flex items-center justify-center">
            <GiChessKing className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-100">Chess Academy</p>
            <p className="text-xs text-stone-500 hidden sm:block">{APP_TAGLINE}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="p-2.5 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          aria-label="Close tutorial"
        >
          <IoClose className="w-5 h-5" />
        </button>
      </header>

      <main className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-8 py-6 flex flex-col">
        <div className="mb-6 max-w-5xl mx-auto w-full">
          <TutorialProgress current={index} total={TUTORIAL_SLIDES.length} />
        </div>

        <div className="flex-1 flex items-center justify-center py-4 min-h-0">
          <AnimatePresence mode="wait" custom={direction}>
            <TutorialSlide key={slide.id} slide={slide} direction={direction} />
          </AnimatePresence>
        </div>

        {isLast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mt-6 max-w-lg mx-auto w-full pb-4"
          >
            <Button
              variant="primary"
              size="lg"
              icon={<IoPlay className="w-5 h-5" />}
              onClick={() => navigate("/game")}
              className="flex-1"
            >
              Start Playing
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={<GiChessKing className="w-5 h-5" />}
              onClick={handlePracticeAI}
              className="flex-1"
            >
              Practice vs AI
            </Button>
            <Button
              variant="ghost"
              size="lg"
              icon={<IoRefresh className="w-5 h-5" />}
              onClick={handleReplay}
            >
              Replay
            </Button>
          </motion.div>
        )}
      </main>

      {!isLast && (
        <footer className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 border-t border-stone-800/60 bg-stone-950/50 backdrop-blur-md pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button
            variant="ghost"
            size="md"
            icon={<IoChevronBack className="w-4 h-4" />}
            onClick={handlePrev}
            disabled={isFirst}
          >
            Back
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={<IoChevronForward className="w-4 h-4" />}
            onClick={handleNext}
          >
            Continue
          </Button>
        </footer>
      )}
    </motion.div>
  );
};
