import { useState } from 'react';
import { characters } from '../data/characters';
import { useAppState } from '../hooks/useStore';
import { StrokeOrder } from '../components/StrokeOrder';
import { AudioButton } from '../components/AudioButton';
import { Search } from 'lucide-react';

export function Characters() {
  const { state } = useAppState();
  const [search, setSearch] = useState('');
  const [selectedChar, setSelectedChar] = useState(characters[0]);

  const filtered = characters.filter(c =>
    c.character.includes(search) || c.pinyin.includes(search.toLowerCase()) || c.meaning.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Characters 汉字</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Learn characters through stroke order, components, and radicals
        </p>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by character, pinyin, or meaning..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Character Grid */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-5 gap-2 max-h-[500px] overflow-y-auto">
            {filtered.map((c, i) => (
              <button
                key={c.character + i}
                onClick={() => setSelectedChar(c)}
                className={`aspect-square rounded-lg border flex flex-col items-center justify-center transition ${
                  selectedChar.character === c.character && selectedChar.pinyin === c.pinyin
                    ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-300'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                style={{ borderColor: selectedChar.character === c.character && selectedChar.pinyin === c.pinyin ? undefined : 'var(--border-color)' }}
              >
                <span className="text-xl chinese-char" style={{ color: 'var(--text-primary)' }}>{c.character}</span>
                <span className="text-[10px] text-primary-600">{c.pinyin}</span>
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center py-8 text-sm" style={{ color: 'var(--text-secondary)' }}>No characters found</p>
          )}
        </div>

        {/* Character Detail */}
        <div className="lg:col-span-2 space-y-4">
          {/* Basic Info */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="text-center">
                <p className="text-6xl chinese-char font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {selectedChar.character}
                </p>
                <div className="flex items-center justify-center gap-1">
                  <p className="text-lg text-primary-600">{selectedChar.pinyin}</p>
                  <AudioButton text={selectedChar.character} size="sm" />
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedChar.meaning}</p>
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <p className="text-[10px] font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>Radical</p>
                    <p className="text-xl chinese-char" style={{ color: 'var(--text-primary)' }}>{selectedChar.radical}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <p className="text-[10px] font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>Strokes</p>
                    <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{selectedChar.strokeCount}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <p className="text-[10px] font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>HSK Level</p>
                    <p className="text-xl font-bold text-primary-600">{selectedChar.hskLevel}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <p className="text-[10px] font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>Components</p>
                    <p className="text-sm chinese-char" style={{ color: 'var(--text-primary)' }}>{selectedChar.components.join(' + ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stroke Order Animation */}
          <StrokeOrder
            character={selectedChar.character}
            pinyin={selectedChar.pinyin}
            meaning={selectedChar.meaning}
          />

          {/* Example Words */}
          <div className="card">
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Example Words</h3>
            <div className="space-y-2">
              {selectedChar.examples.map((ex, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg border" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="chinese-char text-lg" style={{ color: 'var(--text-primary)' }}>{ex.word}</span>
                  <span className="text-sm text-primary-600">{ex.pinyin}</span>
                  <AudioButton text={ex.word} size="sm" />
                  <span className="text-sm ml-auto" style={{ color: 'var(--text-secondary)' }}>{ex.meaning}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Memory Tip */}
          <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">💡 Memory Tip</p>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              {selectedChar.components.length > 1
                ? `This character combines ${selectedChar.components.join(' + ')}. Think of it as "${selectedChar.components.map(c => characters.find(ch => ch.character === c)?.meaning || c).join('" + "')}" = "${selectedChar.meaning}"`
                : `This is a simple pictographic character. Try to see how ${selectedChar.character} looks like "${selectedChar.meaning}".`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
