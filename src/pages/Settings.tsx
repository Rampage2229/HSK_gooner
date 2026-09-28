import { useAppState } from '../hooks/useStore';
import { Sun, Moon, RotateCcw } from 'lucide-react';

export function Settings() {
  const { state, dispatch } = useAppState();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem('mandarin-app-state');
      window.location.reload();
    }
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Customize your learning experience</p>
      </div>

      {/* Theme */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Appearance</h2>
        <div className="flex gap-3">
          <button
            onClick={() => state.theme !== 'light' && dispatch({ type: 'TOGGLE_THEME' })}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${state.theme === 'light' ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20' : ''}`}
            style={{ borderColor: state.theme === 'light' ? undefined : 'var(--border-color)' }}
          >
            <Sun size={18} /> Light
          </button>
          <button
            onClick={() => state.theme !== 'dark' && dispatch({ type: 'TOGGLE_THEME' })}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${state.theme === 'dark' ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20' : ''}`}
            style={{ borderColor: state.theme === 'dark' ? undefined : 'var(--border-color)' }}
          >
            <Moon size={18} /> Dark
          </button>
        </div>
      </div>

      {/* Character Set */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Character Set</h2>
        <div className="flex gap-3">
          {(['simplified', 'traditional', 'both'] as const).map(set => (
            <button
              key={set}
              onClick={() => dispatch({ type: 'SET_CHARACTER_SET', payload: set })}
              className={`px-4 py-2 rounded-lg border transition ${state.characterSet === set ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20' : ''}`}
              style={{ borderColor: state.characterSet === set ? undefined : 'var(--border-color)' }}
            >
              <span className="chinese-char">{set === 'simplified' ? '简体' : set === 'traditional' ? '繁體' : '双体'}</span>
              <span className="text-sm ml-2 capitalize" style={{ color: 'var(--text-secondary)' }}>{set}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Profile */}
      {state.profile && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Your Profile</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>Experience</p>
              <p style={{ color: 'var(--text-primary)' }}>{state.profile.experience}</p>
            </div>
            <div>
              <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>Goal</p>
              <p style={{ color: 'var(--text-primary)' }}>{state.profile.goal}</p>
            </div>
            <div>
              <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>Daily Time</p>
              <p style={{ color: 'var(--text-primary)' }}>{state.profile.dailyTime}</p>
            </div>
            <div>
              <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>Speaking Priority</p>
              <p style={{ color: 'var(--text-primary)' }}>{state.profile.speakingPriority}</p>
            </div>
            <div>
              <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>Start Date</p>
              <p style={{ color: 'var(--text-primary)' }}>{new Date(state.profile.startDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Study Plan */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Daily Study Plan</h2>
        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>Based on your available time:</p>
        <div className="space-y-2">
          {[
            { activity: 'SRS Review', time: '20 min', icon: '🔄' },
            { activity: 'Grammar Study', time: '25 min', icon: '📐' },
            { activity: 'Listening', time: '30 min', icon: '🎧' },
            { activity: 'Reading', time: '20 min', icon: '📚' },
            { activity: 'Speaking', time: '20 min', icon: '🗣' },
          ].map(item => (
            <div key={item.activity} className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <span>{item.icon}</span>
              <span className="flex-1 text-sm" style={{ color: 'var(--text-primary)' }}>{item.activity}</span>
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Data</h2>
        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          All data is stored locally in your browser. No account needed.
        </p>
        <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition text-sm">
          <RotateCcw size={14} /> Reset All Progress
        </button>
      </div>
    </div>
  );
}
