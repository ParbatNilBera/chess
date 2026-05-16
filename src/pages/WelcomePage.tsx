import { useState } from "react";
import {
  IoPlay,
  IoInformationCircle,
  IoChevronForward,
} from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { GiChessKnight, GiChessPawn, GiChessQueen } from "react-icons/gi";
import { MdSmartToy } from "react-icons/md";
import type { Difficulty, GameMode } from "../types";
import { DIFFICULTIES } from "../constants/difficulties";
import { APP_SUBTITLE } from "../constants/branding";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { TutorialEntryButton } from "../components/ui/TutorialEntryButton";

interface WelcomePageProps {
  gameMode: GameMode;
  difficulty: Difficulty;
  onGameModeChange: (mode: GameMode) => void;
  onDifficultyChange: (d: Difficulty) => void;
  onStartGame: () => void;
  onOpenTutorial: () => void;
}

const difficultyIcons = {
  easy: GiChessPawn,
  medium: GiChessKnight,
  hard: GiChessQueen,
};

export const WelcomePage = ({
  gameMode,
  difficulty,
  onGameModeChange,
  onDifficultyChange,
  onStartGame,
  onOpenTutorial,
}: WelcomePageProps) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const isVsAI = gameMode === "ai";

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <Header subtitle={APP_SUBTITLE} />

          <div className="mb-4 animate-slide-up">
            <TutorialEntryButton onClick={onOpenTutorial} />
          </div>

          <Card className="p-6 mb-4 animate-slide-up">
            <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-4">
              Game Mode
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onGameModeChange("ai")}
                className={`
                  flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200
                  ${
                    isVsAI
                      ? "border-amber-600 bg-amber-900/20"
                      : "border-stone-700 bg-stone-800/30 hover:border-stone-600"
                  }
                `}
              >
                <MdSmartToy className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <p className="font-medium text-stone-100">vs AI</p>
                  <p className="text-xs text-stone-500">Minimax engine</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => onGameModeChange("local")}
                className={`
                  flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200
                  ${
                    !isVsAI
                      ? "border-amber-600 bg-amber-900/20"
                      : "border-stone-700 bg-stone-800/30 hover:border-stone-600"
                  }
                `}
              >
                <HiUsers className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <p className="font-medium text-stone-100">1 vs 1</p>
                  <p className="text-xs text-stone-500">Two players</p>
                </div>
              </button>
            </div>
          </Card>

          {isVsAI && (
            <Card className="p-6 mb-4 animate-slide-up">
              <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-4">
                AI Difficulty
              </h2>
              <div className="space-y-2">
                {DIFFICULTIES.map((d) => {
                  const Icon = difficultyIcons[d.id];
                  const isSelected = difficulty === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => onDifficultyChange(d.id)}
                      className={`
                        w-full flex items-center gap-4 p-4 rounded-xl text-left
                        border transition-all duration-200
                        ${
                          isSelected
                            ? "border-amber-600 bg-amber-900/20 shadow-lg shadow-amber-900/20"
                            : "border-stone-700 bg-stone-800/30 hover:border-stone-600 hover:bg-stone-800/50"
                        }
                      `}
                    >
                      <div
                        className={`
                          w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                          ${isSelected ? "bg-amber-700/40 text-amber-400" : "bg-stone-700/50 text-stone-400"}
                        `}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-stone-100">{d.label}</p>
                        <p className="text-xs text-stone-500 mt-0.5 truncate">
                          {d.description}
                        </p>
                      </div>
                      {isSelected && (
                        <IoChevronForward className="w-5 h-5 text-amber-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-3 animate-slide-up animation-delay-100">
            <Button
              variant="primary"
              size="lg"
              icon={<IoPlay className="w-5 h-5" />}
              onClick={onStartGame}
              className="flex-1"
            >
              {isVsAI ? "Play vs AI" : "Start 1 vs 1"}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              icon={<IoInformationCircle className="w-5 h-5" />}
              onClick={() => setShowInstructions((v) => !v)}
              className="sm:w-auto"
            >
              How to Play
            </Button>
          </div>

          {showInstructions && (
            <Card className="mt-4 p-5 animate-fade-in">
              <h3 className="font-semibold text-stone-200 mb-3">Instructions</h3>
              <ul className="space-y-2 text-sm text-stone-400 list-disc list-inside">
                <li>White moves first, then players alternate.</li>
                <li>Drag pieces or click to select and move.</li>
                <li>
                  <strong>vs AI:</strong> You play White; AI uses Minimax.
                </li>
                <li>
                  <strong>1 vs 1:</strong> Two players on the same device.
                </li>
                <li>Last move is highlighted on the board (from & to squares).</li>
                <li>Toggle theme with the button in the top-right corner.</li>
              </ul>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
