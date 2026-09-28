import { useAppState } from '../hooks/useStore';

const hskLevels = [
  {
    level: 1,
    vocab: 150,
    grammar: 45,
    characters: 150,
    description: 'Basic comprehension and communication. Can understand and use simple sentences.',
    skills: { vocabulary: 0, grammar: 0, reading: 0, listening: 0, characters: 0, speaking: 0 },
  },
  {
    level: 2,
    vocab: 300,
    grammar: 45,
    characters: 300,
    description: 'Can communicate in simple everyday situations. Basic fluency in familiar topics.',
    skills: { vocabulary: 0, grammar: 0, reading: 0, listening: 0, characters: 0, speaking: 0 },
  },
  {
    level: 3,
    vocab: 600,
    grammar: 60,
    characters: 600,
    description: 'Can communicate about familiar topics. Can handle most daily life situations in Chinese.',
    skills: { vocabulary: 0, grammar: 0, reading: 0, listening: 0, characters: 0, speaking: 0 },
  },
  {
    level: 4,
    vocab: 1200,
    grammar: 80,
    characters: 1000,
    description: 'Can discuss a wide range of topics. Can communicate with native speakers with some fluency.',
    skills: { vocabulary: 0, grammar: 0, reading: 0, listening: 0, characters: 0, speaking: 0 },
  },
  {
    level: 5,
    vocab: 2500,
    grammar: 100,
    characters: 1600,
    description: 'Can read Chinese newspapers, watch most TV programs, and give speeches.',
    skills: { vocabulary: 0, grammar: 0, reading: 0, listening: 0, characters: 0, speaking: 0 },
  },
];

export function HSK() {
  const { state } = useAppState();
  const { progress } = state;

  // Calculate readiness based on progress
  const getReadiness = (level: number) => {
    const lessonsPerLevel = 8;
    const completedForLevel = progress.completedLessons.filter((_, i) => {
      const weekNum = Math.floor(i / 7) + 1;
      return weekNum <= level * 2 + 2;
    }).length;
    const vocabTarget = hskLevels[level - 1].vocab;
    const vocabProgress = Math.min((progress.vocabularyLearned / vocabTarget) * 100, 100);
    const lessonProgress = Math.min((completedForLevel / lessonsPerLevel) * 100, 100);
    return { vocabulary: vocabProgress, grammar: lessonProgress, reading: lessonProgress * 0.8, listening: lessonProgress * 0.7, characters: vocabProgress * 0.9, speaking: lessonProgress * 0.6 };
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>HSK Progress</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Track your readiness for each HSK examination level
        </p>
      </div>

      <div className="card bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
        <p className="text-sm text-amber-700 dark:text-amber-400">
          ⚠️ <strong>Important:</strong> Passing an HSK level does NOT equal overall Mandarin proficiency. HSK tests specific skills under exam conditions. Real-world fluency requires additional practice in listening, speaking, and cultural understanding.
        </p>
      </div>

      {/* HSK Levels */}
      <div className="space-y-4">
        {hskLevels.map(hsk => {
          const readiness = getReadiness(hsk.level);
          const overallReadiness = Math.round(Object.values(readiness).reduce((a, b) => a + b, 0) / 6);

          return (
            <div key={hsk.level} className="card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary-600">HSK {hsk.level}</span>
                    {overallReadiness >= 80 && <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700">Ready</span>}
                    {overallReadiness >= 50 && overallReadiness < 80 && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700">In Progress</span>}
                  </div>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{hsk.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold" style={{ color: overallReadiness >= 80 ? '#22c55e' : 'var(--text-primary)' }}>
                    {overallReadiness}%
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>readiness</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(readiness).map(([skill, value]) => (
                  <div key={skill}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs capitalize" style={{ color: 'var(--text-secondary)' }}>{skill}</span>
                      <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{Math.round(value)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span>📝 {hsk.vocab} words</span>
                <span>📐 {hsk.grammar} grammar</span>
                <span>✍️ {hsk.characters} characters</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Immersion Ladder */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Immersion Ladder</h2>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Progress through content complexity as your Chinese improves:</p>
        <div className="space-y-2">
          {[
            { level: 0, label: 'English explanations', desc: 'Learning about Chinese in English' },
            { level: 1, label: 'Pinyin + English', desc: 'Chinese content with full support' },
            { level: 2, label: 'Chinese + pinyin', desc: 'Characters with pronunciation help' },
            { level: 3, label: 'Chinese subtitles', desc: 'Native content with Chinese subtitles' },
            { level: 4, label: 'Chinese only', desc: 'Learner content without English support' },
            { level: 5, label: 'Native content', desc: 'TV, movies, books for native speakers' },
            { level: 6, label: 'Domain-specific', desc: 'Academic, professional, literary Chinese' },
          ].map(item => (
            <div key={item.level} className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-sm font-bold text-primary-600">
                {item.level}
              </span>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
