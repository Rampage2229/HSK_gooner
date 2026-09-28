import { Week } from '../types';

export const curriculum: Week[] = [
  {
    number: 1,
    title: 'Foundations: Sounds of Mandarin',
    theme: 'Pinyin, Tones, and First Words',
    objectives: ['Master pinyin initials and finals', 'Produce all 4 tones accurately', 'Learn basic greetings', 'Understand what makes Mandarin unique'],
    lessons: [
      { id: 'w1l1', title: 'What is Mandarin?', titleCn: '什么是普通话？', description: 'An introduction to Mandarin Chinese - its history, where it\'s spoken, and why learning it is rewarding.', type: 'pronunciation', duration: 20, completed: false, content: { explanation: 'Mandarin (普通话/普通話, Pǔtōnghuà) is the official language of China, Taiwan, and Singapore. With over 900 million native speakers, it is the most spoken language in the world. Mandarin uses tones - the pitch of your voice changes the meaning of words. It uses characters (汉字) instead of an alphabet.' } },
      { id: 'w1l2', title: 'Pinyin: Initials', titleCn: '拼音：声母', description: 'Learn the consonant sounds (initials) of Mandarin using the pinyin system.', type: 'pronunciation', duration: 30, completed: false, content: { explanation: 'Pinyin is the romanization system for Mandarin. Initials are the consonant sounds at the beginning of syllables. There are 21 initials: b, p, m, f, d, t, n, l, g, k, h, j, q, x, zh, ch, sh, r, z, c, s. Key differences from English: j/q/x are palatal (tongue flat), zh/ch/sh are retroflex (tongue curled back), z/c/s are dental (tongue behind teeth).' } },
      { id: 'w1l3', title: 'Pinyin: Finals', titleCn: '拼音：韵母', description: 'Learn the vowel sounds (finals) of Mandarin.', type: 'pronunciation', duration: 30, completed: false, content: { explanation: 'Finals are the vowel sounds. Simple finals: a, o, e, i, u, ü. Compound finals: ai, ei, ao, ou, an, en, ang, eng, ong, ia, ie, iao, iu, ian, in, iang, ing, ua, uo, uai, ui, uan, un, uang, üe, üan, ün. The sound "e" is like "uh" in "duh". The sound "ü" is like French "u" or German "ü".' } },
      { id: 'w1l4', title: 'The Four Tones', titleCn: '四声', description: 'Master the four tones of Mandarin plus the neutral tone.', type: 'pronunciation', duration: 35, completed: false, content: { explanation: 'Tone 1 (mā): High and flat - like singing a sustained note. Tone 2 (má): Rising - like asking "what?" Tone 3 (mǎ): Dipping - goes down then up. Tone 4 (mà): Falling - sharp, like saying "No!" firmly. Neutral tone (ma): Light and short, no defined pitch. Tones are NOT optional - mā means "mother" while mà means "scold"!' } },
      { id: 'w1l5', title: 'Tone Pairs', titleCn: '声调组合', description: 'Practice combining tones in two-syllable words.', type: 'pronunciation', duration: 25, completed: false, content: { explanation: 'In real speech, tones combine in pairs. The most common patterns are: 1+1 (high+high), 4+1 (falling+high), 2+4 (rising+falling). Important: Two 3rd tones in sequence - the first becomes 2nd tone! Example: 你好 is actually pronounced ní hǎo, not nǐ hǎo.' } },
      { id: 'w1l6', title: 'Basic Greetings', titleCn: '基本问候', description: 'Learn essential greetings and polite expressions.', type: 'vocabulary', duration: 25, completed: false, content: { explanation: '你好 (nǐ hǎo) - Hello. 你好吗？(nǐ hǎo ma?) - How are you? 很好 (hěn hǎo) - Very good. 谢谢 (xièxie) - Thank you. 不客气 (bú kèqi) - You\'re welcome. 再见 (zàijiàn) - Goodbye. 对不起 (duìbuqǐ) - Sorry. 没关系 (méi guānxi) - It doesn\'t matter.', vocabulary: ['hsk1-001', 'hsk1-002', 'hsk1-003'] } },
      { id: 'w1r', title: 'Week 1 Review', titleCn: '第一周复习', description: 'Consolidate everything from Week 1.', type: 'review', duration: 30, completed: false, content: {} },
    ],
  },
  {
    number: 2,
    title: 'Numbers, Time & Introductions',
    theme: 'Survival Mandarin',
    objectives: ['Count 1-100', 'Tell time', 'Introduce yourself', 'Ask basic questions'],
    lessons: [
      { id: 'w2l1', title: 'Numbers 1-10', titleCn: '数字一到十', description: 'Learn to count from one to ten.', type: 'vocabulary', duration: 20, completed: false, content: { explanation: '一(yī) 二(èr) 三(sān) 四(sì) 五(wǔ) 六(liù) 七(qī) 八(bā) 九(jiǔ) 十(shí). Chinese numbers are very logical - 11 is 十一 (ten-one), 20 is 二十 (two-ten), 25 is 二十五 (two-ten-five).', vocabulary: ['hsk1-011', 'hsk1-012', 'hsk1-013', 'hsk1-014', 'hsk1-015', 'hsk1-016', 'hsk1-017', 'hsk1-018', 'hsk1-019', 'hsk1-020'] } },
      { id: 'w2l2', title: 'Telling Time', titleCn: '说时间', description: 'Learn to express time in Chinese.', type: 'vocabulary', duration: 25, completed: false, content: { explanation: '点 (diǎn) = o\'clock. 分 (fēn) = minute. 半 (bàn) = half. 现在几点？(xiànzài jǐ diǎn?) = What time is it now? 三点半 = 3:30. 上午 = morning, 下午 = afternoon, 晚上 = evening.' } },
      { id: 'w2l3', title: 'Days of the Week', titleCn: '星期几', description: 'Learn days of the week and dates.', type: 'vocabulary', duration: 20, completed: false, content: { explanation: '星期一 (Monday) through 星期日/星期天 (Sunday). The pattern is 星期 + number. 一月 = January, 二月 = February... 今天 = today, 明天 = tomorrow, 昨天 = yesterday.' } },
      { id: 'w2l4', title: 'Introducing Yourself', titleCn: '自我介绍', description: 'Learn to introduce yourself - name, nationality, occupation.', type: 'speaking', duration: 30, completed: false, content: { explanation: '我叫... (Wǒ jiào...) = My name is... 我是...人 (Wǒ shì...rén) = I am from... 我是学生/老师 (Wǒ shì xuéshēng/lǎoshī) = I am a student/teacher. 我今年...岁 (Wǒ jīnnián...suì) = I am ... years old.', vocabulary: ['hsk1-004', 'hsk1-008', 'hsk1-021', 'hsk1-023', 'hsk1-044'] } },
      { id: 'w2l5', title: 'Asking Questions', titleCn: '问问题', description: 'Learn question words and how to ask questions.', type: 'grammar', duration: 25, completed: false, content: { explanation: '什么 (shénme) = what. 哪 (nǎ) = which. 谁 (shéi) = who. 怎么 (zěnme) = how. 为什么 (wèishénme) = why. 多少 (duōshǎo) = how many/much. 几 (jǐ) = how many (small numbers). Question structure: same as statement + 吗 for yes/no, or question word replaces the answer.', grammarPoints: ['grammar-006'] } },
      { id: 'w2l6', title: 'Family Members', titleCn: '家庭成员', description: 'Learn vocabulary for family members.', type: 'vocabulary', duration: 20, completed: false, content: { explanation: '爸爸 (bàba) = dad, 妈妈 (māma) = mom, 哥哥 (gēge) = older brother, 姐姐 (jiějie) = older sister, 弟弟 (dìdi) = younger brother, 妹妹 (mèimei) = younger sister. Chinese distinguishes older/younger siblings and maternal/paternal relatives.' } },
      { id: 'w2r', title: 'Week 2 Review', titleCn: '第二周复习', description: 'Review numbers, time, and introductions.', type: 'review', duration: 30, completed: false, content: {} },
    ],
  },
  {
    number: 3,
    title: 'Daily Life & Basic Grammar',
    theme: 'Building Sentences',
    objectives: ['Use basic sentence patterns', 'Talk about daily activities', 'Express preferences', 'Use measure words'],
    lessons: [
      { id: 'w3l1', title: 'Sentence Order: SVO', titleCn: '主谓宾语序', description: 'Chinese uses Subject-Verb-Object order, like English.', type: 'grammar', duration: 25, completed: false, content: { explanation: 'Chinese basic word order is SVO: 我吃饭 (I eat rice). Time words go at the beginning or after the subject: 我今天吃饭 (I today eat). Place goes before the verb: 我在家吃饭 (I at home eat). The pattern is: Subject + Time + Place + Verb + Object.', grammarPoints: ['grammar-001'] } },
      { id: 'w3l2', title: 'Measure Words (个 and more)', titleCn: '量词', description: 'Learn how Chinese uses measure words between numbers and nouns.', type: 'grammar', duration: 30, completed: false, content: { explanation: 'In Chinese, you cannot say 一个人 directly - you need a measure word: 一个人 (yī gè rén). 个 (gè) is the most common and generic measure word. Others: 本 (běn) for books, 杯 (bēi) for cups, 块 (kuài) for pieces/yuan, 条 (tiáo) for long things, 张 (zhāng) for flat things.' } },
      { id: 'w3l3', title: 'Food & Drinks', titleCn: '食物和饮料', description: 'Learn vocabulary for ordering food and drinks.', type: 'vocabulary', duration: 25, completed: false, content: { explanation: '米饭 (mǐfàn) = rice, 面条 (miàntiáo) = noodles, 茶 (chá) = tea, 咖啡 (kāfēi) = coffee, 啤酒 (píjiǔ) = beer, 鸡蛋 (jīdàn) = egg, 菜 (cài) = dish/vegetable. 我要... = I want..., 请给我... = Please give me...', vocabulary: ['hsk1-027', 'hsk1-028', 'hsk1-029'] } },
      { id: 'w3l4', title: 'Negation: 不 vs 没', titleCn: '否定：不和没', description: 'Learn when to use 不 and when to use 没 for negation.', type: 'grammar', duration: 30, completed: false, content: { explanation: '不 (bù) negates present/future: 我不去 (I\'m not going). 没 (méi) negates past: 我没去 (I didn\'t go). 不 is for habits, desires, adjectives. 没 is for completed actions and 有. Key: 不知道 (don\'t know) uses 不 because it\'s present state.', grammarPoints: ['grammar-002', 'grammar-005'] } },
      { id: 'w3l5', title: 'Expressing Likes', titleCn: '表达喜好', description: 'Learn to talk about what you like and don\'t like.', type: 'vocabulary', duration: 20, completed: false, content: { explanation: '喜欢 (xǐhuān) = to like. 很喜欢 = to really like. 不喜欢 = to not like. 最爱 = favorite. 我对...感兴趣 = I\'m interested in... Pattern: 我喜欢 + Noun/Verb. 我喜欢看书 = I like reading.', vocabulary: ['hsk1-040'] } },
      { id: 'w3l6', title: 'First Characters', titleCn: '第一批汉字', description: 'Learn your first Chinese characters - recognizing, not writing.', type: 'characters', duration: 30, completed: false, content: { explanation: 'Start with the simplest characters: 一 (one), 二 (two), 三 (three), 人 (person), 大 (big), 小 (small), 口 (mouth), 日 (sun/day), 月 (moon/month), 山 (mountain). These are pictographic - they look like what they mean!' } },
      { id: 'w3r', title: 'Week 3 Review', titleCn: '第三周复习', description: 'Review sentence patterns and negation.', type: 'review', duration: 30, completed: false, content: {} },
    ],
  },
  {
    number: 4,
    title: 'Shopping, Directions & Survival',
    theme: 'Getting Around',
    objectives: ['Buy things in Chinese', 'Ask for directions', 'Describe locations', 'Handle basic transactions'],
    lessons: [
      { id: 'w4l1', title: 'Money & Shopping', titleCn: '钱和购物', description: 'Learn to talk about prices and buy things.', type: 'vocabulary', duration: 25, completed: false, content: { explanation: '钱 (qián) = money. 块/元 (kuài/yuán) = yuan (main unit). 角/毛 (jiǎo/máo) = jiao (1/10 yuan). 分 (fēn) = fen (1/100 yuan). 多少钱？= How much? 太贵了 = Too expensive! 便宜一点 = A bit cheaper.' } },
      { id: 'w4l2', title: 'Directions & Places', titleCn: '方向和地点', description: 'Learn to ask for and give directions.', type: 'vocabulary', duration: 30, completed: false, content: { explanation: '前 (qián) = front, 后 (hòu) = back, 左 (zuǒ) = left, 右 (yòu) = right. 前面 = in front, 后面 = behind, 左边 = left side, 右边 = right side. 往左走 = Go left. 往右走 = Go right. 直走 = Go straight.' } },
      { id: 'w4l3', title: 'Location Words', titleCn: '位置词', description: 'Learn to describe where things are.', type: 'grammar', duration: 25, completed: false, content: { explanation: '在 (zài) = at/in. 上 (shàng) = on/above. 下 (xià) = under/below. 里 (lǐ) = inside. 外 (wài) = outside. 旁边 (pángbiān) = beside. 中间 (zhōngjiān) = middle. Pattern: Place + 有 + Thing. 桌子上有书 = There are books on the table.' } },
      { id: 'w4l4', title: 'Transportation', titleCn: '交通工具', description: 'Learn vocabulary for getting around.', type: 'vocabulary', duration: 20, completed: false, content: { explanation: '出租车 (chūzūchē) = taxi, 地铁 (dìtiě) = subway, 公共汽车 (gōnggòng qìchē) = bus, 飞机 (fēijī) = airplane, 火车 (huǒchē) = train. 怎么去...？= How do I get to...? 坐 = to take (transport).' } },
      { id: 'w4l5', title: 'Making Appointments', titleCn: '约定时间', description: 'Learn to make plans and appointments.', type: 'speaking', duration: 25, completed: false, content: { explanation: '你明天有空吗？= Are you free tomorrow? 我们几点见面？= What time shall we meet? 好的 = OK. 没问题 = No problem. 改天吧 = Another day. Pattern: 在 + Time + Verb.' } },
      { id: 'w4l6', title: 'Emergency Phrases', titleCn: '紧急用语', description: 'Essential phrases for difficult situations.', type: 'vocabulary', duration: 20, completed: false, content: { explanation: '救命！= Help! 请帮帮我 = Please help me. 我不舒服 = I don\'t feel well. 医院在哪里？= Where is the hospital? 警察 = Police. 打电话 = Make a phone call. 请说慢一点 = Please speak slower.' } },
      { id: 'w4r', title: 'Week 4 Review & Assessment', titleCn: '第四周复习和测试', description: 'Review all Month 1 content. Self-assessment.', type: 'review', duration: 45, completed: false, content: {} },
    ],
  },
  {
    number: 5,
    title: 'HSK 1 Consolidation',
    theme: 'Solidifying the Basics',
    objectives: ['Complete all HSK 1 vocabulary', 'Master basic grammar', 'Pass HSK 1 mock test', 'Build character recognition'],
    lessons: [
      { id: 'w5l1', title: 'HSK 1 Vocabulary Review', titleCn: 'HSK1词汇复习', description: 'Review all HSK 1 vocabulary with spaced repetition.', type: 'vocabulary', duration: 30, completed: false, content: {} },
      { id: 'w5l2', title: 'Grammar Consolidation', titleCn: '语法巩固', description: 'Review all HSK 1 grammar points.', type: 'grammar', duration: 30, completed: false, content: {} },
      { id: 'w5l3', title: 'HSK 1 Listening Practice', titleCn: 'HSK1听力练习', description: 'Practice listening comprehension at HSK 1 level.', type: 'listening', duration: 30, completed: false, content: {} },
      { id: 'w5l4', title: 'HSK 1 Reading Practice', titleCn: 'HSK1阅读练习', description: 'Practice reading comprehension at HSK 1 level.', type: 'reading', duration: 30, completed: false, content: {} },
      { id: 'w5l5', title: 'HSK 1 Mock Test', titleCn: 'HSK1模拟考试', description: 'Take a full HSK 1 practice test.', type: 'review', duration: 60, completed: false, content: {} },
      { id: 'w5r', title: 'Week 5 Review', titleCn: '第五周复习', description: 'Review and identify weak areas.', type: 'review', duration: 30, completed: false, content: {} },
    ],
  },
  {
    number: 6,
    title: 'Expanding Your World',
    theme: 'HSK 2 Foundations',
    objectives: ['Begin HSK 2 vocabulary', 'Learn comparison structures', 'Talk about past experiences', 'Read simple paragraphs'],
    lessons: [
      { id: 'w6l1', title: 'Comparisons: 比', titleCn: '比较句', description: 'Learn to compare things using 比.', type: 'grammar', duration: 30, completed: false, content: { explanation: 'A 比 B + Adjective: 他比我高 = He is taller than me. A 比 B + Verb + 得 + Adjective: 他跑得比我快 = He runs faster than me. 最 (zuì) = most: 他最高 = He is the tallest.' } },
      { id: 'w6l2', title: 'Describing Weather', titleCn: '描述天气', description: 'Learn to talk about weather and seasons.', type: 'vocabulary', duration: 25, completed: false, content: { explanation: '天气 (tiānqì) = weather. 冷 (lěng) = cold. 热 (rè) = hot. 下雨 (xià yǔ) = rain. 下雪 (xià xuě) = snow. 春天 = spring, 夏天 = summer, 秋天 = autumn, 冬天 = winter. 今天很冷 = It\'s cold today.' } },
      { id: 'w6l3', title: 'Hobbies & Activities', titleCn: '爱好和活动', description: 'Learn to talk about hobbies and free time.', type: 'vocabulary', duration: 25, completed: false, content: { explanation: '运动 (yùndòng) = sports, 唱歌 (chànggē) = sing, 跳舞 (tiàowǔ) = dance, 画画 (huàhuà) = draw, 旅游 (lǚyóu) = travel, 打游戏 (dǎ yóuxì) = play games. 我的爱好是... = My hobby is...' } },
      { id: 'w6l4', title: 'Past Experiences: 过', titleCn: '经历：过', description: 'Learn to talk about things you\'ve done before.', type: 'grammar', duration: 30, completed: false, content: { explanation: 'Verb + 过 = have done before. 你去过中国吗？= Have you been to China? 我吃过北京烤鸭 = I\'ve eaten Peking duck. 我没看过这部电影 = I haven\'t seen this movie.', grammarPoints: ['grammar-009'] } },
      { id: 'w6l5', title: 'Connecting Ideas', titleCn: '连接词', description: 'Learn conjunctions to connect sentences.', type: 'grammar', duration: 25, completed: false, content: { explanation: '因为...所以... = because...so... 虽然...但是... = although...but... 如果...就... = if...then... 不但...而且... = not only...but also... 一边...一边... = while doing both...', grammarPoints: ['grammar-003'] } },
      { id: 'w6l6', title: 'Reading: Simple Stories', titleCn: '阅读：简单故事', description: 'Read your first connected Chinese text.', type: 'reading', duration: 30, completed: false, content: { explanation: 'Practice reading short paragraphs using HSK 1-2 vocabulary. Focus on recognizing characters in context rather than word-by-word translation.' } },
      { id: 'w6r', title: 'Week 6 Review', titleCn: '第六周复习', description: 'Review comparisons, past tense, and connectors.', type: 'review', duration: 30, completed: false, content: {} },
    ],
  },
  {
    number: 7,
    title: 'Expressing Opinions',
    theme: 'Going Beyond Basics',
    objectives: ['Express opinions and feelings', 'Use complements', 'Handle longer conversations', 'Build reading speed'],
    lessons: [
      { id: 'w7l1', title: 'Result Complements', titleCn: '结果补语', description: 'Learn verb + result patterns like 看到, 听到, 找到.', type: 'grammar', duration: 30, completed: false, content: { explanation: 'Verb + 到 = successfully verb: 看到 = see (catch sight of), 听到 = hear, 找到 = find, 得到 = get. Verb + 完 = finish verb: 吃完 = finish eating, 做完 = finish doing. Verb + 好 = finish properly: 准备好 = be ready.' } },
      { id: 'w7l2', title: 'Direction Complements', titleCn: '趋向补语', description: 'Learn verb + direction patterns.', type: 'grammar', duration: 30, completed: false, content: { explanation: 'Verb + 来 = verb + toward speaker: 拿来 = bring here, 跑来 = run over. Verb + 去 = verb + away from speaker: 送去 = send there, 走去 = walk away. Verb + 起来 = start to verb: 笑起来 = start laughing.' } },
      { id: 'w7l3', title: 'Expressing Opinions', titleCn: '表达意见', description: 'Learn phrases for stating and discussing opinions.', type: 'speaking', duration: 25, completed: false, content: { explanation: '我觉得... = I think/feel... 我认为... = I believe... 对我来说... = For me... 同意 = agree, 不同意 = disagree. 你怎么看？= What do you think? 有道理 = Makes sense.' } },
      { id: 'w7l4', title: 'Health & Body', titleCn: '健康和身体', description: 'Learn vocabulary for health and the body.', type: 'vocabulary', duration: 25, completed: false, content: { explanation: '头 (tóu) = head, 手 (shǒu) = hand, 眼睛 (yǎnjīng) = eye, 耳朵 (ěrduō) = ear, 嘴 (zuǐ) = mouth, 身体 (shēntǐ) = body. 生病 (shēngbìng) = sick, 吃药 (chī yào) = take medicine, 看医生 = see a doctor.' } },
      { id: 'w7l5', title: 'Listening: Conversations', titleCn: '听力：对话', description: 'Practice understanding everyday conversations.', type: 'listening', duration: 30, completed: false, content: { explanation: 'Listen to dialogues at HSK 2 speed. Focus on catching key words and understanding the overall meaning even if you miss some details.' } },
      { id: 'w7l6', title: 'Character Acceleration', titleCn: '汉字加速', description: 'Learn characters using radicals and components.', type: 'characters', duration: 30, completed: false, content: { explanation: 'Learn to break characters into components. 好 = 女(woman) + 子(child) = good. 明 = 日(sun) + 月(moon) = bright. 休 = 人(person) + 木(tree) = rest. Understanding radicals helps you guess meanings of new characters.' } },
      { id: 'w7r', title: 'Week 7 Review', titleCn: '第七周复习', description: 'Review complements and opinion expressions.', type: 'review', duration: 30, completed: false, content: {} },
    ],
  },
  {
    number: 8,
    title: 'Month 2 Consolidation',
    theme: 'HSK 2 Readiness',
    objectives: ['Complete HSK 2 vocabulary', 'Pass HSK 2 mock test', 'Hold 3-minute conversations', 'Read graded readers'],
    lessons: [
      { id: 'w8l1', title: 'HSK 2 Vocabulary Sprint', titleCn: 'HSK2词汇冲刺', description: 'Intensive review of all HSK 2 vocabulary.', type: 'vocabulary', duration: 30, completed: false, content: {} },
      { id: 'w8l2', title: 'HSK 2 Grammar Review', titleCn: 'HSK2语法复习', description: 'Review all HSK 2 grammar patterns.', type: 'grammar', duration: 30, completed: false, content: {} },
      { id: 'w8l3', title: 'Conversation Practice', titleCn: '会话练习', description: 'Practice extended conversations on familiar topics.', type: 'speaking', duration: 30, completed: false, content: {} },
      { id: 'w8l4', title: 'HSK 2 Mock Test', titleCn: 'HSK2模拟考试', description: 'Full HSK 2 practice examination.', type: 'review', duration: 60, completed: false, content: {} },
      { id: 'w8l5', title: 'Graded Reading', titleCn: '分级阅读', description: 'Read a complete HSK 2 level story.', type: 'reading', duration: 30, completed: false, content: {} },
      { id: 'w8r', title: 'Month 2 Assessment', titleCn: '第二个月评估', description: 'Comprehensive review of months 1-2 progress.', type: 'review', duration: 45, completed: false, content: {} },
    ],
  },
];

export const getWeekByNumber = (num: number): Week | undefined => {
  return curriculum.find(w => w.number === num);
};

export const getLessonById = (id: string) => {
  for (const week of curriculum) {
    const lesson = week.lessons.find(l => l.id === id);
    if (lesson) return { lesson, week };
  }
  return null;
};
