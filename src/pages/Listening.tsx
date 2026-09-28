import { useState } from 'react';

const listeningItems = [
  {
    id: 'l1', title: 'Greetings', titleCn: '问候', level: 1, speed: 'slow' as const,
    transcript: '你好！你叫什么名字？我叫大卫。你是哪国人？我是美国人。很高兴认识你！',
    pinyin: 'Nǐ hǎo! Nǐ jiào shénme míngzi? Wǒ jiào Dàwèi. Nǐ shì nǎ guó rén? Wǒ shì Měiguó rén. Hěn gāoxìng rènshi nǐ!',
    translation: 'Hello! What is your name? My name is David. Which country are you from? I am American. Nice to meet you!',
    vocabulary: ['你好', '名字', '叫', '哪国', '认识'],
  },
  {
    id: 'l2', title: 'At the Store', titleCn: '在商店', level: 1, speed: 'slow' as const,
    transcript: '请问，这个多少钱？这个十五块。太贵了！可以便宜一点吗？好的，十二块。谢谢你！',
    pinyin: `Qǐngwèn, zhège duōshǎo qián? Zhège shíwǔ kuài. Tài guì le! Kěyǐ piányi yīdiǎn ma? Hǎo de, shí'èr kuài. Xièxie nǐ!`,
    translation: 'Excuse me, how much is this? This is 15 yuan. Too expensive! Can it be a bit cheaper? OK, 12 yuan. Thank you!',
    vocabulary: ['多少钱', '太贵了', '便宜', '谢谢'],
  },
  {
    id: 'l3', title: 'Making Plans', titleCn: '约计划', level: 2, speed: 'normal' as const,
    transcript: '明天你有空吗？我想去看电影。什么电影？新出的那个中国电影，听说很好看。好啊！几点？下午三点怎么样？好的，到时候见！',
    pinyin: 'Míngtiān nǐ yǒu kòng ma? Wǒ xiǎng qù kàn diànyǐng. Shénme diànyǐng? Xīn chū de nàge Zhōngguó diànyǐng, tīng shuō hěn hǎokàn. Hǎo a! Jǐ diǎn? Xiàwǔ sān diǎn zěnmeyàng? Hǎo de, dàoshíhòu jiàn!',
    translation: 'Are you free tomorrow? I want to go watch a movie. What movie? That new Chinese movie, I heard it\'s really good. Sure! What time? How about 3 PM? OK, see you then!',
    vocabulary: ['有空', '电影', '听说', '好看', '到时候见'],
  },
];

export function Listening() {
  const [selected, setSelected] = useState(listeningItems[0]);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showPinyin, setShowPinyin] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Listening 听力</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Train your ear with graded listening exercises
        </p>
      </div>

      {/* Item Selector */}
      <div className="flex gap-2 flex-wrap">
        {listeningItems.map(item => (
          <button
            key={item.id}
            onClick={() => { setSelected(item); setShowTranscript(false); setShowPinyin(false); setShowTranslation(false); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              selected.id === item.id ? 'bg-primary-500 text-white' : 'btn-secondary'
            }`}
          >
            {item.titleCn} (HSK{item.level})
          </button>
        ))}
      </div>

      {/* Player */}
      <div className="card">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{selected.titleCn}</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selected.title} • {selected.speed} speed</p>
        </div>

        {/* Play Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition shadow-lg"
          >
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
            )}
          </button>
        </div>

        {isPlaying && (
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-1">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-1 bg-primary-400 rounded-full animate-pulse" style={{ height: `${Math.random() * 24 + 8}px`, animationDelay: `${i * 0.05}s` }} />
              ))}
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>Audio playback simulated • Add MP3 files to enable real audio</p>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-2 justify-center mb-4">
          <button onClick={() => setShowTranscript(!showTranscript)} className={`px-3 py-1.5 rounded-lg text-sm transition ${showTranscript ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700' : 'btn-secondary'}`}>
            {showTranscript ? '✓' : '📝'} Transcript
          </button>
          <button onClick={() => setShowPinyin(!showPinyin)} className={`px-3 py-1.5 rounded-lg text-sm transition ${showPinyin ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700' : 'btn-secondary'}`}>
            {showPinyin ? '✓' : '🔤'} Pinyin
          </button>
          <button onClick={() => setShowTranslation(!showTranslation)} className={`px-3 py-1.5 rounded-lg text-sm transition ${showTranslation ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700' : 'btn-secondary'}`}>
            {showTranslation ? '✓' : '🌐'} Translation
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {showTranscript && (
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Transcript</p>
              <p className="chinese-char text-lg" style={{ color: 'var(--text-primary)' }}>{selected.transcript}</p>
            </div>
          )}
          {showPinyin && (
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Pinyin</p>
              <p className="text-sm text-primary-600 font-mono">{selected.pinyin}</p>
            </div>
          )}
          {showTranslation && (
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Translation</p>
              <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>{selected.translation}</p>
            </div>
          )}
        </div>
      </div>

      {/* Vocabulary */}
      <div className="card">
        <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Key Vocabulary</h3>
        <div className="flex flex-wrap gap-2">
          {selected.vocabulary.map(word => (
            <span key={word} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm chinese-char" style={{ color: 'var(--text-primary)' }}>
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Shadowing Section */}
      <div className="card bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
        <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">🎙 Shadowing Practice</h3>
        <p className="text-sm text-purple-700 dark:text-purple-400 mb-3">
          Listen to each sentence, then repeat it aloud, matching the rhythm and tones.
        </p>
        <div className="space-y-2">
          {selected.transcript.split(/[。！？]/).filter(s => s.trim()).map((sentence, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded bg-white/50 dark:bg-black/20">
              <span className="text-xs font-bold text-purple-500 w-6">{i + 1}</span>
              <span className="chinese-char text-sm" style={{ color: 'var(--text-primary)' }}>{sentence}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
