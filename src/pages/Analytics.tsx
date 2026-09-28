import { useAppState } from '../hooks/useStore';

export function Analytics() {
  const { state } = useAppState();
  const { progress } = state;

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyData = weekDays.map((day, i) => {
    const daySessions = progress.sessions.filter(s => {
      const d = new Date(s.date);
      return d.getDay() === (i + 1) % 7;
    });
    return { day, minutes: daySessions.reduce((a, s) => a + s.duration, 0) };
  });

  const maxMinutes = Math.max(...weeklyData.map(d => d.minutes), 60);

  const skills = [
    { name: 'Vocabulary', value: Math.min(progress.vocabularyLearned / 150 * 100, 100), color: 'bg-blue-500' },
    { name: 'Characters', value: Math.min(progress.charactersLearned / 100 * 100, 100), color: 'bg-green-500' },
    { name: 'Grammar', value: Math.min(progress.grammarCompleted / 12 * 100, 100), color: 'bg-purple-500' },
    { name: 'Listening', value: Math.min(progress.listeningMinutes / 600 * 100, 100), color: 'bg-orange-500' },
    { name: 'Reading', value: Math.min(progress.readingMinutes / 300 * 100, 100), color: 'bg-teal-500' },
    { name: 'Speaking', value: Math.min(progress.speakingMinutes / 300 * 100, 100), color: 'bg-pink-500' },
  ];

  const achievements = [
    { icon: '🔥', title: 'First Steps', desc: 'Complete your first lesson', unlocked: progress.totalStudyTime > 0 },
    { icon: '📚', title: 'Word Collector', desc: 'Learn 50 vocabulary words', unlocked: progress.vocabularyLearned >= 50 },
    { icon: '✍️', title: 'Character Master', desc: 'Learn 50 characters', unlocked: progress.charactersLearned >= 50 },
    { icon: '🎧', title: 'Listener', desc: '10 hours of listening', unlocked: progress.listeningMinutes >= 600 },
    { icon: '🗣', title: 'Speaker', desc: '5 hours of speaking', unlocked: progress.speakingMinutes >= 300 },
    { icon: '📖', title: 'Reader', desc: '5 hours of reading', unlocked: progress.readingMinutes >= 300 },
    { icon: '⚡', title: 'On Fire', desc: '7-day streak', unlocked: progress.currentStreak >= 7 },
    { icon: '🏆', title: 'HSK 1 Ready', desc: 'Complete 30 lessons', unlocked: progress.completedLessons.length >= 30 },
    { icon: '💎', title: 'Dedicated', desc: '30-day streak', unlocked: progress.currentStreak >= 30 },
    { icon: '🌟', title: 'XP Master', desc: 'Earn 1000 XP', unlocked: progress.xp >= 1000 },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Analytics</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Track your progress and identify areas for improvement</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="card text-center">
          <p className="text-2xl font-bold text-primary-600">{Math.round(progress.totalStudyTime / 60)}h</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Total Study Time</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-orange-500">{progress.currentStreak}</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Day Streak</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-green-500">{progress.completedLessons.length}</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Lessons Done</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-purple-500">{progress.xp}</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Total XP</p>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Study Time This Week</h2>
        <div className="flex items-end justify-between gap-3 h-40">
          {weeklyData.map(d => (
            <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{d.minutes}m</span>
              <div className="w-full flex justify-center" style={{ height: '120px' }}>
                <div
                  className="w-full max-w-[40px] rounded-t-md bg-primary-400 transition-all"
                  style={{ height: `${(d.minutes / maxMinutes) * 100}%`, minHeight: '4px', alignSelf: 'flex-end' }}
                />
              </div>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Breakdown */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Skill Progress</h2>
        <div className="space-y-3">
          {skills.map(skill => (
            <div key={skill.name} className="flex items-center gap-3">
              <span className="text-sm w-20" style={{ color: 'var(--text-primary)' }}>{skill.name}</span>
              <div className="flex-1 progress-bar">
                <div className={`progress-bar-fill ${skill.color}`} style={{ width: `${skill.value}%` }} />
              </div>
              <span className="text-xs w-10 text-right" style={{ color: 'var(--text-secondary)' }}>{Math.round(skill.value)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weak Areas */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Areas to Focus On</h2>
        <div className="space-y-2">
          {skills.sort((a, b) => a.value - b.value).slice(0, 3).map(skill => (
            <div key={skill.name} className="flex items-center gap-3 p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/10">
              <span className="text-sm">⚠️</span>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{skill.name}</span>
              <span className="text-xs ml-auto" style={{ color: 'var(--text-secondary)' }}>{Math.round(skill.value)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {achievements.map(a => (
            <div key={a.title} className={`p-3 rounded-lg text-center ${a.unlocked ? 'bg-accent-50 dark:bg-accent-900/20' : 'opacity-40 grayscale'}`}>
              <span className="text-2xl">{a.icon}</span>
              <p className="text-xs font-medium mt-1" style={{ color: 'var(--text-primary)' }}>{a.title}</p>
              <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
