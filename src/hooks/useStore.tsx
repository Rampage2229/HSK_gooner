import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { UserProfile, Progress, DailyTask, SRSItem, StudySession } from '../types';

interface AppState {
  profile: UserProfile | null;
  progress: Progress;
  theme: 'light' | 'dark';
  characterSet: 'simplified' | 'traditional' | 'both';
  sidebarOpen: boolean;
}

type Action =
  | { type: 'SET_PROFILE'; payload: UserProfile }
  | { type: 'COMPLETE_LESSON'; payload: string }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'ADD_STUDY_SESSION'; payload: StudySession }
  | { type: 'UPDATE_PROGRESS'; payload: Partial<Progress> }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_CHARACTER_SET'; payload: 'simplified' | 'traditional' | 'both' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'UPDATE_SRS'; payload: SRSItem }
  | { type: 'SET_DAILY_TASKS'; payload: DailyTask[] }
  | { type: 'ADD_XP'; payload: number };

const defaultProgress: Progress = {
  totalStudyTime: 0,
  currentStreak: 0,
  longestStreak: 0,
  vocabularyLearned: 0,
  charactersLearned: 0,
  grammarCompleted: 0,
  listeningMinutes: 0,
  readingMinutes: 0,
  speakingMinutes: 0,
  writingExercises: 0,
  xp: 0,
  level: 1,
  sessions: [],
  completedLessons: [],
  completedExercises: [],
  srsItems: [],
  dailyTasks: [],
  lastStudyDate: '',
};

const initialState: AppState = {
  profile: null,
  progress: defaultProgress,
  theme: 'light',
  characterSet: 'simplified',
  sidebarOpen: true,
};

function loadState(): AppState {
  try {
    const saved = localStorage.getItem('mandarin-app-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...initialState, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load state:', e);
  }
  return initialState;
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    case 'COMPLETE_LESSON': {
      const completedLessons = state.progress.completedLessons.includes(action.payload)
        ? state.progress.completedLessons
        : [...state.progress.completedLessons, action.payload];
      return { ...state, progress: { ...state.progress, completedLessons } };
    }
    case 'COMPLETE_TASK': {
      const dailyTasks = state.progress.dailyTasks.map(t =>
        t.id === action.payload ? { ...t, completed: true } : t
      );
      return { ...state, progress: { ...state.progress, dailyTasks } };
    }
    case 'ADD_STUDY_SESSION': {
      const sessions = [...state.progress.sessions, action.payload];
      const totalStudyTime = state.progress.totalStudyTime + action.payload.duration;
      return { ...state, progress: { ...state.progress, sessions, totalStudyTime } };
    }
    case 'UPDATE_PROGRESS':
      return { ...state, progress: { ...state.progress, ...action.payload } };
    case 'TOGGLE_THEME': {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      localStorage.setItem('mandarin-theme', newTheme);
      return { ...state, theme: newTheme };
    }
    case 'SET_CHARACTER_SET':
      return { ...state, characterSet: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'UPDATE_SRS': {
      const srsItems = state.progress.srsItems.map(i =>
        i.wordId === action.payload.wordId ? action.payload : i
      );
      const exists = srsItems.some(i => i.wordId === action.payload.wordId);
      if (!exists) srsItems.push(action.payload);
      return { ...state, progress: { ...state.progress, srsItems } };
    }
    case 'SET_DAILY_TASKS':
      return { ...state, progress: { ...state.progress, dailyTasks: action.payload } };
    case 'ADD_XP': {
      const xp = state.progress.xp + action.payload;
      const level = Math.floor(xp / 100) + 1;
      return { ...state, progress: { ...state.progress, xp, level } };
    }
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    localStorage.setItem('mandarin-app-state', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('mandarin-theme') as 'light' | 'dark' | null;
    if (savedTheme && savedTheme !== state.theme) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(savedTheme);
      dispatch({ type: 'TOGGLE_THEME' });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppState must be used within AppProvider');
  return context;
}

export function useProgress() {
  const { state } = useAppState();
  return state.progress;
}

export function useProfile() {
  const { state } = useAppState();
  return state.profile;
}
