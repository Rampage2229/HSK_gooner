import { ExternalLink } from 'lucide-react';

const resources = [
  {
    category: '📱 Essential Apps',
    items: [
      { name: 'Pleco', desc: 'The best Chinese dictionary app - offline, with handwriting recognition', url: 'https://pleco.com', recommended: true },
      { name: 'Anki', desc: 'Spaced repetition flashcard app - essential for vocabulary', url: 'https://apps.ankiweb.net', recommended: true },
      { name: 'HelloTalk', desc: 'Language exchange with native Chinese speakers', url: 'https://hellotalk.com' },
      { name: 'Tandem', desc: 'Find language partners for conversation practice', url: 'https://tandem.net' },
    ],
  },
  {
    category: '🎴 Anki Decks (Download These)',
    items: [
      { name: 'Spoonfed Chinese', desc: '20,000+ sentences with audio, sorted by difficulty', url: 'https://ankiweb.net/shared/info/972097244', recommended: true },
      { name: 'HSK 1-6 Complete', desc: 'All HSK vocabulary with audio and example sentences', url: 'https://ankiweb.net/shared/info/1258807169', recommended: true },
      { name: 'Chinese Grammar Wiki', desc: 'Grammar points from the famous AllSet Learning wiki', url: 'https://ankiweb.net/shared/info/1266294775' },
      { name: 'Radical分解', desc: 'Learn character components and radicals', url: 'https://ankiweb.net/shared/info/1032808645' },
      { name: 'Taiwan Mandarin Audio', desc: 'HSK words with native Taiwanese Mandarin audio', url: 'https://ankiweb.net/shared/info/1580386963' },
    ],
  },
  {
    category: '🎧 Listening Practice',
    items: [
      { name: 'ChinesePod', desc: 'Podcast lessons for all levels (free & paid)', url: 'https://chinesepod.com' },
      { name: 'Mandarin Corner', desc: 'YouTube channel with graded listening content', url: 'https://youtube.com/@mandarincorner' },
      { name: 'Chillchat', desc: 'Real-life Chinese conversations with transcripts', url: 'https://chillchat.me' },
      { name: 'Maayot', desc: 'Daily graded reading with audio', url: 'https://maayot.com' },
    ],
  },
  {
    category: '📚 Reading Materials',
    items: [
      { name: 'Du Chinese', desc: 'Graded reading app with tap-to-translate', url: 'https://duchinese.net', recommended: true },
      { name: 'Mandarin Companion', desc: 'Graded readers using limited vocabulary', url: 'https://mandarincompanion.com' },
      { name: 'The Chairman\'s Bao', desc: 'News-based graded reading', url: 'https://thechairmansbao.com' },
      { name: 'Chinese Grammar Wiki', desc: 'Comprehensive grammar reference', url: 'https://resources.allsetlearning.com/chinese/grammar', recommended: true },
    ],
  },
  {
    category: '🎓 Online Courses',
    items: [
      { name: 'Yoyo Chinese', desc: 'Video courses with clear explanations', url: 'https://yoyochinese.com' },
      { name: 'Coursera - Peking University', desc: 'Free university-level Chinese courses', url: 'https://coursera.org' },
      { name: 'edX Chinese Courses', desc: 'University courses from top institutions', url: 'https://edx.org' },
      { name: 'HSK Standard Course', desc: 'Official HSK preparation textbooks', url: 'https://chinesetest.cn' },
    ],
  },
  {
    category: '🗣 Speaking & Tutoring',
    items: [
      { name: 'italki', desc: 'Affordable 1-on-1 tutoring with native speakers', url: 'https://italki.com', recommended: true },
      { name: 'Preply', desc: 'Online language tutoring platform', url: 'https://preply.com' },
      { name: 'Lang-8', desc: 'Write in Chinese, get corrections from natives', url: 'https://lang-8.com' },
    ],
  },
  {
    category: '📺 Video & Entertainment',
    items: [
      { name: 'YouTube - ShuoshuoChinese', desc: 'Comprehensible input for intermediate learners', url: 'https://youtube.com/@shuoshuochinese' },
      { name: 'Chinese Zero to Hero', desc: 'HSK-focused video lessons', url: 'https://chinesepod.com' },
      { name: 'Viki', desc: 'Chinese dramas with subtitles', url: 'https://viki.com' },
      { name: 'iQIYI', desc: 'Chinese streaming platform (like Netflix)', url: 'https://iqiyi.com' },
    ],
  },
];

export function Resources() {
  return (
    <div className="animate-fade-in space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>External Resources</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Curated tools and materials to accelerate your learning
        </p>
      </div>

      <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-400">
          💡 <strong>Recommended setup:</strong> Install Pleco (dictionary) + Anki (flashcards) + italki (tutoring). Use the Anki decks below to build your vocabulary systematically.
        </p>
      </div>

      <div className="space-y-4">
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
                  className="flex items-start gap-3 p-3 rounded-lg border hover:border-primary-300 transition group"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                        {item.name}
                      </p>
                      {item.recommended && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                          Recommended
                        </span>
                      )}
                      <ExternalLink size={12} className="text-gray-400 group-hover:text-primary-500" />
                    </div>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
        <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">💡 How to Use Anki Effectively</h3>
        <ul className="text-sm space-y-2 text-amber-700 dark:text-amber-400">
          <li>• <strong>Start small:</strong> Review 20-30 new cards per day maximum</li>
          <li>• <strong>Be consistent:</strong> Review every day, even if just for 10 minutes</li>
          <li>• <strong>Use the recommended decks:</strong> Spoonfed Chinese + HSK vocabulary</li>
          <li>• <strong>Add your own cards:</strong> When you encounter new words in reading/listening</li>
          <li>• <strong>Don't break the chain:</strong> Anki's algorithm works best with daily reviews</li>
        </ul>
      </div>
    </div>
  );
}
