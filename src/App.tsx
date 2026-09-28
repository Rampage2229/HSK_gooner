import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppState } from './hooks/useStore';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Onboarding } from './pages/Onboarding';
import { Curriculum } from './pages/Curriculum';
import { LessonPage } from './pages/LessonPage';
import { Vocabulary } from './pages/Vocabulary';
import { Tones } from './pages/Tones';
import { Characters } from './pages/Characters';
import { Resources } from './pages/Resources';
import { Settings } from './pages/Settings';

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
        <Route path="/tones" element={<Tones />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/settings" element={<Settings />} />
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
