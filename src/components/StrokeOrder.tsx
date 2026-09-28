import { useState } from 'react';
import { Play, RotateCcw, Eye, Pencil } from 'lucide-react';

interface StrokeOrderProps {
  character: string;
  showOutline?: boolean;
  showPinyin?: boolean;
  pinyin?: string;
  meaning?: string;
  animationSpeed?: number;
}

export function StrokeOrder({ 
  character, 
  showPinyin = true, 
  pinyin, 
  meaning,
}: StrokeOrderProps) {
  const [mode, setMode] = useState<'animate' | 'quiz'>('animate');
  const [showCharacter, setShowCharacter] = useState(true);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
          Stroke Order
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => setMode('animate')}
            className={`px-2 py-1 rounded text-xs font-medium transition ${
              mode === 'animate' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            style={mode !== 'animate' ? { color: 'var(--text-secondary)' } : undefined}
          >
            <Eye size={12} className="inline mr-1" /> Watch
          </button>
          <button
            onClick={() => setMode('quiz')}
            className={`px-2 py-1 rounded text-xs font-medium transition ${
              mode === 'quiz' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            style={mode !== 'quiz' ? { color: 'var(--text-secondary)' } : undefined}
          >
            <Pencil size={12} className="inline mr-1" /> Practice
          </button>
        </div>
      </div>

      {/* Character Display */}
      <div className="text-center mb-2">
        {showPinyin && pinyin && (
          <p className="text-sm text-primary-600 mb-1">{pinyin}</p>
        )}
        {meaning && (
          <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>{meaning}</p>
        )}
      </div>

      {/* Character Display Area */}
      <div className="flex justify-center mb-3">
        <div className="border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 relative overflow-hidden flex items-center justify-center" style={{ width: 200, height: 200 }}>
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 200 200">
            <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeDasharray="4,4" />
            <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeDasharray="4,4" />
            <line x1="0" y1="0" x2="200" y2="200" stroke="currentColor" strokeDasharray="4,4" />
            <line x1="200" y1="0" x2="0" y2="200" stroke="currentColor" strokeDasharray="4,4" />
          </svg>
          
          {/* Character */}
          <span className="text-8xl chinese-char font-bold relative z-10" style={{ color: 'var(--text-primary)', opacity: showCharacter ? 1 : 0 }}>
            {character}
          </span>

          {/* Quiz mode overlay */}
          {mode === 'quiz' && (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-50/50 dark:bg-blue-900/20">
              <p className="text-sm text-blue-600 dark:text-blue-400">Practice mode - Coming soon</p>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => {
            setShowCharacter(false);
            setTimeout(() => setShowCharacter(true), 500);
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition"
        >
          <Play size={14} />
          Animate
        </button>
        <button
          onClick={() => setShowCharacter(!showCharacter)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg btn-secondary text-sm"
        >
          <Eye size={14} />
          {showCharacter ? 'Hide' : 'Show'}
        </button>
      </div>

      {/* Info */}
      <div className="mt-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-700 dark:text-blue-400">
          💡 Full stroke order animation coming soon. For now, focus on recognizing the character structure.
        </p>
      </div>
    </div>
  );
}
