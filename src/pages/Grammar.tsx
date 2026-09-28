import { useState } from 'react';
import { grammarPoints } from '../data/grammar';
import { Search } from 'lucide-react';

export function Grammar() {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(grammarPoints[0]?.id || null);

  const filtered = grammarPoints.filter(gp =>
    gp.title.toLowerCase().includes(search.toLowerCase()) ||
    gp.meaning.toLowerCase().includes(search.toLowerCase()) ||
    gp.tags.some(t => t.includes(search.toLowerCase()))
  );

  const selected = grammarPoints.find(gp => gp.id === selectedId);

  return (
    <div className="animate-fade-in space-y-4">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Grammar</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          {grammarPoints.length} grammar points • Searchable database
        </p>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search grammar points..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* List */}
        <div className="space-y-1 max-h-[600px] overflow-y-auto">
          {filtered.map(gp => (
            <button
              key={gp.id}
              onClick={() => setSelectedId(gp.id)}
              className={`w-full text-left p-3 rounded-lg border transition ${
                selectedId === gp.id ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              style={{ borderColor: selectedId === gp.id ? undefined : 'var(--border-color)' }}
            >
              <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{gp.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700" style={{ color: 'var(--text-secondary)' }}>
                  HSK{gp.hskLevel}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{gp.level}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="lg:col-span-2 card">
          {selected ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{selected.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700">HSK {selected.hskLevel}</span>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{selected.level}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Meaning</p>
                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{selected.meaning}</p>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Structure</p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <p className="font-mono text-sm" style={{ color: 'var(--text-primary)' }}>{selected.structure}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Examples</p>
                <div className="space-y-3">
                  {selected.examples.map((ex, i) => (
                    <div key={i} className="p-3 rounded-lg border" style={{ borderColor: 'var(--border-color)' }}>
                      <p className="chinese-char text-lg" style={{ color: 'var(--text-primary)' }}>{ex.chinese}</p>
                      <p className="text-sm text-primary-600 mt-1">{ex.pinyin}</p>
                      <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>{ex.english}</p>
                    </div>
                  ))}
                </div>
              </div>

              {selected.commonMistakes.length > 0 && (
                <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                  <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 mb-2">⚠️ Common Mistakes</p>
                  {selected.commonMistakes.map((m, i) => (
                    <p key={i} className="text-sm text-yellow-700 dark:text-yellow-400 mb-1">• {m}</p>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {selected.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700" style={{ color: 'var(--text-secondary)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p style={{ color: 'var(--text-secondary)' }}>Select a grammar point</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
