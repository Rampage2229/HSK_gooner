import { useState } from 'react';
import { allVocabulary } from '../data/vocabulary';
import { useAppState } from '../hooks/useStore';
import { Search, Filter, Star, Bookmark } from 'lucide-react';
import { HSKLevel } from '../types';

export function Vocabulary() {
  const { state, dispatch } = useAppState();
  const [search, setSearch] = useState('');
  const [hskFilter, setHskFilter] = useState<HSKLevel | 'all'>('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('mandarin-favorites') || '[]'); } catch { return []; }
  });
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('mandarin-favorites', JSON.stringify(newFavs));
  };

  let filtered = allVocabulary;
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(w =>
      w.simplified.includes(s) || w.pinyin.includes(s) || w.meaning.toLowerCase().includes(s) || w.traditional.includes(s)
    );
  }
  if (hskFilter !== 'all') {
    filtered = filtered.filter(w => w.hskLevel === hskFilter);
  }
  if (showFavorites) {
    filtered = filtered.filter(w => favorites.includes(w.id));
  }

  const selected = selectedWord ? allVocabulary.find(w => w.id === selectedWord) : null;

  return (
    <div className="animate-fade-in space-y-4">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Vocabulary</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          {allVocabulary.length} words • Search, filter, and study
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search words..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          />
        </div>
        <select
          value={hskFilter}
          onChange={e => setHskFilter(e.target.value === 'all' ? 'all' : Number(e.target.value) as HSKLevel)}
          className="px-3 py-2 rounded-lg border text-sm"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        >
          <option value="all">All HSK</option>
          <option value="1">HSK 1</option>
          <option value="2">HSK 2</option>
          <option value="3">HSK 3</option>
          <option value="4">HSK 4</option>
          <option value="5">HSK 5</option>
        </select>
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`px-3 py-2 rounded-lg border text-sm flex items-center gap-1 transition ${showFavorites ? 'bg-accent-100 dark:bg-accent-900/30 border-accent-300' : ''}`}
          style={{ borderColor: showFavorites ? undefined : 'var(--border-color)', color: 'var(--text-primary)' }}
        >
          <Star size={14} /> Favorites
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Word List */}
        <div className="lg:col-span-2 space-y-1 max-h-[600px] overflow-y-auto">
          {filtered.map(word => (
            <button
              key={word.id}
              onClick={() => setSelectedWord(word.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition ${
                selectedWord === word.id ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              style={{ borderColor: selectedWord === word.id ? undefined : 'var(--border-color)' }}
            >
              <span className="text-lg chinese-char w-16 text-center" style={{ color: 'var(--text-primary)' }}>
                {state.characterSet === 'traditional' ? word.traditional : word.simplified}
              </span>
              <span className="text-sm text-primary-600 w-24">{word.pinyin}</span>
              <span className="text-sm flex-1 truncate" style={{ color: 'var(--text-secondary)' }}>{word.meaning}</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700" style={{ color: 'var(--text-secondary)' }}>
                HSK{word.hskLevel}
              </span>
              <button
                onClick={e => { e.stopPropagation(); toggleFavorite(word.id); }}
                className={`p-1 ${favorites.includes(word.id) ? 'text-accent-400' : 'text-gray-300'}`}
              >
                <Star size={14} fill={favorites.includes(word.id) ? 'currentColor' : 'none'} />
              </button>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>No words found</p>
          )}
        </div>

        {/* Detail Panel */}
        <div className="card">
          {selected ? (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-5xl chinese-char mb-2" style={{ color: 'var(--text-primary)' }}>
                  {state.characterSet === 'traditional' ? selected.traditional : selected.simplified}
                </p>
                <p className="text-lg text-primary-600">{selected.pinyin}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selected.meaning}</p>
              </div>
              <div className="border-t pt-3" style={{ borderColor: 'var(--border-color)' }}>
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>EXAMPLE</p>
                <p className="chinese-char text-lg" style={{ color: 'var(--text-primary)' }}>{selected.exampleSentence}</p>
                <p className="text-sm text-primary-600 mt-1">{selected.examplePinyin}</p>
                <p className="text-sm italic mt-1" style={{ color: 'var(--text-secondary)' }}>{selected.exampleTranslation}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {selected.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700" style={{ color: 'var(--text-secondary)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => {
                  dispatch({
                    type: 'UPDATE_SRS',
                    payload: {
                      wordId: selected.id,
                      status: 'learning',
                      nextReview: new Date(Date.now() + 86400000).toISOString(),
                      interval: 1,
                      repetitions: 0,
                      easeFactor: 2.5,
                      lastReviewed: new Date().toISOString(),
                    }
                  });
                }}
                className="btn-primary w-full"
              >
                Add to SRS Review
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Select a word to see details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
