import { useState } from 'react';
import { GrammarExercise as ExerciseType } from '../types';
import { AudioButton } from './AudioButton';

interface GrammarExerciseProps {
  exercise: ExerciseType;
  onComplete: (correct: boolean) => void;
}

export function GrammarExercise({ exercise, onComplete }: GrammarExerciseProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = () => {
    let correct = false;
    
    if (exercise.type === 'fill-blank' || exercise.type === 'translation') {
      correct = userAnswer.trim() === exercise.answer.trim();
    } else if (exercise.type === 'multiple-choice') {
      correct = userAnswer === exercise.answer;
    } else if (exercise.type === 'error-correction') {
      correct = userAnswer.trim() === exercise.answer.trim();
    }

    setIsCorrect(correct);
    setShowResult(true);
    onComplete(correct);
  };

  const reset = () => {
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
  };

  return (
    <div className="card">
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <p className="text-lg chinese-char mb-1" style={{ color: 'var(--text-primary)' }}>
              {exercise.question}
            </p>
            {exercise.questionPinyin && (
              <p className="text-sm text-primary-600">{exercise.questionPinyin}</p>
            )}
          </div>
          <AudioButton text={exercise.question} size="sm" />
        </div>
        
        {exercise.translation && (
          <p className="text-sm italic mt-2" style={{ color: 'var(--text-secondary)' }}>
            {exercise.translation}
          </p>
        )}
      </div>

      {/* Exercise Input */}
      {exercise.type === 'multiple-choice' && exercise.options && (
        <div className="space-y-2 mb-4">
          {exercise.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !showResult && setUserAnswer(option)}
              disabled={showResult}
              className={`w-full p-3 rounded-lg border text-left transition ${
                userAnswer === option
                  ? showResult
                    ? option === exercise.answer
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-primary-400 bg-primary-50 dark:bg-primary-900/20'
                  : showResult && option === exercise.answer
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'hover:border-primary-300'
              }`}
              style={{ borderColor: userAnswer !== option && !(showResult && option === exercise.answer) ? 'var(--border-color)' : undefined }}
            >
              <span className="chinese-char" style={{ color: 'var(--text-primary)' }}>{option}</span>
            </button>
          ))}
        </div>
      )}

      {(exercise.type === 'fill-blank' || exercise.type === 'translation' || exercise.type === 'error-correction') && (
        <div className="mb-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={showResult}
            placeholder={exercise.type === 'fill-blank' ? 'Type your answer...' : 'Type the complete sentence...'}
            className="w-full px-3 py-2 rounded-lg border text-sm chinese-char"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && userAnswer && !showResult) {
                checkAnswer();
              }
            }}
          />
        </div>
      )}

      {/* Result Display */}
      {showResult && (
        <div className={`p-3 rounded-lg mb-4 ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
          <p className={`text-sm font-medium mb-1 ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          {!isCorrect && (
            <div className="text-sm">
              <p className="mb-1" style={{ color: 'var(--text-primary)' }}>
                <strong>Correct answer:</strong> {exercise.answer}
              </p>
              {exercise.answerPinyin && (
                <p className="text-xs text-primary-600">{exercise.answerPinyin}</p>
              )}
            </div>
          )}
          <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
            {exercise.explanation}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        {!showResult ? (
          <button
            onClick={checkAnswer}
            disabled={!userAnswer}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={reset}
            className="btn-secondary flex-1"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
