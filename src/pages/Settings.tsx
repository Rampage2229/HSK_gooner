import { useAppState } from '../hooks/useStore';
import { Sun, Moon, RotateCcw, Download, Upload } from 'lucide-react';

export function Settings() {
  const { state, dispatch } = useAppState();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem('mandarin-app-state');
      window.location.reload();
    }
  };

  const handleExport = () => {
    const data = localStorage.getItem('mandarin-app-state');
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mandarin-progress-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = event.target?.result as string;
          localStorage.setItem('mandarin-app-state', data);
          window.location.reload();
        } catch {
          alert('Invalid backup file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Customize your experience</p>
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
              <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>Start Date</p>
              <p style={{ color: 'var(--text-primary)' }}>{new Date(state.profile.startDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Data Management */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Data Management</h2>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Your progress is stored locally in your browser. Export regularly to avoid losing data.
        </p>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-green-300 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition text-sm"
          >
            <Download size={16} /> Export Progress
          </button>
          <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-300 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition text-sm cursor-pointer">
            <Upload size={16} /> Import Progress
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition text-sm"
          >
            <RotateCcw size={16} /> Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
}
