import { useState } from 'react';
import { useAppState } from '../hooks/useStore';

const readingTexts = [
  {
    id: 'r1',
    title: 'My Day',
    titleCn: '我的一天',
    level: 1,
    simplified: '今天星期六。我早上七点起床。我先刷牙，然后吃早饭。早饭我吃面包，喝牛奶。九点我去图书馆看书。中午十二点我和朋友一起吃饭。下午我在家里学习中文。晚上我看电视，然后睡觉。',
    pinyin: `Jīntiān xīngqīliù. Wǒ zǎoshang qī diǎn qǐchuáng. Wǒ xiān shuā yá, ránhòu chī zǎofàn. Zǎofàn wǒ chī miànbāo, hē niúnǎi. Jiǔ diǎn wǒ qù túshūguǎn kàn shū. Zhōngwǔ shí'èr diǎn wǒ hé péngyǒu yīqǐ chīfàn. Xiàwǔ wǒ zài jiā lǐ xuéxí Zhōngwén. Wǎnshàng wǒ kàn diànshì, ránhòu shuìjiào.`,
    translation: 'Today is Saturday. I get up at 7 in the morning. I brush my teeth first, then eat breakfast. For breakfast I eat bread and drink milk. At 9 I go to the library to read. At noon at 12 I eat with friends. In the afternoon I study Chinese at home. In the evening I watch TV, then sleep.',
    vocabulary: ['今天', '星期六', '早上', '起床', '刷牙', '吃', '早饭', '面包', '牛奶', '图书馆', '看书', '中午', '朋友', '学习', '中文', '晚上', '电视', '睡觉'],
  },
  {
    id: 'r2',
    title: 'At the Restaurant',
    titleCn: '在饭馆',
    level: 1,
    simplified: '你好！请给我看一下菜单。我想吃面条和饺子。你们有茶吗？好的，请给我一杯绿茶。面条多少钱？二十五块？好的，我就要这些。谢谢！',
    pinyin: 'Nǐ hǎo! Qǐng gěi wǒ kàn yīxià càidān. Wǒ xiǎng chī miàntiáo hé jiǎozi. Nǐmen yǒu chá ma? Hǎo de, qǐng gěi wǒ yī bēi lǜchá. Miàntiáo duōshǎo qián? Èrshíwǔ kuài? Hǎo de, wǒ jiù yào zhèxiē. Xièxie!',
    translation: "Hello! Please show me the menu. I want to eat noodles and dumplings. Do you have tea? OK, please give me a cup of green tea. How much are the noodles? 25 yuan? OK, I'll have these. Thank you!",
    vocabulary: ['菜单', '面条', '饺子', '茶', '绿茶', '多少钱', '块'],
  },
  {
    id: 'r3',
    title: 'My Friend',
    titleCn: '我的朋友',
    level: 2,
    simplified: '我有一个好朋友，他叫李明。他是中国人，今年二十五岁。他在大学学英语。他很高，头发很短。他喜欢运动和看书。我们每个周末一起打篮球。虽然他很忙，但是他总是有时间见面。我觉得他是一个很好的人。',
    pinyin: 'Wǒ yǒu yī gè hǎo péngyǒu, tā jiào Lǐ Míng. Tā shì Zhōngguó rén, jīnnián èrshíwǔ suì. Tā zài dàxué xué Yīngyǔ. Tā hěn gāo, tóufa hěn duǎn. Tā xǐhuān yùndòng hé kàn shū. Wǒmen měi gè zhōumò yīqǐ dǎ lánqiú. Suīrán tā hěn máng, dànshì tā zǒng shì yǒu shíjiān jiànmiàn. Wǒ juéde tā shì yī gè hěn hǎo de rén.',
    translation: 'I have a good friend, his name is Li Ming. He is Chinese, 25 years old this year. He studies English at university. He is very tall with short hair. He likes sports and reading. We play basketball together every weekend. Although he is very busy, he always has time to meet. I think he is a very good person.',
    vocabulary: ['朋友', '中国人', '大学', '英语', '运动', '篮球', '周末', '虽然', '但是', '总是', '觉得'],
  },
];

export function Reading() {
  const { state } = useAppState();
  const [selectedText, setSelectedText] = useState(readingTexts[0]);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [clickedWord, setClickedWord] = useState<string | null>(null);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Reading 阅读</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Graded reading materials with interactive vocabulary
        </p>
      </div>

      {/* Text Selector */}
      <div className="flex gap-2 flex-wrap">
        {readingTexts.map(text => (
          <button
            key={text.id}
            onClick={() => { setSelectedText(text); setClickedWord(null); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              selectedText.id === text.id ? 'bg-primary-500 text-white' : 'btn-secondary'
            }`}
          >
            {text.titleCn} (HSK{text.level})
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-3 flex-wrap">
        <button onClick={() => setShowPinyin(!showPinyin)} className={`px-3 py-1.5 rounded-lg text-sm transition ${showPinyin ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700' : 'btn-secondary'}`}>
          {showPinyin ? '✓' : ''} Pinyin
        </button>
        <button onClick={() => setShowTranslation(!showTranslation)} className={`px-3 py-1.5 rounded-lg text-sm transition ${showTranslation ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700' : 'btn-secondary'}`}>
          {showTranslation ? '✓' : ''} Translation
        </button>
      </div>

      {/* Reading Area */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          {selectedText.titleCn}
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{selectedText.title} • HSK {selectedText.level}</p>

        <div className="prose max-w-none">
          {showPinyin && (
            <p className="text-sm text-primary-600 mb-2 leading-relaxed font-mono">{selectedText.pinyin}</p>
          )}
          <p className="text-lg chinese-char leading-loose" style={{ color: 'var(--text-primary)' }}>
            {selectedText.simplified.split('').map((char, i) => {
              const isPunctuation = /[，。！？、；：""''（）《》]/.test(char);
              return (
                <span
                  key={i}
                  className={`${!isPunctuation ? 'cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded px-0.5 transition' : ''}`}
                  onClick={() => !isPunctuation && setClickedWord(char)}
                >
                  {char}
                </span>
              );
            })}
          </p>
        </div>

        {showTranslation && (
          <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>{selectedText.translation}</p>
          </div>
        )}
      </div>

      {/* Word Info Popup */}
      {clickedWord && (
        <div className="card border-primary-300 dark:border-primary-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl chinese-char" style={{ color: 'var(--text-primary)' }}>{clickedWord}</span>
              <div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {selectedText.vocabulary.includes(clickedWord) ? '✓ In vocabulary list' : 'Click to add to vocabulary'}
                </p>
              </div>
            </div>
            <button onClick={() => setClickedWord(null)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
        </div>
      )}

      {/* Vocabulary List */}
      <div className="card">
        <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Key Vocabulary</h3>
        <div className="flex flex-wrap gap-2">
          {selectedText.vocabulary.map(word => (
            <span key={word} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm chinese-char cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-900/30 transition" style={{ color: 'var(--text-primary)' }}>
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
