import { useState } from 'react';
import { useAppState } from '../hooks/useStore';
import { allVocabulary } from '../data/vocabulary';

export function Review() {
  const { state, dispatch } = useAppState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0 });

  // Get due SRS items
  const now = new Date();
  const dueItems = state.progress.srsItems.filter(item => new Date(item.nextReview) <= now);

  // If no SRS items, create some from vocabulary for demo
  const reviewItems = dueItems.length > 0
    ? dueItems.map(item => ({
        ...item,
        word: allVocabulary.find(w => w.id === item.wordId) || allVocabulary[0],
      }))
    : allVocabulary.slice(0, 10).map(w => ({
        wordId: w.id,
        status: 'new' as const,
        nextReview: new Date().toISOString(),
        interval: 0,
        repetitions: 0,
        easeFactor: 2.5,
        lastReviewed: null,
        word: w,
      }));

  const currentItem = reviewItems[currentIndex];

  const handleRating = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentItem) return;

    const intervals: Record<string, number> = { again: 1, hard: 3, good: 7, easy: 14 };
    const easeAdjust: Record<string, number> = { again: -0.3, hard: -0.15, good: 0, easy: 0.15 };

    const newInterval = Math.max(1, Math.round(currentItem.interval * currentItem.easeFactor * (intervals[rating] / 7)));
    const newEase = Math.max(1.3, currentItem.easeFactor + easeAdjust[rating]);

    dispatch({
      type: 'UPDATE_SRS',
      payload: {
        ...currentItem,
        interval: newInterval,
        easeFactor: newEase,
        repetitions: currentItem.repetitions + 1,
        nextReview: new Date(Date.now() + newInterval * 86400000).toISOString(),
        lastReviewed: new Date().toISOString(),
        status: rating === 'again' ? 'learning' : newInterval > 7 ? 'mastered' : 'review',
      }
    });

    dispatch({ type: 'ADD_XP', payload: 5 });
    setSessionStats(s => ({ reviewed: s.reviewed + 1, correct: s.correct + (rating === 'good' || rating === 'easy' ? 1 : 0) }));
    setShowAnswer(false);

    if (currentIndex < reviewItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  if (!currentItem) {
    return (
      <div className="animate-fade-in text-center py-20">
        <p className="text-4xl mb-4">🎉</p>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>All caught up!</h2>
        <p style={{ color: 'var(--text-secondary)' }}>No cards due for review right now.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-lg mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>SRS Review</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          {currentIndex + 1} / {reviewItems.length} cards • {sessionStats.reviewed} reviewed
        </p>
      </div>

      {/* Progress */}
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${((currentIndex + 1) / reviewItems.length) * 100}%` }} />
      </div>

      {/* Card */}
      <div
        className="card cursor-pointer min-h-[300px] flex flex-col items-center justify-center"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {!showAnswer ? (
          <div className="text-center">
            <p className="text-5xl chinese-char font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              {currentItem.word.simplified}
            </p>
            <p className="text-lg text-primary-600">{currentItem.word.pinyin}</p>
            <p className="text-sm mt-4" style={{ color: 'var(--text-secondary)' }}>Tap to reveal meaning</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-4xl chinese-char font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {currentItem.word.simplified}
            </p>
            <p className="text-lg text-primary-600 mb-2">{currentItem.word.pinyin}</p>
            <p className="text-xl mb-4" style={{ color: 'var(--text-primary)' }}>{currentItem.word.meaning}</p>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 max-w-sm">
              <p className="chinese-char text-sm" style={{ color: 'var(--text-primary)' }}>{currentItem.word.exampleSentence}</p>
              <p className="text-xs text-primary-600 mt-1">{currentItem.word.examplePinyin}</p>
              <p className="text-xs italic mt-1" style={{ color: 'var(--text-secondary)' }}>{currentItem.word.exampleTranslation}</p>
            </div>
          </div>
        )}
      </div>

      {/* Rating Buttons */}
      {showAnswer && (
        <div className="grid grid-cols-4 gap-2">
          <button onClick={() => handleRating('again')} className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition">
            Again<br /><span className="text-xs opacity-70">&lt;1m</span>
          </button>
          <button onClick={() => handleRating('hard')} className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm font-medium hover:bg-orange-200 dark:hover:bg-orange-900/50 transition">
            Hard<br /><span className="text-xs opacity-70">~3d</span>
          </button>
          <button onClick={() => handleRating('good')} className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition">
            Good<br /><span className="text-xs opacity-70">~7d</span>
          </button>
          <button onClick={() => handleRating('easy')} className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition">
            Easy<br /><span className="text-xs opacity-70">~14d</span>
          </button>
        </div>
      )}

      {/* Session Stats */}
      {sessionStats.reviewed > 0 && (
        <div className="card">
          <div className="flex justify-between text-sm">
            <span style={{ color: 'var(--text-secondary)' }}>Reviewed: {sessionStats.reviewed}</span>
            <span style={{ color: 'var(--text-secondary)' }}>Accuracy: {sessionStats.reviewed > 0 ? Math.round((sessionStats.correct / sessionStats.reviewed) * 100) : 0}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
