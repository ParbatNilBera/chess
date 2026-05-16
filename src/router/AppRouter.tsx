import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SettingsProvider } from "../context/SettingsContext";
import { AppLayout } from "../components/layout/AppLayout";
import { WelcomePage } from "../pages/WelcomePage";
import { GamePage } from "../pages/GamePage";
import { TutorialPage } from "../tutorial/TutorialPage";

export const AppRouter = () => (
  <BrowserRouter>
    <SettingsProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/game" element={<GamePage />} />
        </Route>
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SettingsProvider>
  </BrowserRouter>
);
