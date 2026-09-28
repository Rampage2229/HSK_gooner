import { useState, useRef, useEffect } from 'react';
import { ToneCard } from '../components/ToneCard';
import { useAudio } from '../hooks/useAudio';
import { useAppState } from '../hooks/useStore';
import { Volume2, Headphones, Target } from 'lucide-react';

const toneData = [
  {
    tone: 1 as const,
    name: 'First Tone',
    chineseName: '第一声 (阴平)',
    pinyin: 'mā',
    character: '妈',
    description: 'HIGH + FLAT — like singing a sustained high note. Your voice stays at the same high pitch.',
    example: '妈妈',
    examplePinyin: 'māma',
    exampleMeaning: 'mom',
    color: '#ef4444',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    tone: 2 as const,
    name: 'Second Tone',
    chineseName: '第二声 (阳平)',
    pinyin: 'má',
    character: '麻',
    description: 'RISING — like asking "What?" in surprise. Your voice rises from middle to high.',
    example: '麻烦',
    examplePinyin: 'máfan',
    exampleMeaning: 'trouble / sorry to bother',
    color: '#f59e0b',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    tone: 3 as const,
    name: 'Third Tone',
    chineseName: '第三声 (上声)',
    pinyin: 'mǎ',
    character: '马',
    description: 'DIPPING — goes down then rises. Like saying "Well..." when thinking. In practice, often just low.',
    example: '马虎',
    examplePinyin: 'mǎhu',
    exampleMeaning: 'careless',
    color: '#22c55e',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    tone: 4 as const,
    name: 'Fourth Tone',
    chineseName: '第四声 (去声)',
    pinyin: 'mà',
    character: '骂',
    description: 'FALLING — sharp and decisive. Like saying "No!" firmly. Starts high and drops quickly.',
    example: '骂',
    examplePinyin: 'mà',
    exampleMeaning: 'to scold',
    color: '#3b82f6',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    tone: 5 as const,
    name: 'Neutral Tone',
    chineseName: '轻声',
    pinyin: 'ma',
    character: '吗',
    description: 'LIGHT + SHORT — no emphasis, almost whispered. Quick and light, no defined pitch.',
    example: '好吗',
    examplePinyin: 'hǎo ma',
    exampleMeaning: 'okay? / alright?',
    color: '#6b7280',
    bgColor: 'bg-gray-50 dark:bg-gray-800',
  },
];

const tonePairs = [
  { pair: 'nǐ hǎo', chars: '你好', meaning: 'hello', tones: [3, 3] as [number, number], note: '3+3 → 2+3 (sandhi)' },
  { pair: 'bú shì', chars: '不是', meaning: 'is not', tones: [2, 4] as [number, number], note: '不 sandhi before 4th' },
  { pair: 'yí gè', chars: '一个', meaning: 'one', tones: [2, 5] as [number, number], note: '一 sandhi before 4th' },
  { pair: 'māma', chars: '妈妈', meaning: 'mom', tones: [1, 5] as [number, number], note: '' },
  { pair: 'xièxie', chars: '谢谢', meaning: 'thanks', tones: [4, 5] as [number, number], note: '' },
  { pair: 'xuéshēng', chars: '学生', meaning: 'student', tones: [2, 1] as [number, number], note: '' },
  { pair: 'lǎoshī', chars: '老师', meaning: 'teacher', tones: [3, 1] as [number, number], note: '' },
  { pair: 'hěn hǎo', chars: '很好', meaning: 'very good', tones: [3, 3] as [number, number], note: '3+3 → 2+3 (sandhi)' },
  { pair: 'huānyíng', chars: '欢迎', meaning: 'welcome', tones: [1, 2] as [number, number], note: '' },
  { pair: 'zàijiàn', chars: '再见', meaning: 'goodbye', tones: [4, 4] as [number, number], note: '' },
];

const quizQuestions = [
  { char: '妈', pinyin: 'mā', correctTone: 1, word: '妈妈' },
  { char: '麻', pinyin: 'má', correctTone: 2, word: '麻烦' },
  { char: '马', pinyin: 'mǎ', correctTone: 3, word: '马虎' },
  { char: '骂', pinyin: 'mà', correctTone: 4, word: '骂人' },
  { char: '大', pinyin: 'dà', correctTone: 4, word: '大学' },
  { char: '好', pinyin: 'hǎo', correctTone: 3, word: '你好' },
  { char: '学', pinyin: 'xué', correctTone: 2, word: '学生' },
  { char: '天', pinyin: 'tiān', correctTone: 1, word: '今天' },
  { char: '中', pinyin: 'zhōng', correctTone: 1, word: '中国' },
  { char: '人', pinyin: 'rén', correctTone: 2, word: '中国人' },
  { char: '我', pinyin: 'wǒ', correctTone: 3, word: '我们' },
  { char: '是', pinyin: 'shì', correctTone: 4, word: '是不是' },
  { char: '不', pinyin: 'bù', correctTone: 4, word: '不是' },
  { char: '他', pinyin: 'tā', correctTone: 1, word: '他们' },
  { char: '来', pinyin: 'lái', correctTone: 2, word: '来了' },
  { char: '吃', pinyin: 'chī', correctTone: 1, word: '吃饭' },
];

export function Tones() {
  const { state, dispatch } = useAppState();
  const [mode, setMode] = useState<'learn' | 'pairs' | 'quiz' | 'listen'>('learn');
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [toneScores, setToneScores] = useState<Record<number, { correct: number; total: number }>>({ 1: { correct: 0, total: 0 }, 2: { correct: 0, total: 0 }, 3: { correct: 0, total: 0 }, 4: { correct: 0, total: 0 } });
  const [quizMode, setQuizMode] = useState<'see' | 'listen'>('see');
  const { play, isPlaying } = useAudio();

  const currentQuestion = quizQuestions[quizIndex % quizQuestions.length];

  const handleQuizAnswer = (tone: number) => {
    setQuizAnswer(tone);
    const isCorrect = tone === currentQuestion.correctTone;
    
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    setToneScores(prev => ({
      ...prev,
      [currentQuestion.correctTone]: {
        correct: prev[currentQuestion.correctTone].correct + (isCorrect ? 1 : 0),
        total: prev[currentQuestion.correctTone].total + 1,
      }
    }));

    if (isCorrect) {
      dispatch({ type: 'ADD_XP', payload: 5 });
    }

    setTimeout(() => {
      setQuizAnswer(null);
      setQuizIndex(prev => prev + 1);
    }, 1200);
  };

  const handleListenQuiz = () => {
    play({ text: currentQuestion.word, rate: 0.7 });
  };

  const getAccuracy = (tone: number) => {
    const s = toneScores[tone];
    if (!s || s.total === 0) return null;
    return Math.round((s.correct / s.total) * 100);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Tone Training 声调训练</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Master the four tones — this is the foundation of Mandarin pronunciation
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'learn' as const, label: '📖 Learn', icon: 'Learn the 4 tones' },
          { key: 'pairs' as const, label: '🔗 Pairs', icon: 'Tone combinations' },
          { key: 'quiz' as const, label: '🎯 Quiz', icon: 'Test yourself' },
          { key: 'listen' as const, label: '👂 Listen', icon: 'Listen & identify' },
        ].map(m => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${mode === m.key ? 'bg-primary-500 text-white' : 'btn-secondary'}`}
            title={m.icon}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* LEARN MODE */}
      {mode === 'learn' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {toneData.map(tone => (
              <ToneCard key={tone.tone} {...tone} />
            ))}
          </div>

          <div className="card bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">🎵 Tone Sandhi Rules</h3>
            <ul className="text-sm space-y-2 text-amber-700 dark:text-amber-400">
              <li>• <strong>Two 3rd tones together</strong> → first becomes 2nd tone: 你好 nǐ hǎo → actually pronounced <em>ní hǎo</em></li>
              <li>• <strong>不 (bù) before 4th tone</strong> → becomes 2nd tone: 不是 bú shì</li>
              <li>• <strong>一 (yī) changes</strong>: before 4th tone → 2nd (一个 yí gè), before 1st/2nd/3rd → 4th (一天 yì tiān)</li>
            </ul>
          </div>
        </div>
      )}

      {/* TONE PAIRS MODE */}
      {mode === 'pairs' && (
        <div className="space-y-4">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Click any pair to hear it. In real speech, tones combine in patterns.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tonePairs.map((pair, i) => (
              <TonePairCard key={i} pair={pair} />
            ))}
          </div>
        </div>
      )}

      {/* QUIZ MODE (See → Identify) */}
      {mode === 'quiz' && quizMode === 'see' && (
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Score: {score.correct}/{score.total}
              {score.total > 0 && ` (${Math.round((score.correct / score.total) * 100)}%)`}
            </span>
            <button
              onClick={() => setQuizMode('listen')}
              className="text-xs px-2 py-1 rounded btn-secondary"
            >
              Switch to Listen Mode →
            </button>
          </div>

          <div className="card text-center">
            <p className="text-xs mb-2 uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              What tone is this character?
            </p>
            <p className="text-7xl chinese-char font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {currentQuestion.char}
            </p>
            <p className="text-xl text-primary-600 mb-1">{currentQuestion.pinyin}</p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              (as in: {currentQuestion.word})
            </p>

            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(tone => {
                const colors = ['', 'bg-red-500', 'bg-amber-500', 'bg-green-500', 'bg-blue-500'];
                const isCorrect = quizAnswer === tone && tone === currentQuestion.correctTone;
                const isWrong = quizAnswer === tone && tone !== currentQuestion.correctTone;
                const isAnswer = quizAnswer !== null && tone === currentQuestion.correctTone;

                return (
                  <button
                    key={tone}
                    onClick={() => quizAnswer === null && handleQuizAnswer(tone)}
                    disabled={quizAnswer !== null}
                    className={`p-4 rounded-lg font-bold text-2xl transition ${
                      quizAnswer === null
                        ? `${colors[tone]} text-white hover:opacity-80 hover:scale-105`
                        : isCorrect
                          ? 'bg-green-500 text-white scale-110'
                          : isWrong
                            ? 'bg-red-500 text-white opacity-50'
                            : isAnswer
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                    }`}
                  >
                    {tone}
                  </button>
                );
              })}
            </div>

            {quizAnswer !== null && (
              <p className={`mt-4 text-sm font-medium ${quizAnswer === currentQuestion.correctTone ? 'text-green-600' : 'text-red-600'}`}>
                {quizAnswer === currentQuestion.correctTone ? '✓ Correct!' : `✗ It's tone ${currentQuestion.correctTone}`}
              </p>
            )}
          </div>

          {/* Per-tone accuracy */}
          {score.total > 0 && (
            <div className="card">
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Tone Accuracy</h3>
              {[1, 2, 3, 4].map(tone => {
                const acc = getAccuracy(tone);
                const colors = ['', '#ef4444', '#f59e0b', '#22c55e', '#3b82f6'];
                return (
                  <div key={tone} className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium w-16" style={{ color: colors[tone] }}>
                      Tone {tone}
                    </span>
                    <div className="flex-1 progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${acc ?? 0}%`, backgroundColor: colors[tone] }} />
                    </div>
                    <span className="text-xs w-12 text-right" style={{ color: 'var(--text-secondary)' }}>
                      {acc !== null ? `${acc}%` : '—'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* LISTEN MODE (Hear → Identify) */}
      {mode === 'listen' && (
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Score: {score.correct}/{score.total}
            </span>
            <button
              onClick={() => setQuizMode('see')}
              className="text-xs px-2 py-1 rounded btn-secondary"
            >
              ← Switch to See Mode
            </button>
          </div>

          <div className="card text-center">
            <p className="text-xs mb-4 uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              Listen and identify the tone
            </p>

            <button
              onClick={handleListenQuiz}
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition ${
                isPlaying ? 'bg-primary-500 text-white animate-pulse' : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 hover:bg-primary-200'
              }`}
            >
              <Volume2 size={32} />
            </button>

            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              Which tone did you hear?
            </p>

            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(tone => {
                const colors = ['', 'bg-red-500', 'bg-amber-500', 'bg-green-500', 'bg-blue-500'];
                const isCorrect = quizAnswer === tone && tone === currentQuestion.correctTone;
                const isWrong = quizAnswer === tone && tone !== currentQuestion.correctTone;

                return (
                  <button
                    key={tone}
                    onClick={() => quizAnswer === null && handleQuizAnswer(tone)}
                    disabled={quizAnswer !== null}
                    className={`p-4 rounded-lg font-bold text-2xl transition ${
                      quizAnswer === null
                        ? `${colors[tone]} text-white hover:opacity-80`
                        : isCorrect
                          ? 'bg-green-500 text-white scale-110'
                          : isWrong
                            ? 'bg-red-500 text-white opacity-50'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                    }`}
                  >
                    {tone}
                  </button>
                );
              })}
            </div>

            {quizAnswer !== null && (
              <div className="mt-4">
                <p className={`text-sm font-medium ${quizAnswer === currentQuestion.correctTone ? 'text-green-600' : 'text-red-600'}`}>
                  {quizAnswer === currentQuestion.correctTone ? '✓ Correct!' : `✗ It was tone ${currentQuestion.correctTone}`}
                </p>
                <p className="text-lg chinese-char mt-2" style={{ color: 'var(--text-primary)' }}>
                  {currentQuestion.char} — {currentQuestion.pinyin}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUIZ MODE from main quiz tab */}
      {mode === 'quiz' && quizMode === 'listen' && (
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Score: {score.correct}/{score.total}
            </span>
            <button
              onClick={() => setQuizMode('see')}
              className="text-xs px-2 py-1 rounded btn-secondary"
            >
              ← Switch to See Mode
            </button>
          </div>

          <div className="card text-center">
            <p className="text-xs mb-4 uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              Listen and identify the tone
            </p>

            <button
              onClick={handleListenQuiz}
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition ${
                isPlaying ? 'bg-primary-500 text-white animate-pulse' : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 hover:bg-primary-200'
              }`}
            >
              <Volume2 size={32} />
            </button>

            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              Which tone did you hear?
            </p>

            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(tone => {
                const colors = ['', 'bg-red-500', 'bg-amber-500', 'bg-green-500', 'bg-blue-500'];
                const isCorrect = quizAnswer === tone && tone === currentQuestion.correctTone;
                const isWrong = quizAnswer === tone && tone !== currentQuestion.correctTone;

                return (
                  <button
                    key={tone}
                    onClick={() => quizAnswer === null && handleQuizAnswer(tone)}
                    disabled={quizAnswer !== null}
                    className={`p-4 rounded-lg font-bold text-2xl transition ${
                      quizAnswer === null
                        ? `${colors[tone]} text-white hover:opacity-80`
                        : isCorrect
                          ? 'bg-green-500 text-white scale-110'
                          : isWrong
                            ? 'bg-red-500 text-white opacity-50'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                    }`}
                  >
                    {tone}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Tone Pair Card with audio
function TonePairCard({ pair }: { pair: typeof tonePairs[number] }) {
  const { play, isPlaying } = useAudio();

  return (
    <button
      onClick={() => play({ text: pair.chars, rate: 0.65 })}
      className={`card text-left transition hover:border-primary-300 ${isPlaying ? 'ring-2 ring-primary-400' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg chinese-char font-medium" style={{ color: 'var(--text-primary)' }}>{pair.chars}</p>
          <p className="text-sm text-primary-600">{pair.pair}</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{pair.meaning}</p>
          {pair.note && <p className="text-xs text-amber-600 mt-1">{pair.note}</p>}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {pair.tones.map((t, j) => (
              <span key={j} className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                t === 1 ? 'bg-red-500' : t === 2 ? 'bg-amber-500' : t === 3 ? 'bg-green-500' : t === 4 ? 'bg-blue-500' : 'bg-gray-400'
              }`}>
                {t}
              </span>
            ))}
          </div>
          {isPlaying ? (
            <div className="flex gap-0.5">
              <div className="w-0.5 h-4 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-0.5 h-4 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-0.5 h-4 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <Volume2 size={18} className="text-gray-400" />
          )}
        </div>
      </div>
    </button>
  );
}
