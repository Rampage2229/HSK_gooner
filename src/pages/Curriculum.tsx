import { useNavigate } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import { useAppState } from '../hooks/useStore';
import { CheckCircle, Clock, BookOpen } from 'lucide-react';

export function Curriculum() {
  const { state } = useAppState();
  const navigate = useNavigate();
  const completedLessons = state.progress.completedLessons;

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Curriculum</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          24-week structured path from zero to HSK 5
        </p>
      </div>

      <div className="space-y-4">
        {curriculum.map(week => {
          const completedCount = week.lessons.filter(l => completedLessons.includes(l.id)).length;
          const totalLessons = week.lessons.length;
          const weekProgress = Math.round((completedCount / totalLessons) * 100);

          return (
            <div key={week.number} className="card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                      Week {week.number}
                    </span>
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{week.title}</h3>
                  </div>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{week.theme}</p>
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {completedCount}/{totalLessons}
                </span>
              </div>

              <div className="progress-bar mb-4">
                <div className="progress-bar-fill" style={{ width: `${weekProgress}%` }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {week.lessons.map(lesson => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => navigate(`/lesson/${lesson.id}`)}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-left transition hover:border-primary-300 ${
                        isCompleted ? 'bg-green-50 dark:bg-green-900/10' : ''
                      }`}
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      {isCompleted ? (
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                      ) : (
                        <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${isCompleted ? 'text-green-700 dark:text-green-400' : ''}`} style={{ color: isCompleted ? undefined : 'var(--text-primary)' }}>
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700" style={{ color: 'var(--text-secondary)' }}>
                            {lesson.type}
                          </span>
                          <span className="text-xs flex items-center gap-0.5" style={{ color: 'var(--text-secondary)' }}>
                            <Clock size={10} /> {lesson.duration}m
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
