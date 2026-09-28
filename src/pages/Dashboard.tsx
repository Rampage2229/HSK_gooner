import { useAppState } from '../hooks/useStore';
import { useNavigate } from 'react-router-dom';
import { Flame, BookOpen, Headphones, Mic, PenTool, Target, TrendingUp, Clock, Award } from 'lucide-react';

export function Dashboard() {
  const { state, dispatch } = useAppState();
  const { progress, profile } = state;
  const navigate = useNavigate();

  const todayTasks = progress.dailyTasks.length > 0 ? progress.dailyTasks : [
    { id: 'task-1', title: 'SRS Vocabulary Review', duration: 20, completed: false, type: 'srs' as const },
    { id: 'task-2', title: 'Grammar Lesson', duration: 25, completed: false, type: 'grammar' as const },
    { id: 'task-3', title: 'Listening Practice', duration: 30, completed: false, type: 'listening' as const },
    { id: 'task-4', title: 'Reading Practice', duration: 20, completed: false, type: 'reading' as const },
    { id: 'task-5', title: 'Speaking Practice', duration: 20, completed: false, type: 'speaking' as const },
  ];

  const completedTasks = todayTasks.filter(t => t.completed).length;
  const totalTasks = todayTasks.length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  const currentWeek = Math.min(Math.floor(progress.completedLessons.length / 7) + 1, 24);
  const srsDue = progress.srsItems.filter(i => new Date(i.nextReview) <= new Date()).length;

  const getDailyGoalMinutes = () => {
    switch (profile?.dailyTime) {
      case '30min': return 30;
      case '1h': return 60;
      case '2h': return 120;
      case '3h': return 180;
      case '4h+': return 240;
      default: return 60;
    }
  };

  const dailyGoal = getDailyGoalMinutes();
  const todayMinutes = progress.sessions
    .filter(s => s.date === new Date().toISOString().split('T')[0])
    .reduce((acc, s) => acc + s.duration, 0);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            你好！Welcome back 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Level {progress.level} • {progress.xp} XP • Week {currentWeek} of 24
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30">
            <Flame size={16} className="text-orange-500" />
            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">{progress.currentStreak} day streak</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={<BookOpen size={20} />} label="Vocabulary" value={progress.vocabularyLearned.toString()} color="blue" />
        <StatCard icon={<PenTool size={20} />} label="Characters" value={progress.charactersLearned.toString()} color="green" />
        <StatCard icon={<Headphones size={20} />} label="Listening" value={`${progress.listeningMinutes}m`} color="purple" />
        <StatCard icon={<Mic size={20} />} label="Speaking" value={`${progress.speakingMinutes}m`} color="orange" />
      </div>

      {/* Today's Progress */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Today's Goal</h2>
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {todayMinutes}m / {dailyGoal}m
          </span>
        </div>
        <div className="progress-bar mb-4">
          <div className="progress-bar-fill" style={{ width: `${Math.min((todayMinutes / dailyGoal) * 100, 100)}%` }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {todayTasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                task.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              style={{ borderColor: task.completed ? undefined : 'var(--border-color)' }}
              onClick={() => {
                if (!task.completed) {
                  dispatch({ type: 'COMPLETE_TASK', payload: task.id });
                  dispatch({ type: 'ADD_XP', payload: 10 });
                }
              }}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600'
              }`}>
                {task.completed && <span className="text-white text-xs">✓</span>}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${task.completed ? 'line-through opacity-60' : ''}`} style={{ color: 'var(--text-primary)' }}>
                  {task.title}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{task.duration} min</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions & SRS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SRS Due */}
        <div className="card cursor-pointer hover:border-primary-300 transition" onClick={() => navigate('/review')}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <RotateCcwIcon />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Vocabulary Due</p>
              <p className="text-2xl font-bold text-primary-600">{srsDue} cards</p>
            </div>
          </div>
        </div>

        {/* Continue Learning */}
        <div className="card cursor-pointer hover:border-primary-300 transition" onClick={() => navigate('/curriculum')}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Target size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Continue Learning</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Week {currentWeek} • Next lesson</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>This Week</h2>
        <div className="flex items-end justify-between gap-2 h-32">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
            const sessionData = progress.sessions.filter(s => {
              const d = new Date(s.date);
              return d.getDay() === (i + 1) % 7;
            });
            const minutes = sessionData.reduce((a, s) => a + s.duration, 0);
            const height = Math.max((minutes / dailyGoal) * 100, 4);
            const isToday = new Date().getDay() === (i + 1) % 7;
            return (
              <div key={day} className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full flex justify-center" style={{ height: '100px' }}>
                  <div
                    className={`w-full max-w-[32px] rounded-t-md transition-all ${isToday ? 'bg-primary-500' : 'bg-primary-200 dark:bg-primary-800'}`}
                    style={{ height: `${height}%`, minHeight: '4px', alignSelf: 'flex-end' }}
                  />
                </div>
                <span className={`text-xs ${isToday ? 'font-bold text-primary-600' : ''}`} style={{ color: 'var(--text-secondary)' }}>
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements Preview */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Achievements</h2>
          <button className="text-sm text-primary-500 hover:underline" onClick={() => navigate('/analytics')}>View all</button>
        </div>
        <div className="flex gap-3 flex-wrap">
          <AchievementBadge icon="🔥" title="First Steps" unlocked={progress.totalStudyTime > 0} />
          <AchievementBadge icon="📚" title="100 Words" unlocked={progress.vocabularyLearned >= 100} />
          <AchievementBadge icon="✍️" title="100 Characters" unlocked={progress.charactersLearned >= 100} />
          <AchievementBadge icon="🎧" title="10 Hours" unlocked={progress.listeningMinutes >= 600} />
          <AchievementBadge icon="🗣" title="Speaker" unlocked={progress.speakingMinutes >= 300} />
          <AchievementBadge icon="🏆" title="HSK 1 Ready" unlocked={progress.completedLessons.length >= 30} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const bgColors: Record<string, string> = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
  };
  return (
    <div className="card">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${bgColors[color]}`}>
        {icon}
      </div>
      <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}</p>
      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</p>
    </div>
  );
}

function AchievementBadge({ icon, title, unlocked }: { icon: string; title: string; unlocked: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-1 p-2 rounded-lg ${unlocked ? 'bg-accent-50 dark:bg-accent-900/20' : 'opacity-40 grayscale'}`}>
      <span className="text-2xl">{icon}</span>
      <span className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>{title}</span>
    </div>
  );
}

function RotateCcwIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
