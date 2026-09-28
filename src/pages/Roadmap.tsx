import { useAppState } from '../hooks/useStore';

const roadmapPhases = [
  {
    weeks: '1-4',
    title: 'Foundations',
    subtitle: 'Sounds & Survival',
    color: 'from-blue-500 to-blue-600',
    items: ['Pinyin mastery', 'Four tones', 'Basic pronunciation', 'Survival vocabulary (150 words)', 'First 50 characters', 'Greetings & introductions', 'Numbers & time', 'Basic questions'],
    milestone: 'Can introduce yourself and handle basic interactions',
  },
  {
    weeks: '5-8',
    title: 'Beginner Core',
    subtitle: 'Daily Life Mandarin',
    color: 'from-green-500 to-green-600',
    items: ['Daily routines', 'Shopping & directions', 'Food & restaurants', 'Family & relationships', 'Negation (不 vs 没)', 'Aspect markers (了, 过, 着)', 'HSK 1-2 vocabulary (300 words)', 'Simple paragraph reading'],
    milestone: 'Can handle most daily life situations',
  },
  {
    weeks: '9-12',
    title: 'HSK 2 → HSK 3',
    subtitle: 'Expanding Expression',
    color: 'from-purple-500 to-purple-600',
    items: ['Longer sentences', 'Comparison structures', 'Connectors (因为...所以...)', 'Result complements', 'Graded reading (HSK 2)', 'Listening volume increase', '600 word vocabulary', 'Opinion expression'],
    milestone: 'Can discuss familiar topics with some fluency',
  },
  {
    weeks: '13-16',
    title: 'Intermediate Foundation',
    subtitle: 'Real Communication',
    color: 'from-orange-500 to-orange-600',
    items: ['Character acceleration', 'Storytelling ability', 'Complex grammar (把, 被)', 'Native-friendly content', 'Writing short paragraphs', '1200 word vocabulary', 'Normal-speed listening', 'Shadowing practice'],
    milestone: 'Can tell stories and express opinions',
  },
  {
    weeks: '17-20',
    title: 'HSK 4 Territory',
    subtitle: 'Complex Communication',
    color: 'from-red-500 to-red-600',
    items: ['Advanced grammar patterns', 'Longer reading texts', 'News comprehension', 'Formal writing', 'Debate & discussion', '1800 word vocabulary', 'TV shows with subtitles', 'Professional vocabulary'],
    milestone: 'Can communicate complex ideas',
  },
  {
    weeks: '21-24',
    title: 'Consolidation',
    subtitle: 'Towards Independence',
    color: 'from-pink-500 to-pink-600',
    items: ['HSK 4-5 practice tests', 'Integrated skills', 'Native content consumption', 'Writing essays', 'Speaking with natives', '2500 word vocabulary', 'Self-directed learning', 'Next-stage planning'],
    milestone: 'Ready for independent learning & HSK 5',
  },
];

export function Roadmap() {
  const { state } = useAppState();
  const completedLessons = state.progress.completedLessons.length;
  const currentPhase = Math.min(Math.floor(completedLessons / 8), 5);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>24-Week Roadmap</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Your visual path from zero to HSK 5
        </p>
      </div>

      {/* Progress Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Overall Progress</span>
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Week {Math.min(Math.floor(completedLessons / 4) + 1, 24)} / 24</span>
        </div>
        <div className="progress-bar mb-2">
          <div className="progress-bar-fill" style={{ width: `${(completedLessons / 48) * 100}%` }} />
        </div>
        <div className="flex justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
          <span>Zero</span>
          <span>HSK 1</span>
          <span>HSK 2</span>
          <span>HSK 3</span>
          <span>HSK 4</span>
          <span>HSK 5</span>
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="space-y-0">
        {roadmapPhases.map((phase, i) => {
          const isActive = i === currentPhase;
          const isCompleted = i < currentPhase;

          return (
            <div key={i} className="relative">
              {/* Connector Line */}
              {i < roadmapPhases.length - 1 && (
                <div className={`absolute left-6 top-16 w-0.5 h-[calc(100%-2rem)] ${isCompleted ? 'bg-green-300 dark:bg-green-700' : 'bg-gray-200 dark:bg-gray-700'}`} />
              )}

              <div className={`card ${isActive ? 'ring-2 ring-primary-400' : ''} ${isCompleted ? 'opacity-80' : ''}`}>
                <div className="flex items-start gap-4">
                  {/* Phase Indicator */}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg`}>
                    {isCompleted ? '✓' : `W${phase.weeks}`}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{phase.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700" style={{ color: 'var(--text-secondary)' }}>
                        Weeks {phase.weeks}
                      </span>
                      {isActive && <span className="text-xs px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-600">Current</span>}
                    </div>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{phase.subtitle}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                      {phase.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-1.5 text-xs">
                          <div className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-green-500' : isActive ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                          <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <p className="text-xs">
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>🎯 Milestone: </span>
                        <span style={{ color: 'var(--text-secondary)' }}>{phase.milestone}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Principles */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Core Learning Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            'Pronunciation matters enormously at the beginning',
            'Learn tones through words, not isolated syllables',
            'Introduce characters early - recognition first',
            'Learn vocabulary in context, not in isolation',
            'SRS reinforces learning but doesn\'t replace exposure',
            'Start listening from day one',
            'Speak early but at appropriate level',
            'Learn grammar through patterns and examples',
            'Gradually replace learner content with native content',
            'HSK is a framework, not a measure of fluency',
            'Spend increasing time actually using Chinese',
            'Consistency beats intensity',
          ].map((principle, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <span className="text-primary-500 mt-0.5">•</span>
              <span style={{ color: 'var(--text-secondary)' }}>{principle}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
