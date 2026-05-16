import { useState, useCallback } from "react";
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

interface TutorialPageProps {
  onClose: () => void;
  onStartPlaying: () => void;
  onPracticeAI: () => void;
}

export const TutorialPage = ({
  onClose,
  onStartPlaying,
  onPracticeAI,
}: TutorialPageProps) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const slide = TUTORIAL_SLIDES[index];
  const isFirst = index === 0;
  const isLast = index === TUTORIAL_SLIDES.length - 1;

  const go = useCallback((next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  }, [index]);

  const handleNext = () => {
    if (isLast) return;
    go(index + 1);
  };

  const handlePrev = () => {
    if (isFirst) return;
    go(index - 1);
  };

  const handleReplay = () => {
    setDirection(-1);
    setIndex(0);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden"
      {...pageTransition}
    >
      {/* Cinematic background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-black"
        animate={{
          background: [
            "radial-gradient(ellipse at 50% 0%, rgba(180,120,40,0.12) 0%, transparent 55%), linear-gradient(to bottom right, #0c0a09, #1c1917, #0c0a09)",
            "radial-gradient(ellipse at 80% 20%, rgba(180,120,40,0.08) 0%, transparent 50%), linear-gradient(to bottom right, #0c0a09, #1c1917, #0c0a09)",
            "radial-gradient(ellipse at 20% 30%, rgba(180,120,40,0.1) 0%, transparent 55%), linear-gradient(to bottom right, #0c0a09, #1c1917, #0c0a09)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-stone-800/60 backdrop-blur-md bg-stone-950/40">
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
          onClick={onClose}
          className="p-2.5 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800/80 border border-transparent hover:border-stone-700 transition-all"
          aria-label="Close tutorial"
        >
          <IoClose className="w-5 h-5" />
        </button>
      </header>

      {/* Content */}
      <main className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-8 py-8 flex flex-col">
        <div className="mb-6 max-w-5xl mx-auto w-full">
          <TutorialProgress current={index} total={TUTORIAL_SLIDES.length} />
        </div>

        <div className="flex-1 flex items-center justify-center py-4">
          <AnimatePresence mode="wait" custom={direction}>
            <TutorialSlide
              key={slide.id}
              slide={slide}
              direction={direction}
            />
          </AnimatePresence>
        </div>

        {/* Finale CTAs */}
        {isLast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mt-8 max-w-lg mx-auto w-full"
          >
            <Button
              variant="primary"
              size="lg"
              icon={<IoPlay className="w-5 h-5" />}
              onClick={onStartPlaying}
              className="flex-1"
            >
              Start Playing
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={<GiChessKing className="w-5 h-5" />}
              onClick={onPracticeAI}
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

      {/* Footer nav */}
      {!isLast && (
        <footer className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-5 border-t border-stone-800/60 backdrop-blur-md bg-stone-950/50">
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
