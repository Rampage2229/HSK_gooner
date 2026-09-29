import { useState } from 'react';
import { grammarPoints } from '../data/grammar';
import { grammarExercises } from '../data/grammarExercises';
import { GrammarExercise } from '../components/GrammarExercise';
import { useAppState } from '../hooks/useStore';
import { Search, CheckCircle } from 'lucide-react';

export function Grammar() {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(grammarPoints[0]?.id || null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const { state, dispatch } = useAppState();

  const filtered = grammarPoints.filter(gp =>
    gp.title.toLowerCase().includes(search.toLowerCase()) ||
    gp.meaning.toLowerCase().includes(search.toLowerCase()) ||
    gp.tags.some(t => t.includes(search.toLowerCase()))
  );

  const selected = grammarPoints.find(gp => gp.id === selectedId);
  const exercises = selected ? grammarExercises.filter(ex => ex.grammarId === selected.id) : [];
  const currentExercise = exercises[currentExerciseIndex];
  
  // Track completed exercises
  const completedExercises = state.progress.completedExercises || [];
  const isExerciseCompleted = (exerciseId: string) => completedExercises.includes(exerciseId);
  
  const handleExerciseComplete = (correct: boolean) => {
    if (correct && currentExercise && !isExerciseCompleted(currentExercise.id)) {
      dispatch({
        type: 'UPDATE_PROGRESS',
        payload: {
          completedExercises: [...completedExercises, currentExercise.id],
          grammarCompleted: (state.progress.grammarCompleted || 0) + 1,
        }
      });
    }
  };

  const nextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

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

              {/* Practice Exercises */}
              {exercises.length > 0 && (
                <div className="border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Practice Exercises
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                      {exercises.filter(ex => isExerciseCompleted(ex.id)).length} / {exercises.length} completed
                    </span>
                  </div>

                  {currentExercise && (
                    <>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                          <span>Exercise {currentExerciseIndex + 1} of {exercises.length}</span>
                          <div className="flex items-center gap-1">
                            {isExerciseCompleted(currentExercise.id) && (
                              <CheckCircle size={14} className="text-green-500" />
                            )}
                            <span className="capitalize">{currentExercise.type.replace('-', ' ')}</span>
                          </div>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-bar-fill" 
                            style={{ width: `${((currentExerciseIndex + 1) / exercises.length) * 100}%` }}
                          />
                        </div>
                      </div>

                      <GrammarExercise
                        key={currentExercise.id}
                        exercise={currentExercise}
                        onComplete={handleExerciseComplete}
                      />

                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={prevExercise}
                          disabled={currentExerciseIndex === 0}
                          className="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ← Previous
                        </button>
                        <button
                          onClick={nextExercise}
                          disabled={currentExerciseIndex === exercises.length - 1}
                          className="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next →
                        </button>
                      </div>
                    </>
                  )}
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
