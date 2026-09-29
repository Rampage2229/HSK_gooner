export type HSKLevel = 0 | 1 | 2 | 3 | 4 | 5;
export type CharacterSet = 'simplified' | 'traditional' | 'both';
export type SpeakingPriority = 'low' | 'medium' | 'high';
export type ExperienceLevel = 'complete-beginner' | 'some-pinyin' | 'some-basic' | 'hsk1' | 'hsk2' | 'hsk3' | 'hsk4+';
export type Goal = 'conversational' | 'hsk-exam' | 'university' | 'travel' | 'living-in-china' | 'reading' | 'general';
export type DailyTime = '30min' | '1h' | '2h' | '3h' | '4h+';

export interface UserProfile {
  experience: ExperienceLevel;
  goal: Goal;
  dailyTime: DailyTime;
  characterSet: CharacterSet;
  speakingPriority: SpeakingPriority;
  startDate: string;
  onboarded: boolean;
}

export interface VocabularyWord {
  id: string;
  simplified: string;
  traditional: string;
  pinyin: string;
  meaning: string;
  partOfSpeech: string;
  hskLevel: HSKLevel;
  exampleSentence: string;
  examplePinyin: string;
  exampleTranslation: string;
  tags: string[];
}

export interface SRSItem {
  wordId: string;
  status: 'new' | 'learning' | 'review' | 'difficult' | 'mastered';
  nextReview: string;
  interval: number;
  repetitions: number;
  easeFactor: number;
  lastReviewed: string | null;
}

export interface GrammarPoint {
  id: string;
  title: string;
  level: string;
  hskLevel: HSKLevel;
  meaning: string;
  structure: string;
  examples: GrammarExample[];
  commonMistakes: string[];
  relatedGrammar: string[];
  tags: string[];
}

export interface GrammarExample {
  chinese: string;
  pinyin: string;
  english: string;
}

export interface GrammarExercise {
  id: string;
  grammarId: string;
  type: 'fill-blank' | 'multiple-choice' | 'translation' | 'error-correction';
  question: string;
  questionPinyin?: string;
  options?: string[];
  answer: string;
  answerPinyin?: string;
  translation?: string;
  explanation: string;
  difficulty: 1 | 2 | 3;
  correctSentence?: string;
  correctPinyin?: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleCn: string;
  description: string;
  type: 'vocabulary' | 'grammar' | 'listening' | 'reading' | 'speaking' | 'characters' | 'pronunciation' | 'review';
  duration: number;
  completed: boolean;
  content: LessonContent;
}

export interface LessonContent {
  explanation?: string;
  vocabulary?: string[];
  grammarPoints?: string[];
  exercises?: Exercise[];
  audio?: string;
  transcript?: string;
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'match' | 'sentence-order' | 'tone-identify' | 'translation' | 'character-recognize';
  question: string;
  questionCn?: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Week {
  number: number;
  title: string;
  theme: string;
  lessons: Lesson[];
  objectives: string[];
}

export interface Module {
  id: string;
  title: string;
  level: HSKLevel;
  weeks: Week[];
}

export interface DailyTask {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
  type: 'srs' | 'grammar' | 'listening' | 'reading' | 'speaking' | 'characters' | 'writing';
}

export interface StudySession {
  date: string;
  duration: number;
  type: string;
  xpEarned: number;
}

export interface Progress {
  totalStudyTime: number;
  currentStreak: number;
  longestStreak: number;
  vocabularyLearned: number;
  charactersLearned: number;
  grammarCompleted: number;
  listeningMinutes: number;
  readingMinutes: number;
  speakingMinutes: number;
  writingExercises: number;
  xp: number;
  level: number;
  sessions: StudySession[];
  completedLessons: string[];
  completedExercises: string[];
  srsItems: SRSItem[];
  dailyTasks: DailyTask[];
  lastStudyDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  condition: string;
}

export interface ReadingText {
  id: string;
  title: string;
  titleCn: string;
  level: HSKLevel;
  simplified: string;
  traditional: string;
  pinyin: string;
  translation: string;
  vocabulary: string[];
  questions: Exercise[];
}

export interface ListeningItem {
  id: string;
  title: string;
  level: HSKLevel;
  audioUrl?: string;
  transcript: string;
  pinyin: string;
  translation: string;
  vocabulary: string[];
  questions: Exercise[];
  speed: 'slow' | 'normal' | 'fast';
}

export interface ToneExercise {
  id: string;
  character: string;
  pinyin: string;
  tone: 1 | 2 | 3 | 4 | 5;
  audio?: string;
}

export interface CharacterInfo {
  character: string;
  pinyin: string;
  meaning: string;
  radical: string;
  components: string[];
  strokeCount: number;
  hskLevel: HSKLevel;
  examples: { word: string; pinyin: string; meaning: string }[];
}
