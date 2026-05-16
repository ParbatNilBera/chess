import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoPlay,
  IoInformationCircle,
  IoChevronForward,
} from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { GiChessKnight, GiChessPawn, GiChessQueen } from "react-icons/gi";
import { MdSmartToy } from "react-icons/md";
import { DIFFICULTIES } from "../constants/difficulties";
import { APP_SUBTITLE } from "../constants/branding";
import { useSettings } from "../context/SettingsContext";
import { Header } from "../components/layout/Header";
import { TopBar } from "../components/layout/TopBar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { TutorialEntryButton } from "../components/ui/TutorialEntryButton";
import { BoardCustomizer } from "../components/settings/BoardCustomizer";

const difficultyIcons = {
  easy: GiChessPawn,
  medium: GiChessKnight,
  hard: GiChessQueen,
};

export const WelcomePage = () => {
  const navigate = useNavigate();
  const { gameMode, setGameMode, difficulty, setDifficulty } = useSettings();
  const [showInstructions, setShowInstructions] = useState(false);
  const isVsAI = gameMode === "ai";

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <TopBar />

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
        <div className="px-4 py-6 pb-10 max-w-lg mx-auto w-full">
          <Header subtitle={APP_SUBTITLE} />

          <div className="mb-4 animate-slide-up">
            <TutorialEntryButton onClick={() => navigate("/tutorial")} />
          </div>

          <Card className="p-5 mb-4">
            <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-4">
              Game Mode
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGameMode("ai")}
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
                onClick={() => setGameMode("local")}
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
            <Card className="p-5 mb-4">
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
                      onClick={() => setDifficulty(d.id)}
                      className={`
                        w-full flex items-center gap-4 p-4 rounded-xl text-left border transition-all duration-200
                        ${
                          isSelected
                            ? "border-amber-600 bg-amber-900/20 shadow-lg shadow-amber-900/20"
                            : "border-stone-700 bg-stone-800/30 hover:border-stone-600"
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
                        <p className="text-xs text-stone-500 mt-0.5">{d.description}</p>
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

          <div className="mb-4">
            <BoardCustomizer />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sticky bottom-0 py-3 bg-stone-950/80 backdrop-blur-md -mx-4 px-4 border-t border-stone-800/50 sm:static sm:bg-transparent sm:border-0 sm:p-0 sm:mx-0">
            <Button
              variant="primary"
              size="lg"
              icon={<IoPlay className="w-5 h-5" />}
              onClick={() => navigate("/game")}
              className="flex-1"
            >
              {isVsAI ? "Play vs AI" : "Start 1 vs 1"}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              icon={<IoInformationCircle className="w-5 h-5" />}
              onClick={() => setShowInstructions((v) => !v)}
            >
              Help
            </Button>
          </div>

          {showInstructions && (
            <Card className="mt-4 p-5 animate-fade-in">
              <h3 className="font-semibold text-stone-200 mb-3">Instructions</h3>
              <ul className="space-y-2 text-sm text-stone-400 list-disc list-inside">
                <li>White moves first, then players alternate.</li>
                <li>Drag pieces or tap to select and move.</li>
                <li>Customize board colors below — saved automatically.</li>
                <li>On mobile, Undo / Restart / Home are fixed at the bottom.</li>
              </ul>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
