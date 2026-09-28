import { useState } from 'react';

const initials = [
  { group: 'Labials', items: [{ py: 'b', ipa: '/p/', desc: 'Like English "b" but unaspirated', example: '八 bā' }, { py: 'p', ipa: '/pʰ/', desc: 'Like English "p" with strong puff of air', example: '怕 pà' }, { py: 'm', ipa: '/m/', desc: 'Like English "m"', example: '妈 mā' }, { py: 'f', ipa: '/f/', desc: 'Like English "f"', example: '发 fā' }] },
  { group: 'Alveolars', items: [{ py: 'd', ipa: '/t/', desc: 'Like English "d" but unaspirated', example: '大 dà' }, { py: 't', ipa: '/tʰ/', desc: 'Like English "t" with strong puff', example: '他 tā' }, { py: 'n', ipa: '/n/', desc: 'Like English "n"', example: '那 nà' }, { py: 'l', ipa: '/l/', desc: 'Like English "l"', example: '拉 lā' }] },
  { group: 'Velars', items: [{ py: 'g', ipa: '/k/', desc: 'Like English "g" but unaspirated', example: '个 gè' }, { py: 'k', ipa: '/kʰ/', desc: 'Like English "k" with strong puff', example: '可 kě' }, { py: 'h', ipa: '/x/', desc: 'Like "h" but further back, closer to German "ch"', example: '好 hǎo' }] },
  { group: 'Palatals', items: [{ py: 'j', ipa: '/tɕ/', desc: 'Like "jee" but with tongue flat against palate', example: '家 jiā' }, { py: 'q', ipa: '/tɕʰ/', desc: 'Like "chee" with strong aspiration', example: '七 qī' }, { py: 'x', ipa: '/ɕ/', desc: 'Like "shee" but softer, tongue flat', example: '西 xī' }] },
  { group: 'Retroflexes', items: [{ py: 'zh', ipa: '/ʈʂ/', desc: 'Like "jr" with tongue curled back', example: '中 zhōng' }, { py: 'ch', ipa: '/ʈʂʰ/', desc: 'Like "chr" with strong aspiration', example: '吃 chī' }, { py: 'sh', ipa: '/ʂ/', desc: 'Like "sh" with tongue curled back', example: '是 shì' }, { py: 'r', ipa: '/ɻ/', desc: 'Between English "r" and French "j"', example: '人 rén' }] },
  { group: 'Dentals', items: [{ py: 'z', ipa: '/ts/', desc: 'Like "ds" in "ads"', example: '字 zì' }, { py: 'c', ipa: '/tsʰ/', desc: 'Like "ts" with strong aspiration', example: '次 cì' }, { py: 's', ipa: '/s/', desc: 'Like English "s"', example: '三 sān' }] },
];

const finals = [
  { group: 'Simple Finals', items: [{ py: 'a', desc: 'Like "ah" - open mouth wide', example: '啊 ā' }, { py: 'o', desc: 'Like "aw" in "law" - rounded lips', example: '哦 ó' }, { py: 'e', desc: 'Like "uh" in "duh" - NOT like English "e"', example: '额 é' }, { py: 'i', desc: 'Like "ee" in "see"', example: '一 yī' }, { py: 'u', desc: 'Like "oo" in "moon"', example: '五 wǔ' }, { py: 'ü', desc: 'Like French "u" or German "ü" - round lips, say "ee"', example: '鱼 yú' }] },
  { group: 'Compound Finals', items: [{ py: 'ai', desc: 'Like "eye"', example: '爱 ài' }, { py: 'ei', desc: 'Like "ay" in "day"', example: '没 méi' }, { py: 'ao', desc: 'Like "ow" in "cow"', example: '好 hǎo' }, { py: 'ou', desc: 'Like "oh" in "go"', example: '走 zǒu' }] },
  { group: 'Nasal Finals', items: [{ py: 'an', desc: 'Like "an" in "an"', example: '安 ān' }, { py: 'en', desc: 'Like "en" in "taken"', example: '人 rén' }, { py: 'ang', desc: 'Like "ung" in "sung" but more open', example: '忙 máng' }, { py: 'eng', desc: 'Like "ung" in "lung"', example: '风 fēng' }, { py: 'ong', desc: 'Like "oong" - rounded', example: '中 zhōng' }] },
];

export function Pinyin() {
  const [tab, setTab] = useState<'initials' | 'finals'>('initials');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const data = tab === 'initials' ? initials : finals;

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Pinyin Course</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Master the pronunciation system of Mandarin Chinese
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button onClick={() => setTab('initials')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === 'initials' ? 'bg-primary-500 text-white' : 'btn-secondary'}`}>
          Initials (声母)
        </button>
        <button onClick={() => setTab('finals')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === 'finals' ? 'bg-primary-500 text-white' : 'btn-secondary'}`}>
          Finals (韵母)
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {data.map(group => (
          <div key={group.group}>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              {group.group}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.items.map(item => (
                <button
                  key={item.py}
                  onClick={() => setSelectedItem(selectedItem === item.py ? null : item.py)}
                  className={`card text-left transition ${selectedItem === item.py ? 'border-primary-400 ring-2 ring-primary-200 dark:ring-primary-800' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-primary-600 font-mono">{item.py}</span>
                    {'ipa' in item && <span className="text-xs text-gray-400 font-mono">{(item as typeof initials[number]['items'][number]).ipa}</span>}
                  </div>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                  <p className="text-sm mt-2 chinese-char" style={{ color: 'var(--text-primary)' }}>{item.example}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 Key Tips</h3>
        <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-400">
          <li>• Mandarin has no consonant clusters - each syllable starts with at most one consonant</li>
          <li>• The "unaspirated" consonants (b, d, g, j, zh, z) are NOT voiced like English - they're voiceless but without the puff of air</li>
          <li>• j/q/x are always followed by i or ü sounds</li>
          <li>• zh/ch/sh/r are "retroflex" - curl your tongue tip back</li>
          <li>• The letter "x" is NOT like English "x" - it's a soft "sh" sound</li>
          <li>• "q" is NOT like English "q/kw" - it's like a strong "ch" + "ee"</li>
        </ul>
      </div>
    </div>
  );
}
