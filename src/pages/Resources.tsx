import { ExternalLink } from 'lucide-react';

const resources = [
  {
    category: '📖 Dictionary',
    items: [
      { name: 'Pleco', desc: 'The essential Chinese dictionary app', url: 'https://pleco.com' },
      { name: 'Line Dictionary', desc: 'Free online Chinese-English dictionary', url: 'https://dictionary.line.me' },
    ],
  },
  {
    category: '📐 Grammar',
    items: [
      { name: 'Chinese Grammar Wiki', desc: 'Comprehensive grammar reference by AllSet Learning', url: 'https://resources.allsetlearning.com/chinese/grammar' },
      { name: 'GrammarSnacks', desc: 'Video-based grammar lessons', url: 'https://grammarsnacks.com' },
    ],
  },
  {
    category: '🎧 Listening',
    items: [
      { name: 'Mandarin Corner', desc: 'Graded listening content on YouTube', url: 'https://youtube.com/@mandarincorner' },
      { name: 'ChinesePod', desc: 'Podcast-style lessons for all levels', url: 'https://chinesepod.com' },
      { name: ' Chillchat', desc: 'Real-life Chinese conversations', url: 'https://chillchat.me' },
    ],
  },
  {
    category: '📚 Reading',
    items: [
      { name: 'Mandarin Companion', desc: 'Graded readers using limited vocabulary', url: 'https://mandarincompanion.com' },
      { name: 'Du Chinese', desc: 'Graded reading app with audio', url: 'https://duchinese.net' },
      { name: 'The Chairman\'s Bao', desc: 'News-based graded reading', url: 'https://thechairmansbao.com' },
    ],
  },
  {
    category: '🎓 Courses',
    items: [
      { name: 'Yoyo Chinese', desc: 'Video courses with clear explanations', url: 'https://yoyochinese.com' },
      { name: 'HSK Standard Course', desc: 'Official HSK preparation textbooks', url: '#' },
      { name: 'Coursera - Peking University', desc: 'Free university-level Chinese courses', url: 'https://coursera.org' },
    ],
  },
  {
    category: '🔄 SRS / Flashcards',
    items: [
      { name: 'Anki', desc: 'Powerful spaced repetition flashcard app', url: 'https://apps.ankiweb.net' },
      { name: 'Hack Chinese', desc: 'Minimalist SRS for Chinese vocabulary', url: 'https://hackchinese.com' },
      { name: 'Skritter', desc: 'SRS focused on character writing', url: 'https://skritter.com' },
    ],
  },
  {
    category: '🗣 Speaking / Exchange',
    items: [
      { name: 'italki', desc: 'Find affordable Chinese tutors online', url: 'https://italki.com' },
      { name: 'HelloTalk', desc: 'Language exchange with native speakers', url: 'https://hellotalk.com' },
      { name: 'Tandem', desc: 'Find language partners worldwide', url: 'https://tandem.net' },
    ],
  },
  {
    category: '📺 Video / Entertainment',
    items: [
      { name: 'YouTube - ShuoshuoChinese', desc: 'Comprehensible input for intermediate learners', url: 'https://youtube.com/@shuoshuochinese' },
      { name: 'Chinese Zero to Hero', desc: 'HSK-focused video lessons', url: 'https://chinesezerotohero.com' },
      { name: 'Viki', desc: 'Chinese dramas with subtitles', url: 'https://viki.com' },
    ],
  },
];

export function Resources() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Resources</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          External tools and materials to supplement your learning
        </p>
      </div>

      <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-400">
          💡 These resources are <strong>supplemental</strong>. The curriculum on this platform provides your structured learning path. Use these tools to enhance specific skills or explore topics in more depth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map(group => (
          <div key={group.category} className="card">
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{group.category}</h2>
            <div className="space-y-2">
              {group.items.map(item => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition group"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
                      {item.name}
                      <ExternalLink size={12} className="text-gray-400 group-hover:text-primary-500" />
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
