import { useAudio } from '../hooks/useAudio';
import { Volume2 } from 'lucide-react';

interface AudioButtonProps {
  text: string;
  label?: string;
  rate?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'ghost' | 'outline';
  className?: string;
}

export function AudioButton({ text, label, rate = 0.85, size = 'md', variant = 'ghost', className = '' }: AudioButtonProps) {
  const { play, stop, isPlaying } = useAudio();

  const handleClick = () => {
    if (isPlaying) {
      stop();
    } else {
      play({ text, rate });
    }
  };

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const iconSize = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-700',
    outline: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700',
  };

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition ${variantClasses[variant]} ${
        isPlaying ? 'ring-2 ring-primary-400 animate-pulse' : ''
      } ${className}`}
      style={variant === 'ghost' && !isPlaying ? { color: 'var(--text-secondary)' } : undefined}
      aria-label={isPlaying ? 'Stop audio' : `Play pronunciation of ${text}`}
      title={label || `Play: ${text}`}
    >
      {isPlaying ? (
        <div className="flex gap-0.5">
          <div className="w-0.5 h-3 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-0.5 h-3 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-0.5 h-3 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      ) : (
        <Volume2 size={iconSize[size]} />
      )}
    </button>
  );
}
