import { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import hanziData from 'hanzi-writer-data';
import { Play, RotateCcw, Eye, Pencil } from 'lucide-react';

interface StrokeOrderProps {
  character: string;
  showOutline?: boolean;
  showPinyin?: boolean;
  pinyin?: string;
  meaning?: string;
  animationSpeed?: number;
}

export function StrokeOrder({ 
  character, 
  showOutline = true, 
  showPinyin = true, 
  pinyin, 
  meaning,
  animationSpeed = 1 
}: StrokeOrderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<InstanceType<typeof HanziWriter> | null>(null);
  const [mode, setMode] = useState<'animate' | 'quiz'>('animate');
  const [isAnimating, setIsAnimating] = useState(false);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number } | null>(null);
  const [speed, setSpeed] = useState(animationSpeed);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous writer
    containerRef.current.innerHTML = '';

    try {
      const writer = HanziWriter.create(containerRef.current, character, {
        width: 200,
        height: 200,
        padding: 10,
        showOutline: showOutline,
        showCharacter: false,
        strokeAnimationSpeed: speed,
        delayBetweenStrokes: 100,
        strokeColor: '#333',
        outlineColor: '#ddd',
        radicalColor: '#e74c3c',
        drawingColor: '#3b82f6',
        showHintAfterMisses: 3,
        highlightOnComplete: true,
        strokeHighlightSpeed: 20,
        highlightColor: '#60a5fa',
        charDataLoader: (char: string, onLoad: (data: any) => void, onError: (err: string) => void) => {
          const data = (hanziData as Record<string, any>)[char];
          if (data) {
            onLoad(data);
          } else {
            onError(`No stroke data for character: ${char}`);
          }
        },
      });

      writerRef.current = writer;

      // Auto-animate on mount
      writer.animateCharacter({
        onComplete: () => setIsAnimating(false),
      });
      setIsAnimating(true);
    } catch (e) {
      console.error('HanziWriter error:', e);
    }

    return () => {
      if (writerRef.current) {
        writerRef.current = null;
      }
    };
  }, [character, showOutline, speed]);

  const handlePlay = () => {
    if (!writerRef.current) return;
    setMode('animate');
    setIsAnimating(true);
    writerRef.current.animateCharacter({
      onComplete: () => setIsAnimating(false),
    });
  };

  const handleReplay = () => {
    if (!writerRef.current) return;
    writerRef.current.hideCharacter();
    setTimeout(() => {
      setIsAnimating(true);
      writerRef.current?.animateCharacter({
        onComplete: () => setIsAnimating(false),
      });
    }, 100);
  };

  const handleStartQuiz = () => {
    if (!writerRef.current) return;
    setMode('quiz');
    setQuizScore(null);
    writerRef.current.quiz({
      onCorrectStroke: () => {},
      onMistake: () => {},
      onComplete: (summary: { character: string; totalMistakes: number }) => {
        setQuizScore({
          correct: summary.totalMistakes === 0 ? 1 : 0,
          total: 1,
        });
      },
    });
  };

  const handleShowCharacter = () => {
    if (!writerRef.current) return;
    writerRef.current.showCharacter();
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
          Stroke Order
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => { setMode('animate'); handleReplay(); }}
            className={`px-2 py-1 rounded text-xs font-medium transition ${
              mode === 'animate' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            style={mode !== 'animate' ? { color: 'var(--text-secondary)' } : undefined}
          >
            <Eye size={12} className="inline mr-1" /> Watch
          </button>
          <button
            onClick={handleStartQuiz}
            className={`px-2 py-1 rounded text-xs font-medium transition ${
              mode === 'quiz' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            style={mode !== 'quiz' ? { color: 'var(--text-secondary)' } : undefined}
          >
            <Pencil size={12} className="inline mr-1" /> Practice
          </button>
        </div>
      </div>

      {/* Character Display */}
      <div className="text-center mb-2">
        {showPinyin && pinyin && (
          <p className="text-sm text-primary-600 mb-1">{pinyin}</p>
        )}
        {meaning && (
          <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>{meaning}</p>
        )}
      </div>

      {/* Hanzi Writer Container */}
      <div className="flex justify-center mb-3">
        <div className="border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 relative overflow-hidden" style={{ width: 200, height: 200 }}>
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 200 200">
            <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeDasharray="4,4" />
            <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeDasharray="4,4" />
            <line x1="0" y1="0" x2="200" y2="200" stroke="currentColor" strokeDasharray="4,4" />
            <line x1="200" y1="0" x2="0" y2="200" stroke="currentColor" strokeDasharray="4,4" />
          </svg>
          <div ref={containerRef} className="relative z-10" />
        </div>
      </div>

      {/* Mode indicator */}
      {mode === 'quiz' && (
        <div className="text-center mb-3">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {quizScore === null ? 'Draw the strokes in order' : 
             quizScore.correct > 0 ? '✓ Great job!' : 'Keep practicing!'}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={handlePlay}
          disabled={isAnimating}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition disabled:opacity-50"
        >
          <Play size={14} />
          {isAnimating ? 'Playing...' : 'Play'}
        </button>
        <button
          onClick={handleReplay}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg btn-secondary text-sm"
        >
          <RotateCcw size={14} />
          Replay
        </button>
        {mode === 'quiz' && (
          <button
            onClick={handleShowCharacter}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg btn-secondary text-sm"
          >
            <Eye size={14} />
            Show
          </button>
        )}
      </div>

      {/* Speed Control */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Speed:</span>
        {[0.5, 1, 1.5, 2].map(s => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className={`px-2 py-0.5 rounded text-xs transition ${
              speed === s ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 font-medium' : ''
            }`}
            style={speed !== s ? { color: 'var(--text-secondary)' } : undefined}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}
