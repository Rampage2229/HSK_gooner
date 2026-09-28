/**
 * Unified audio service for Mandarin pronunciation.
 * 
 * Priority:
 * 1. Local audio asset (if audioUrl provided)
 * 2. Web Speech API TTS (zh-CN voice)
 * 3. Graceful fallback with error state
 */

let cachedVoices: SpeechSynthesisVoice[] = [];
let zhVoice: SpeechSynthesisVoice | null = null;
let voicesLoaded = false;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve([]);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      cachedVoices = voices;
      zhVoice = findBestChineseVoice(voices);
      voicesLoaded = true;
      resolve(voices);
      return;
    }

    // Voices load asynchronously in some browsers
    const handler = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      zhVoice = findBestChineseVoice(cachedVoices);
      voicesLoaded = true;
      window.speechSynthesis.removeEventListener('voiceschanged', handler);
      resolve(cachedVoices);
    };

    window.speechSynthesis.addEventListener('voiceschanged', handler);
    
    // Timeout fallback
    setTimeout(() => {
      if (!voicesLoaded) {
        cachedVoices = window.speechSynthesis.getVoices();
        zhVoice = findBestChineseVoice(cachedVoices);
        voicesLoaded = true;
        resolve(cachedVoices);
      }
    }, 1000);
  });
}

function findBestChineseVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  // Priority order for Chinese voices
  const preferred = [
    'zh-CN', // Mainland China Mandarin
    'zh-TW', // Taiwan Mandarin
    'zh-HK', // Cantonese (fallback)
    'zh',    // Generic Chinese
  ];

  // First try to find exact matches
  for (const lang of preferred) {
    const voice = voices.find(v => v.lang === lang);
    if (voice) return voice;
  }

  // Then try partial matches
  for (const lang of preferred) {
    const voice = voices.find(v => v.lang.startsWith(lang));
    if (voice) return voice;
  }

  // Last resort: any Chinese voice
  return voices.find(v => v.lang.startsWith('zh')) || null;
}

// Initialize voices on module load
if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoices();
}

export interface PlayOptions {
  text: string;
  rate?: number;       // 0.1 - 10, default 1
  pitch?: number;      // 0 - 2, default 1
  volume?: number;     // 0 - 1, default 1
  audioUrl?: string;   // Optional local audio file
  onEnd?: () => void;
  onStart?: () => void;
  onError?: (error: string) => void;
}

let currentUtterance: SpeechSynthesisUtterance | null = null;
let currentAudio: HTMLAudioElement | null = null;

/**
 * Play Mandarin audio. Tries local audio first, falls back to TTS.
 */
export function playMandarin(options: PlayOptions): void {
  stopAll();

  const { text, rate = 0.85, pitch = 1, volume = 1, audioUrl, onEnd, onStart, onError } = options;

  // Try local audio first
  if (audioUrl) {
    try {
      const audio = new Audio(audioUrl);
      audio.volume = volume;
      audio.playbackRate = rate;
      
      audio.onplay = () => onStart?.();
      audio.onended = () => {
        currentAudio = null;
        onEnd?.();
      };
      audio.onerror = () => {
        // Fall back to TTS if audio fails
        playTTS(text, rate, pitch, volume, onStart, onEnd, onError);
      };
      
      currentAudio = audio;
      audio.play().catch(() => {
        playTTS(text, rate, pitch, volume, onStart, onEnd, onError);
      });
      return;
    } catch {
      // Fall through to TTS
    }
  }

  // Use TTS
  playTTS(text, rate, pitch, volume, onStart, onEnd, onError);
}

function playTTS(
  text: string,
  rate: number,
  pitch: number,
  volume: number,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (error: string) => void
): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    onError?.('Speech synthesis not supported in this browser');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = volume;

  // Use Chinese voice if available
  if (zhVoice) {
    utterance.voice = zhVoice;
  }

  utterance.onstart = () => {
    currentUtterance = utterance;
    onStart?.();
  };

  utterance.onend = () => {
    currentUtterance = null;
    onEnd?.();
  };

  utterance.onerror = (event) => {
    currentUtterance = null;
    if (event.error !== 'canceled') {
      onError?.(`Speech error: ${event.error}`);
    }
  };

  // Small delay to ensure voices are loaded
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 50);
}

/**
 * Stop all audio playback
 */
export function stopAll(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}

/**
 * Check if audio is currently playing
 */
export function isPlaying(): boolean {
  if (currentAudio && !currentAudio.paused) return true;
  if (typeof window !== 'undefined' && window.speechSynthesis.speaking) return true;
  return false;
}

/**
 * Get the best available Chinese voice
 */
export function getChineseVoice(): SpeechSynthesisVoice | null {
  return zhVoice;
}

/**
 * Check if Chinese TTS is available
 */
export function isTTSAvailable(): boolean {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false;
  const voices = window.speechSynthesis.getVoices();
  return voices.some(v => v.lang.startsWith('zh'));
}

/**
 * Play a specific tone demonstration.
 * Uses a sustained vowel sound at the appropriate pitch contour.
 */
export function playToneDemo(tone: 1 | 2 | 3 | 4 | 5, syllable: string = 'ma'): void {
  // For tone demos, we use the actual Chinese character/syllable
  const toneMap: Record<number, string> = {
    1: 'mā',
    2: 'má', 
    3: 'mǎ',
    4: 'mà',
    5: 'ma',
  };
  
  const text = toneMap[tone] || syllable;
  playMandarin({
    text,
    rate: 0.7, // Slower for clarity
    pitch: tone === 1 ? 1.2 : tone === 4 ? 0.9 : 1,
  });
}

/**
 * Play a tone pair demonstration
 */
export function playTonePair(text: string): void {
  playMandarin({
    text,
    rate: 0.65,
  });
}
