import { useParams, useNavigate } from 'react-router-dom';
import { curriculum, getLessonById } from '../data/curriculum';
import { allVocabulary } from '../data/vocabulary';
import { grammarPoints } from '../data/grammar';
import { useAppState } from '../hooks/useStore';
import { ArrowLeft, CheckCircle, Clock, BookOpen, Play } from 'lucide-react';
import { useState } from 'react';

export function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const [showAnswer, setShowAnswer] = useState(false);

  const result = getLessonById(id || '');
  if (!result) {
    return (
      <div className="text-center py-20">
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Lesson not found</p>
        <button onClick={() => navigate('/curriculum')} className="btn-primary mt-4">Back to Curriculum</button>
      </div>
    );
  }

  const { lesson, week } = result;
  const isCompleted = state.progress.completedLessons.includes(lesson.id);

  const lessonVocab = lesson.content.vocabulary
    ? allVocabulary.filter(v => lesson.content.vocabulary!.includes(v.id))
    : [];

  const lessonGrammar = lesson.content.grammarPoints
    ? grammarPoints.filter(g => lesson.content.grammarPoints!.includes(g.id))
    : [];

  const handleComplete = () => {
    if (!isCompleted) {
      dispatch({ type: 'COMPLETE_LESSON', payload: lesson.id });
      dispatch({ type: 'ADD_XP', payload: 25 });
      dispatch({
        type: 'ADD_STUDY_SESSION',
        payload: { date: new Date().toISOString().split('T')[0], duration: lesson.duration, type: lesson.type, xpEarned: 25 }
      });
    }
  };

  // Find next lesson
  const currentWeekIndex = curriculum.findIndex(w => w.number === week.number);
  const currentLessonIndex = week.lessons.findIndex(l => l.id === lesson.id);
  let nextLessonId: string | null = null;
  if (currentLessonIndex < week.lessons.length - 1) {
    nextLessonId = week.lessons[currentLessonIndex + 1].id;
  } else if (currentWeekIndex < curriculum.length - 1) {
    nextLessonId = curriculum[currentWeekIndex + 1].lessons[0].id;
  }

  return (
    <div className="animate-fade-in max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate('/curriculum')} className="flex items-center gap-1 text-sm mb-3 hover:text-primary-500 transition" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft size={16} /> Back to Curriculum
        </button>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
            Week {week.number}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700" style={{ color: 'var(--text-secondary)' }}>
            {lesson.type}
          </span>
          <span className="text-xs flex items-center gap-0.5" style={{ color: 'var(--text-secondary)' }}>
            <Clock size={12} /> {lesson.duration} min
          </span>
        </div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{lesson.title}</h1>
        <p className="text-sm mt-1 chinese-char" style={{ color: 'var(--text-secondary)' }}>{lesson.titleCn}</p>
      </div>

      {/* Explanation */}
      {lesson.content.explanation && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <BookOpen size={18} className="text-primary-500" /> Lesson Content
          </h2>
          <div className="prose prose-sm max-w-none" style={{ color: 'var(--text-primary)' }}>
            {lesson.content.explanation.split('\n').map((para, i) => (
              <p key={i} className="mb-3 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      )}

      {/* Vocabulary */}
      {lessonVocab.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            📝 New Vocabulary ({lessonVocab.length} words)
          </h2>
          <div className="space-y-2">
            {lessonVocab.map(word => (
              <div key={word.id} className="p-3 rounded-lg border" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-3">
                  <span className="text-xl chinese-char font-medium" style={{ color: 'var(--text-primary)' }}>
                    {state.characterSet === 'traditional' ? word.traditional : word.simplified}
                  </span>
                  <span className="text-sm text-primary-600">{word.pinyin}</span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{word.meaning}</span>
                </div>
                <div className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <p className="chinese-char">{word.exampleSentence}</p>
                  <p className="text-xs mt-0.5">{word.examplePinyin}</p>
                  <p className="text-xs italic">{word.exampleTranslation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grammar */}
      {lessonGrammar.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            📐 Grammar Points
          </h2>
          {lessonGrammar.map(gp => (
            <div key={gp.id} className="mb-4 last:mb-0">
              <h3 className="font-semibold text-primary-600 mb-1">{gp.title}</h3>
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{gp.meaning}</p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-2">
                <p className="text-sm font-mono">{gp.structure}</p>
              </div>
              <div className="space-y-2">
                {gp.examples.map((ex, i) => (
                  <div key={i} className="text-sm">
                    <p className="chinese-char">{ex.chinese}</p>
                    <p className="text-xs text-primary-600">{ex.pinyin}</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{ex.english}</p>
                  </div>
                ))}
              </div>
              {gp.commonMistakes.length > 0 && (
                <div className="mt-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                  <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 mb-1">⚠️ Common Mistakes</p>
                  {gp.commonMistakes.map((m, i) => (
                    <p key={i} className="text-xs text-yellow-700 dark:text-yellow-400">• {m}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            {isCompleted ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={20} />
                <span className="font-medium">Lesson completed!</span>
              </div>
            ) : (
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Mark this lesson as complete when you're done studying.</p>
            )}
          </div>
          <div className="flex gap-2">
            {!isCompleted && (
              <button onClick={handleComplete} className="btn-primary">
                ✓ Complete Lesson
              </button>
            )}
            {nextLessonId && (
              <button onClick={() => navigate(`/lesson/${nextLessonId}`)} className="btn-secondary">
                Next Lesson →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
