import { useState, useRef } from 'react';
import { Mic, Square, Play, RotateCcw } from 'lucide-react';

const speakingPrompts = [
  { id: 's1', level: 'Beginner', prompt: '介绍一下你自己。', english: 'Introduce yourself.', hint: '我叫... 我是...人 我在...学习' },
  { id: 's2', level: 'Beginner', prompt: '你今天做了什么？', english: 'What did you do today?', hint: '今天我... 然后... 下午...' },
  { id: 's3', level: 'Beginner', prompt: '你喜欢吃什么？', english: 'What do you like to eat?', hint: '我喜欢吃... 我不喜欢吃...' },
  { id: 's4', level: 'Intermediate', prompt: '介绍一下你的家乡。', english: 'Introduce your hometown.', hint: '我的家乡在... 那里有... 我觉得...' },
  { id: 's5', level: 'Intermediate', prompt: '你觉得学中文难吗？为什么？', english: 'Do you think learning Chinese is difficult? Why?', hint: '我觉得... 因为... 比如...' },
  { id: 's6', level: 'Advanced', prompt: '谈谈你对中国文化的看法。', english: 'Talk about your views on Chinese culture.', hint: '我认为... 一方面... 另一方面...' },
];

export function Speaking() {
  const [selectedPrompt, setSelectedPrompt] = useState(speakingPrompts[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime(t => t + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setHasRecording(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Speaking 口语</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Practice speaking with guided prompts at your level
        </p>
      </div>

      {/* Prompt Selector */}
      <div className="flex gap-2 flex-wrap">
        {speakingPrompts.map(p => (
          <button
            key={p.id}
            onClick={() => { setSelectedPrompt(p); setHasRecording(false); setRecordingTime(0); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              selectedPrompt.id === p.id ? 'bg-primary-500 text-white' : 'btn-secondary'
            }`}
          >
            {p.level}
          </button>
        ))}
      </div>

      {/* Speaking Card */}
      <div className="card text-center">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>
            {selectedPrompt.level} Prompt
          </p>
          <p className="text-3xl chinese-char font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            {selectedPrompt.prompt}
          </p>
          <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
            {selectedPrompt.english}
          </p>
        </div>

        {/* Hint */}
        <div className="mb-6 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 max-w-md mx-auto">
          <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Useful phrases:</p>
          <p className="text-sm chinese-char" style={{ color: 'var(--text-primary)' }}>{selectedPrompt.hint}</p>
        </div>

        {/* Recording Interface */}
        <div className="mb-4">
          {isRecording ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-lg font-mono font-bold text-red-500">{formatTime(recordingTime)}</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                {[...Array(30)].map((_, i) => (
                  <div key={i} className="w-1 bg-red-400 rounded-full animate-pulse" style={{ height: `${Math.random() * 30 + 5}px`, animationDelay: `${i * 0.03}s` }} />
                ))}
              </div>
              <button onClick={stopRecording} className="btn-primary flex items-center gap-2 mx-auto">
                <Square size={16} /> Stop Recording
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <button onClick={startRecording} className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center mx-auto hover:bg-red-600 transition shadow-lg">
                <Mic size={24} />
              </button>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {hasRecording ? 'Tap to record again' : 'Tap to start recording'}
              </p>
            </div>
          )}
        </div>

        {hasRecording && !isRecording && (
          <div className="flex items-center justify-center gap-3">
            <button className="btn-secondary flex items-center gap-1">
              <Play size={14} /> Replay
            </button>
            <button className="btn-secondary flex items-center gap-1">
              <RotateCcw size={14} /> Re-record
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 Speaking Tips</h3>
        <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-400">
          <li>• Don't worry about perfection - focus on being understood</li>
          <li>• Record yourself and listen back to identify issues</li>
          <li>• Practice tones in context, not in isolation</li>
          <li>• Use the hints as starting points, then expand</li>
          <li>• Aim for fluency over accuracy at this stage</li>
        </ul>
      </div>

      {/* AI Tutor Placeholder */}
      <div className="card bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
        <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">🤖 AI Conversation Partner</h3>
        <p className="text-sm text-purple-700 dark:text-purple-400 mb-3">
          Practice conversations with an AI tutor (coming soon). The tutor will adapt to your level and correct your mistakes.
        </p>
        <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20 space-y-2">
          <div className="flex gap-2">
            <span className="text-xs px-2 py-0.5 rounded bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300">Tutor</span>
            <span className="text-sm chinese-char" style={{ color: 'var(--text-primary)' }}>你好！今天你想聊什么？</span>
          </div>
          <div className="flex gap-2">
            <span className="text-xs px-2 py-0.5 rounded bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300">You</span>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Type your response here...</span>
          </div>
        </div>
        <p className="text-xs mt-2 text-purple-500">Connect an LLM API to enable this feature</p>
      </div>
    </div>
  );
}
