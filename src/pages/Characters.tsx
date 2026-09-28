import { useState } from 'react';
import { characters } from '../data/characters';
import { useAppState } from '../hooks/useStore';
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
          Learn to recognize Chinese characters through components and radicals
        </p>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search characters..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Character Grid */}
        <div className="lg:col-span-1 grid grid-cols-5 gap-2 max-h-[500px] overflow-y-auto">
          {filtered.map(c => (
            <button
              key={c.character + c.pinyin}
              onClick={() => setSelectedChar(c)}
              className={`aspect-square rounded-lg border flex flex-col items-center justify-center transition ${
                selectedChar.character === c.character && selectedChar.pinyin === c.pinyin
                  ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              style={{ borderColor: selectedChar.character === c.character && selectedChar.pinyin === c.pinyin ? undefined : 'var(--border-color)' }}
            >
              <span className="text-xl chinese-char" style={{ color: 'var(--text-primary)' }}>{c.character}</span>
              <span className="text-[10px] text-primary-600">{c.pinyin}</span>
            </button>
          ))}
        </div>

        {/* Character Detail */}
        <div className="lg:col-span-2 card">
          <div className="text-center mb-6">
            <p className="text-7xl chinese-char font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {selectedChar.character}
            </p>
            <p className="text-xl text-primary-600">{selectedChar.pinyin}</p>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>{selectedChar.meaning}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>RADICAL</p>
              <p className="text-2xl chinese-char" style={{ color: 'var(--text-primary)' }}>{selectedChar.radical}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>STROKES</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{selectedChar.strokeCount}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>COMPONENTS</p>
            <div className="flex gap-2">
              {selectedChar.components.map((comp, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm chinese-char">
                  {comp}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>EXAMPLE WORDS</p>
            <div className="space-y-2">
              {selectedChar.examples.map((ex, i) => (
                <div key={i} className="p-2 rounded-lg border" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="chinese-char text-lg" style={{ color: 'var(--text-primary)' }}>{ex.word}</span>
                  <span className="text-sm text-primary-600 ml-2">{ex.pinyin}</span>
                  <span className="text-sm ml-2" style={{ color: 'var(--text-secondary)' }}>{ex.meaning}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
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
