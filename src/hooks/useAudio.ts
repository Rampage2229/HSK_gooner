import { useState, useCallback, useRef, useEffect } from 'react';
import { playMandarin, stopAll, PlayOptions } from '../services/audio';

export function useAudio() {
  const [isPlayingState, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const play = useCallback((options: PlayOptions | string) => {
    setError(null);
    
    const opts = typeof options === 'string' 
      ? { text: options, rate: 0.85 }
      : options;

    setIsPlaying(true);
    
    playMandarin({
      ...opts,
      onStart: () => {
        setIsPlaying(true);
        opts.onStart?.();
      },
      onEnd: () => {
        setIsPlaying(false);
        opts.onEnd?.();
      },
      onError: (err) => {
        setIsPlaying(false);
        setError(err);
        opts.onError?.(err);
      },
    });

    // Safety timeout - stop playing state after 10 seconds max
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsPlaying(false);
    }, 10000);
  }, []);

  const stop = useCallback(() => {
    stopAll();
    setIsPlaying(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { play, stop, isPlaying: isPlayingState, error };
}
