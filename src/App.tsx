import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppState } from './hooks/useStore';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Onboarding } from './pages/Onboarding';
import { Curriculum } from './pages/Curriculum';
import { LessonPage } from './pages/LessonPage';
import { Vocabulary } from './pages/Vocabulary';
import { Grammar } from './pages/Grammar';
import { Pinyin } from './pages/Pinyin';
import { Tones } from './pages/Tones';
import { Characters } from './pages/Characters';
import { Reading } from './pages/Reading';
import { Listening } from './pages/Listening';
import { Speaking } from './pages/Speaking';
import { Review } from './pages/Review';
import { Analytics } from './pages/Analytics';
import { Resources } from './pages/Resources';
import { Settings } from './pages/Settings';
import { HSK } from './pages/HSK';
import { Roadmap } from './pages/Roadmap';

function AppRoutes() {
  const { state } = useAppState();
  const isOnboarded = state.profile?.onboarded;

  if (!isOnboarded) {
    return <Onboarding />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/grammar" element={<Grammar />} />
        <Route path="/pinyin" element={<Pinyin />} />
        <Route path="/tones" element={<Tones />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/reading" element={<Reading />} />
        <Route path="/listening" element={<Listening />} />
        <Route path="/speaking" element={<Speaking />} />
        <Route path="/review" element={<Review />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/hsk" element={<HSK />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
