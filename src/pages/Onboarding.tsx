import { useState } from 'react';
import { useAppState } from '../hooks/useStore';
import { UserProfile, ExperienceLevel, Goal, DailyTime, CharacterSet, SpeakingPriority } from '../types';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const steps = [
  { title: 'Your Experience', key: 'experience' },
  { title: 'Your Goal', key: 'goal' },
  { title: 'Daily Time', key: 'dailyTime' },
  { title: 'Characters', key: 'characterSet' },
  { title: 'Speaking Priority', key: 'speakingPriority' },
];

export function Onboarding() {
  const { dispatch } = useAppState();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    experience: undefined,
    goal: undefined,
    dailyTime: undefined,
    characterSet: 'simplified',
    speakingPriority: 'medium',
  });

  const handleComplete = () => {
    const profile: UserProfile = {
      experience: formData.experience as ExperienceLevel,
      goal: formData.goal as Goal,
      dailyTime: formData.dailyTime as DailyTime,
      characterSet: (formData.characterSet || 'simplified') as CharacterSet,
      speakingPriority: (formData.speakingPriority || 'medium') as SpeakingPriority,
      startDate: new Date().toISOString(),
      onboarded: true,
    };
    dispatch({ type: 'SET_PROFILE', payload: profile });
  };

  const canProceed = () => {
    switch (step) {
      case 0: return !!formData.experience;
      case 1: return !!formData.goal;
      case 2: return !!formData.dailyTime;
      case 3: return !!formData.characterSet;
      case 4: return !!formData.speakingPriority;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            🀄 Mandarin<span className="text-primary-500">Zero→HSK5</span>
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Your complete path from zero to advanced Mandarin
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
          ))}
        </div>

        {/* Card */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            {steps[step].title}
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Step {step + 1} of {steps.length}
          </p>

          {/* Step 0: Experience */}
          {step === 0 && (
            <div className="space-y-2">
              {[
                { value: 'complete-beginner', label: 'Complete beginner', desc: 'I know zero Chinese' },
                { value: 'some-pinyin', label: 'I know some pinyin', desc: 'I can read pinyin but not characters' },
                { value: 'some-basic', label: 'I know some basic Mandarin', desc: 'I can say a few phrases' },
                { value: 'hsk1', label: 'HSK 1 level', desc: 'I know ~150 words and basic grammar' },
                { value: 'hsk2', label: 'HSK 2 level', desc: 'I can handle simple conversations' },
                { value: 'hsk3', label: 'HSK 3 level', desc: 'I can discuss familiar topics' },
                { value: 'hsk4+', label: 'HSK 4+', desc: 'Intermediate or above' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFormData({ ...formData, experience: opt.value as ExperienceLevel })}
                  className={`w-full text-left p-3 rounded-lg border transition ${
                    formData.experience === opt.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'hover:border-primary-300'
                  }`}
                  style={{ borderColor: formData.experience === opt.value ? undefined : 'var(--border-color)' }}
                >
                  <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{opt.label}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{opt.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 1: Goal */}
          {step === 1 && (
            <div className="space-y-2">
              {[
                { value: 'conversational', label: '💬 Conversational Mandarin', desc: 'Speak fluently in daily life' },
                { value: 'hsk-exam', label: '📝 HSK Examination', desc: 'Pass HSK exams systematically' },
                { value: 'university', label: '🎓 University', desc: 'Study at a Chinese university' },
                { value: 'travel', label: '✈️ Travel', desc: 'Navigate China confidently' },
                { value: 'living-in-china', label: '🏠 Living in China/Taiwan', desc: 'Daily life and work' },
                { value: 'reading', label: '📚 Reading Chinese', desc: 'Read books, news, and media' },
                { value: 'general', label: '🌏 General Interest', desc: 'Explore the language and culture' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFormData({ ...formData, goal: opt.value as Goal })}
                  className={`w-full text-left p-3 rounded-lg border transition ${
                    formData.goal === opt.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'hover:border-primary-300'
                  }`}
                  style={{ borderColor: formData.goal === opt.value ? undefined : 'var(--border-color)' }}
                >
                  <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{opt.label}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{opt.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Daily Time */}
          {step === 2 && (
            <div className="space-y-2">
              {[
                { value: '30min', label: '30 minutes/day', desc: 'Casual pace, slow but steady' },
                { value: '1h', label: '1 hour/day', desc: 'Solid daily practice' },
                { value: '2h', label: '2 hours/day', desc: 'Serious learner, fast progress' },
                { value: '3h', label: '3 hours/day', desc: 'Intensive study' },
                { value: '4h+', label: '4+ hours/day', desc: 'Full immersion pace' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFormData({ ...formData, dailyTime: opt.value as DailyTime })}
                  className={`w-full text-left p-3 rounded-lg border transition ${
                    formData.dailyTime === opt.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'hover:border-primary-300'
                  }`}
                  style={{ borderColor: formData.dailyTime === opt.value ? undefined : 'var(--border-color)' }}
                >
                  <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{opt.label}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{opt.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Character Set */}
          {step === 3 && (
            <div className="space-y-2">
              {[
                { value: 'simplified', label: '简体 Simplified', desc: 'Used in mainland China, Singapore' },
                { value: 'traditional', label: '繁體 Traditional', desc: 'Used in Taiwan, Hong Kong' },
                { value: 'both', label: 'Both', desc: 'Learn to recognize both forms' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFormData({ ...formData, characterSet: opt.value as CharacterSet })}
                  className={`w-full text-left p-3 rounded-lg border transition ${
                    formData.characterSet === opt.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'hover:border-primary-300'
                  }`}
                  style={{ borderColor: formData.characterSet === opt.value ? undefined : 'var(--border-color)' }}
                >
                  <p className="font-medium text-sm chinese-char" style={{ color: 'var(--text-primary)' }}>{opt.label}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{opt.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 4: Speaking Priority */}
          {step === 4 && (
            <div className="space-y-2">
              {[
                { value: 'low', label: '📖 Low', desc: 'Focus on reading and comprehension' },
                { value: 'medium', label: '💬 Medium', desc: 'Balanced approach to all skills' },
                { value: 'high', label: '🗣 High', desc: 'Prioritize speaking and conversation' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFormData({ ...formData, speakingPriority: opt.value as SpeakingPriority })}
                  className={`w-full text-left p-3 rounded-lg border transition ${
                    formData.speakingPriority === opt.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'hover:border-primary-300'
                  }`}
                  style={{ borderColor: formData.speakingPriority === opt.value ? undefined : 'var(--border-color)' }}
                >
                  <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{opt.label}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{opt.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition ${step === 0 ? 'invisible' : 'btn-secondary'}`}
            >
              <ChevronLeft size={16} /> Back
            </button>
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="btn-primary flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!canProceed()}
                className="btn-primary flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Learning 🚀
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
