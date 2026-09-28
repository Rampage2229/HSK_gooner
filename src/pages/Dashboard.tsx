import { useAppState } from '../hooks/useStore';
import { useNavigate } from 'react-router-dom';
import { Flame, ArrowRight } from 'lucide-react';
import { curriculum } from '../data/curriculum';

export function Dashboard() {
  const { state } = useAppState();
  const { progress } = state;
  const navigate = useNavigate();

  const currentWeek = Math.min(Math.floor(progress.completedLessons.length / 7) + 1, 24);

  // Find next unfinished lesson
  const getNextLesson = () => {
    for (const week of curriculum) {
      for (const lesson of week.lessons) {
        if (!progress.completedLessons.includes(lesson.id)) {
          return { lesson, week };
        }
      }
    }
    return null;
  };
  const nextLesson = getNextLesson();

  return (
    <div className="animate-fade-in space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          你好！Welcome 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Week {currentWeek} of 24 • {progress.xp} XP
        </p>
      </div>

      {/* Continue Learning Banner */}
      {nextLesson && (
        <button
          onClick={() => navigate(`/lesson/${nextLesson.lesson.id}`)}
          className="w-full card bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg transition-all hover:scale-[1.01] text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium opacity-80 uppercase tracking-wide mb-1">Continue Learning</p>
              <p className="text-lg font-bold">Week {nextLesson.week.number}: {nextLesson.lesson.title}</p>
              <p className="text-sm opacity-80 chinese-char mt-1">{nextLesson.lesson.titleCn}</p>
            </div>
            <ArrowRight size={24} className="opacity-60 ml-4" />
          </div>
        </button>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card text-center">
          <p className="text-2xl font-bold text-primary-600">{progress.completedLessons.length}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Lessons Done</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-green-600">{progress.vocabularyLearned}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Words Learned</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-orange-500">{progress.currentStreak}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Day Streak</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Quick Start</h2>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate('/tones')}
            className="p-3 rounded-lg border text-left hover:border-primary-300 transition"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>🎵 Practice Tones</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Master the 4 tones</p>
          </button>
          <button
            onClick={() => navigate('/characters')}
            className="p-3 rounded-lg border text-left hover:border-primary-300 transition"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>✍️ Learn Characters</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Stroke order & practice</p>
          </button>
          <button
            onClick={() => navigate('/vocabulary')}
            className="p-3 rounded-lg border text-left hover:border-primary-300 transition"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>📚 Browse Vocabulary</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>HSK 1-3 words</p>
          </button>
          <button
            onClick={() => navigate('/resources')}
            className="p-3 rounded-lg border text-left hover:border-primary-300 transition"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>🔗 External Resources</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Anki decks, tools & more</p>
          </button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Your Progress</h2>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span style={{ color: 'var(--text-primary)' }}>Curriculum</span>
              <span style={{ color: 'var(--text-secondary)' }}>{progress.completedLessons.length} / {curriculum.reduce((a, w) => a + w.lessons.length, 0)} lessons</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${(progress.completedLessons.length / curriculum.reduce((a, w) => a + w.lessons.length, 0)) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
