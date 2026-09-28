import { useParams, useNavigate } from 'react-router-dom';
import { curriculum, getLessonById } from '../data/curriculum';
import { allVocabulary } from '../data/vocabulary';
import { grammarPoints } from '../data/grammar';
import { useAppState } from '../hooks/useStore';
import { AudioButton } from '../components/AudioButton';
import { ArrowLeft, CheckCircle, Clock, BookOpen, ChevronRight, ChevronLeft, Bookmark } from 'lucide-react';
import { useState } from 'react';

export function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const [currentStep, setCurrentStep] = useState(0);

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

  // Build lesson steps
  const steps: { type: string; label: string }[] = [];
  if (lesson.content.explanation) steps.push({ type: 'concept', label: 'Concept' });
  if (lessonVocab.length > 0) steps.push({ type: 'vocabulary', label: 'Vocabulary' });
  if (lessonGrammar.length > 0) steps.push({ type: 'grammar', label: 'Grammar' });
  if (lesson.type === 'pronunciation') steps.push({ type: 'practice', label: 'Practice' });
  steps.push({ type: 'review', label: 'Review' });

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

  // Find previous lesson
  let prevLessonId: string | null = null;
  if (currentLessonIndex > 0) {
    prevLessonId = week.lessons[currentLessonIndex - 1].id;
  } else if (currentWeekIndex > 0) {
    const prevWeek = curriculum[currentWeekIndex - 1];
    prevLessonId = prevWeek.lessons[prevWeek.lessons.length - 1].id;
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

      {/* Step Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              i === currentStep
                ? 'bg-primary-500 text-white'
                : i < currentStep
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700'
                  : 'bg-gray-100 dark:bg-gray-700'
            }`}
            style={i > currentStep && i !== currentStep ? { color: 'var(--text-secondary)' } : undefined}
          >
            {i < currentStep && '✓ '}
            {i + 1}. {step.label}
          </button>
        ))}
      </div>

      {/* Step Progress */}
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
      </div>

      {/* Step Content */}
      <div className="min-h-[300px]">
        {/* Concept Step */}
        {steps[currentStep]?.type === 'concept' && lesson.content.explanation && (
          <div className="card">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <BookOpen size={18} className="text-primary-500" /> What You'll Learn
            </h2>
            <div className="prose prose-sm max-w-none" style={{ color: 'var(--text-primary)' }}>
              {lesson.content.explanation.split('\n').map((para, i) => (
                <p key={i} className="mb-3 leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
        )}

        {/* Vocabulary Step */}
        {steps[currentStep]?.type === 'vocabulary' && lessonVocab.length > 0 && (
          <div className="card">
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              📝 New Vocabulary ({lessonVocab.length} words)
            </h2>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              Listen to each word and try to repeat it aloud.
            </p>
            <div className="space-y-3">
              {lessonVocab.map((word, i) => (
                <div key={word.id} className="p-3 rounded-lg border flex items-center gap-3" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-xs font-bold text-gray-400 w-6">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl chinese-char font-medium" style={{ color: 'var(--text-primary)' }}>
                        {state.characterSet === 'traditional' ? word.traditional : word.simplified}
                      </span>
                      <AudioButton text={word.simplified} size="sm" />
                      <span className="text-sm text-primary-600">{word.pinyin}</span>
                    </div>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{word.meaning}</p>
                    <div className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <span className="chinese-char">{word.exampleSentence}</span>
                      <span className="ml-2 italic">{word.exampleTranslation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grammar Step */}
        {steps[currentStep]?.type === 'grammar' && lessonGrammar.length > 0 && (
          <div className="card">
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              📐 Grammar Points
            </h2>
            {lessonGrammar.map(gp => (
              <div key={gp.id} className="mb-6 last:mb-0">
                <h3 className="font-semibold text-primary-600 mb-1">{gp.title}</h3>
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{gp.meaning}</p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-3">
                  <p className="text-sm font-mono" style={{ color: 'var(--text-primary)' }}>{gp.structure}</p>
                </div>
                <div className="space-y-2">
                  {gp.examples.map((ex, i) => (
                    <div key={i} className="text-sm flex items-start gap-2">
                      <AudioButton text={ex.chinese} size="sm" />
                      <div>
                        <p className="chinese-char">{ex.chinese}</p>
                        <p className="text-xs text-primary-600">{ex.pinyin}</p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{ex.english}</p>
                      </div>
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

        {/* Practice Step */}
        {steps[currentStep]?.type === 'practice' && (
          <div className="card">
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              🎯 Practice Time
            </h2>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              {lesson.content.explanation || 'Practice what you learned in this lesson.'}
            </p>
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                💡 <strong>Tip:</strong> Say each example out loud. Focus on getting the tones right. 
                Use the Tone Training page to practice specific tones.
              </p>
            </div>
            {lessonVocab.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Practice these words:</p>
                <div className="flex flex-wrap gap-2">
                  {lessonVocab.map(word => (
                    <div key={word.id} className="flex items-center gap-1 px-3 py-1.5 rounded-lg border" style={{ borderColor: 'var(--border-color)' }}>
                      <span className="chinese-char" style={{ color: 'var(--text-primary)' }}>{word.simplified}</span>
                      <AudioButton text={word.simplified} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Review Step */}
        {steps[currentStep]?.type === 'review' && (
          <div className="card text-center">
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              {isCompleted ? '✓ Lesson Complete!' : 'Ready to complete?'}
            </h2>
            {isCompleted ? (
              <div className="space-y-4">
                <p className="text-4xl">🎉</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Great work! You've completed this lesson.
                </p>
                <div className="flex gap-2 justify-center">
                  {nextLessonId && (
                    <button onClick={() => { navigate(`/lesson/${nextLessonId}`); setCurrentStep(0); }} className="btn-primary">
                      Next Lesson →
                    </button>
                  )}
                  <button onClick={() => navigate('/curriculum')} className="btn-secondary">
                    Back to Curriculum
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Mark this lesson as complete when you've studied the material.
                </p>
                <div className="flex gap-2 justify-center">
                  <button onClick={() => { handleComplete(); }} className="btn-primary">
                    ✓ Complete Lesson (+25 XP)
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <button
          onClick={() => {
            if (currentStep > 0) setCurrentStep(currentStep - 1);
            else if (prevLessonId) navigate(`/lesson/${prevLessonId}`);
          }}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
            currentStep === 0 && !prevLessonId ? 'invisible' : 'btn-secondary'
          }`}
        >
          <ChevronLeft size={16} /> {currentStep > 0 ? 'Previous' : 'Prev Lesson'}
        </button>

        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Step {currentStep + 1} of {steps.length}
        </span>

        <button
          onClick={() => {
            if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
            else if (nextLessonId) navigate(`/lesson/${nextLessonId}`);
          }}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
            currentStep === steps.length - 1 && !nextLessonId ? 'invisible' : 'btn-primary'
          }`}
        >
          {currentStep < steps.length - 1 ? 'Next' : 'Next Lesson'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
