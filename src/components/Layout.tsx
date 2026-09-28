import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppState } from '../hooks/useStore';
import {
  LayoutDashboard, BookOpen, GraduationCap, Volume2, Music,
  PenTool, BookMarked, Headphones, Mic, RotateCcw, BarChart3,
  Globe, Settings, Award, Map, Menu, X, Sun, Moon
} from 'lucide-react';


interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/curriculum', icon: BookOpen, label: 'Curriculum' },
  { path: '/roadmap', icon: Map, label: 'Roadmap' },
  { path: '/pinyin', icon: Volume2, label: 'Pinyin' },
  { path: '/tones', icon: Music, label: 'Tones' },
  { path: '/characters', icon: PenTool, label: 'Characters' },
  { path: '/vocabulary', icon: BookMarked, label: 'Vocabulary' },
  { path: '/grammar', icon: GraduationCap, label: 'Grammar' },
  { path: '/reading', icon: BookOpen, label: 'Reading' },
  { path: '/listening', icon: Headphones, label: 'Listening' },
  { path: '/speaking', icon: Mic, label: 'Speaking' },
  { path: '/review', icon: RotateCcw, label: 'SRS Review' },
  { path: '/hsk', icon: Award, label: 'HSK' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/resources', icon: Globe, label: 'Resources' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function Layout({ children }: LayoutProps) {
  const { state, dispatch } = useAppState();
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col w-64 border-r transition-all duration-300 ${state.sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden'}`}
        style={{ backgroundColor: 'var(--sidebar-bg)', borderColor: 'var(--border-color)' }}
      >
        <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <span className="text-2xl">🀄</span>
            <span style={{ color: 'var(--text-primary)' }}>Mandarin<span className="text-primary-500">Zero→HSK5</span></span>
          </h1>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Your complete learning system</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              XP: {state.progress.xp} • Lv.{state.progress.level}
            </span>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {state.theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-3 border-b" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <button onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })} className="p-2">
          {state.sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <h1 className="text-sm font-bold">🀄 MandarinZero→HSK5</h1>
        <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          Lv.{state.progress.level}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {state.sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })} />
          <aside className="relative w-64 flex flex-col h-full animate-slide-in" style={{ backgroundColor: 'var(--bg-card)' }}>
            <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <h1 className="text-lg font-bold">🀄 Mandarin<span className="text-primary-500">Zero→HSK5</span></h1>
            </div>
            <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
                  className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-14 pb-16 lg:pt-0 lg:pb-0">
        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around border-t py-2 px-1 z-40" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        {[
          { path: '/', icon: LayoutDashboard, label: 'Home' },
          { path: '/curriculum', icon: BookOpen, label: 'Learn' },
          { path: '/review', icon: RotateCcw, label: 'Review' },
          { path: '/tones', icon: Music, label: 'Tones' },
          { path: '/characters', icon: PenTool, label: 'Chars' },
        ].map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition ${
              location.pathname === item.path ? 'text-primary-500' : ''
            }`}
            style={location.pathname !== item.path ? { color: 'var(--text-secondary)' } : undefined}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
