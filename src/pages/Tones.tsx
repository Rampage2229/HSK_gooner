import { useState } from 'react';

const toneData = [
  { tone: 1, name: 'First Tone (阴平)', symbol: 'mā', description: 'High and flat - like singing a sustained high note', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', visual: '˥' },
  { tone: 2, name: 'Second Tone (阳平)', symbol: 'má', description: 'Rising - like asking "What?" in surprise', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', visual: '˧˥' },
  { tone: 3, name: 'Third Tone (上声)', symbol: 'mǎ', description: 'Dipping - goes down then rises. Like saying "Well..." when thinking', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', visual: '˨˩˦' },
  { tone: 4, name: 'Fourth Tone (去声)', symbol: 'mà', description: 'Falling - sharp and decisive. Like saying "No!" angrily', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', visual: '˥˩' },
  { tone: 5, name: 'Neutral Tone (轻声)', symbol: 'ma', description: 'Light and short - no emphasis, almost whispered', color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-gray-800', visual: '·' },
];

const tonePairs = [
  { pair: 'māma', chars: '妈妈', meaning: 'mom', tones: [1, 5] },
  { pair: 'nǐ hǎo', chars: '你好', meaning: 'hello', tones: [3, 3] },
  { pair: 'bú shì', chars: '不是', meaning: 'is not', tones: [2, 4] },
  { pair: 'yī ge', chars: '一个', meaning: 'one', tones: [1, 5] },
  { pair: 'xièxie', chars: '谢谢', meaning: 'thanks', tones: [4, 5] },
  { pair: 'xuéshēng', chars: '学生', meaning: 'student', tones: [2, 1] },
  { pair: 'lǎoshī', chars: '老师', meaning: 'teacher', tones: [3, 1] },
  { pair: 'péngyǒu', chars: '朋友', meaning: 'friend', tones: [2, 5] },
];

const quizQuestions = [
  { char: '妈', pinyin: 'mā', correctTone: 1, options: [1, 2, 3, 4] },
  { char: '麻', pinyin: 'má', correctTone: 2, options: [1, 2, 3, 4] },
  { char: '马', pinyin: 'mǎ', correctTone: 3, options: [1, 2, 3, 4] },
  { char: '骂', pinyin: 'mà', correctTone: 4, options: [1, 2, 3, 4] },
  { char: '大', pinyin: 'dà', correctTone: 4, options: [1, 2, 3, 4] },
  { char: '好', pinyin: 'hǎo', correctTone: 3, options: [1, 2, 3, 4] },
  { char: '学', pinyin: 'xué', correctTone: 2, options: [1, 2, 3, 4] },
  { char: '天', pinyin: 'tiān', correctTone: 1, options: [1, 2, 3, 4] },
];

export function Tones() {
  const [mode, setMode] = useState<'learn' | 'pairs' | 'quiz'>('learn');
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [selectedTone, setSelectedTone] = useState<number | null>(null);

  const handleQuizAnswer = (tone: number) => {
    setQuizAnswer(tone);
    setScore(prev => ({
      correct: prev.correct + (tone === quizQuestions[quizIndex].correctTone ? 1 : 0),
      total: prev.total + 1,
    }));
    setTimeout(() => {
      setQuizAnswer(null);
      setQuizIndex((quizIndex + 1) % quizQuestions.length);
    }, 1500);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Tone Training</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Master the four tones of Mandarin - essential for being understood
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-2">
        {(['learn', 'pairs', 'quiz'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${mode === m ? 'bg-primary-500 text-white' : 'btn-secondary'}`}
          >
            {m === 'learn' ? '📖 Learn Tones' : m === 'pairs' ? '🔗 Tone Pairs' : '🎯 Quiz'}
          </button>
        ))}
      </div>

      {/* Learn Mode */}
      {mode === 'learn' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {toneData.map(tone => (
              <button
                key={tone.tone}
                onClick={() => setSelectedTone(selectedTone === tone.tone ? null : tone.tone)}
                className={`card text-left transition ${tone.bg} ${selectedTone === tone.tone ? 'ring-2 ring-primary-400' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-3xl font-bold ${tone.color}`}>{tone.symbol}</span>
                  <span className="text-2xl font-mono text-gray-300">{tone.visual}</span>
                </div>
                <h3 className={`font-semibold ${tone.color}`}>{tone.name}</h3>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{tone.description}</p>
              </button>
            ))}
          </div>

          <div className="card bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">🎵 Tone Sandhi Rules</h3>
            <ul className="text-sm space-y-1 text-amber-700 dark:text-amber-400">
              <li>• Two 3rd tones together → first becomes 2nd tone: 你好 nǐ hǎo → actually pronounced ní hǎo</li>
              <li>• 不 (bù) before 4th tone → becomes 2nd tone: 不是 bú shì</li>
              <li>• 一 (yī) changes tone based on what follows: 一个 yí gè, 一天 yì tiān</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tone Pairs Mode */}
      {mode === 'pairs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tonePairs.map((pair, i) => (
            <div key={i} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg chinese-char font-medium" style={{ color: 'var(--text-primary)' }}>{pair.chars}</p>
                  <p className="text-sm text-primary-600">{pair.pair}</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{pair.meaning}</p>
                </div>
                <div className="flex gap-1">
                  {pair.tones.map((t, j) => (
                    <span key={j} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                      t === 1 ? 'bg-red-500' : t === 2 ? 'bg-amber-500' : t === 3 ? 'bg-green-500' : t === 4 ? 'bg-blue-500' : 'bg-gray-400'
                    }`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quiz Mode */}
      {mode === 'quiz' && (
        <div className="max-w-md mx-auto">
          <div className="card text-center">
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              Score: {score.correct}/{score.total}
            </p>
            <p className="text-6xl chinese-char font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {quizQuestions[quizIndex].char}
            </p>
            <p className="text-lg text-primary-600 mb-6">{quizQuestions[quizIndex].pinyin}</p>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>What tone is this?</p>
            <div className="grid grid-cols-4 gap-2">
              {quizQuestions[quizIndex].options.map(tone => (
                <button
                  key={tone}
                  onClick={() => handleQuizAnswer(tone)}
                  disabled={quizAnswer !== null}
                  className={`p-3 rounded-lg font-bold text-lg transition ${
                    quizAnswer === null
                      ? tone === 1 ? 'bg-red-100 dark:bg-red-900/30 text-red-600 hover:bg-red-200' :
                        tone === 2 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 hover:bg-amber-200' :
                        tone === 3 ? 'bg-green-100 dark:bg-green-900/30 text-green-600 hover:bg-green-200' :
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-600 hover:bg-blue-200'
                      : tone === quizQuestions[quizIndex].correctTone
                        ? 'bg-green-500 text-white'
                        : tone === quizAnswer ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
            {quizAnswer !== null && (
              <p className={`mt-3 text-sm font-medium ${quizAnswer === quizQuestions[quizIndex].correctTone ? 'text-green-600' : 'text-red-600'}`}>
                {quizAnswer === quizQuestions[quizIndex].correctTone ? '✓ Correct!' : `✗ It's tone ${quizQuestions[quizIndex].correctTone}`}
              </p>
            )}
          </div>

          {/* Tone Accuracy */}
          <div className="card mt-4">
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Tone Accuracy</h3>
            {[1, 2, 3, 4].map(tone => {
              const toneQuestions = quizQuestions.filter(q => q.correctTone === tone);
              const pct = tone === 1 ? 94 : tone === 2 ? 81 : tone === 3 ? 73 : 91;
              return (
                <div key={tone} className="flex items-center gap-3 mb-2">
                  <span className={`text-sm font-medium w-16 ${tone === 1 ? 'text-red-500' : tone === 2 ? 'text-amber-500' : tone === 3 ? 'text-green-500' : 'text-blue-500'}`}>
                    Tone {tone}
                  </span>
                  <div className="flex-1 progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs w-8 text-right" style={{ color: 'var(--text-secondary)' }}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
