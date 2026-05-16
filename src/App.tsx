import { useState, useCallback } from "react";
import type { AppScreen, Difficulty, GameMode } from "./types";
import { AppLayout } from "./components/layout/AppLayout";
import { WelcomePage } from "./pages/WelcomePage";
import { GamePage } from "./pages/GamePage";
import { TutorialPage } from "./tutorial/TutorialPage";

const App = () => {
  const [screen, setScreen] = useState<AppScreen>("welcome");
  const [gameMode, setGameMode] = useState<GameMode>("ai");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [gameSession, setGameSession] = useState(0);

  const handleStartGame = useCallback(() => {
    setGameSession((n) => n + 1);
    setScreen("game");
  }, []);

  const handleHome = useCallback(() => {
    setScreen("welcome");
  }, []);

  const handleOpenTutorial = useCallback(() => {
    setScreen("tutorial");
  }, []);

  const handlePracticeAI = useCallback(() => {
    setGameMode("ai");
    setGameSession((n) => n + 1);
    setScreen("game");
  }, []);

  if (screen === "tutorial") {
    return (
      <TutorialPage
        onClose={handleHome}
        onStartPlaying={handleStartGame}
        onPracticeAI={handlePracticeAI}
      />
    );
  }

  return (
    <AppLayout>
      {screen === "welcome" ? (
        <WelcomePage
          gameMode={gameMode}
          difficulty={difficulty}
          onGameModeChange={setGameMode}
          onDifficultyChange={setDifficulty}
          onStartGame={handleStartGame}
          onOpenTutorial={handleOpenTutorial}
        />
      ) : (
        <GamePage
          key={`${gameMode}-${difficulty}-${gameSession}`}
          gameMode={gameMode}
          difficulty={difficulty}
          onHome={handleHome}
        />
      )}
    </AppLayout>
  );
};

export default App;
