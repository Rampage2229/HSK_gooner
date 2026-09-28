import { useState, useEffect, useRef } from 'react';
import { useAudio } from '../hooks/useAudio';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface ToneCardProps {
  tone: 1 | 2 | 3 | 4 | 5;
  name: string;
  chineseName: string;
  pinyin: string;
  character: string;
  description: string;
  example: string;
  examplePinyin: string;
  exampleMeaning: string;
  color: string;
  bgColor: string;
}

export function ToneCard({ tone, name, chineseName, pinyin, character, description, example, examplePinyin, exampleMeaning, color, bgColor }: ToneCardProps) {
  const { play, stop, isPlaying } = useAudio();
  const [showContour, setShowContour] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const handlePlay = () => {
    if (isPlaying) {
      stop();
      return;
    }
    setShowContour(true);
    play({ text: pinyin, rate: 0.7 });
  };

  const handleReplay = () => {
    stop();
    setTimeout(() => {
      setShowContour(true);
      play({ text: pinyin, rate: 0.7 });
    }, 100);
  };

  // Draw animated pitch contour
  useEffect(() => {
    if (!showContour || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;

    // Define contour paths for each tone
    const getContourPoints = (tone: number): [number, number][] => {
      const points: [number, number][] = [];
      const steps = 50;

      switch (tone) {
        case 1: // High flat
          for (let i = 0; i <= steps; i++) {
            const x = padding + (i / steps) * (width - 2 * padding);
            const y = padding + 10;
            points.push([x, y]);
          }
          break;
        case 2: // Rising
          for (let i = 0; i <= steps; i++) {
            const x = padding + (i / steps) * (width - 2 * padding);
            const y = height - padding - (i / steps) * (height - 2 * padding - 10);
            points.push([x, y]);
          }
          break;
        case 3: // Dipping (falling-rising)
          for (let i = 0; i <= steps; i++) {
            const x = padding + (i / steps) * (width - 2 * padding);
            const progress = i / steps;
            // Go down then up
            const y = progress < 0.5
              ? padding + 10 + (progress * 2) * (height - 2 * padding - 20)
              : height - padding - 10 - ((progress - 0.5) * 2) * (height / 3);
            points.push([x, y]);
          }
          break;
        case 4: // Falling
          for (let i = 0; i <= steps; i++) {
            const x = padding + (i / steps) * (width - 2 * padding);
            const y = padding + 10 + (i / steps) * (height - 2 * padding - 20);
            points.push([x, y]);
          }
          break;
        case 5: // Neutral - short flat in middle
          for (let i = 0; i <= steps; i++) {
            const x = padding + (i / steps) * (width - 2 * padding);
            const y = height / 2;
            points.push([x, y]);
          }
          break;
      }
      return points;
    };

    const points = getContourPoints(tone);
    let currentStep = 0;
    const totalSteps = points.length;
    const speed = 2; // points per frame

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw baseline
      ctx.strokeStyle = 'rgba(150, 150, 150, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padding, height / 2);
      ctx.lineTo(width - padding, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw pitch label
      ctx.fillStyle = 'rgba(150, 150, 150, 0.5)';
      ctx.font = '10px sans-serif';
      ctx.fillText('high', 2, padding + 14);
      ctx.fillText('low', 4, height - padding + 4);

      // Draw animated contour
      if (currentStep < totalSteps) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();

        for (let i = 0; i <= currentStep && i < totalSteps; i++) {
          const [x, y] = points[i];
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw dot at current position
        const [dotX, dotY] = points[Math.min(currentStep, totalSteps - 1)];
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
        ctx.fill();

        currentStep += speed;
        animationRef.current = requestAnimationFrame(draw);
      } else {
        // Draw complete contour
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        points.forEach(([x, y], i) => {
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showContour, tone, color]);

  useEffect(() => {
    if (!isPlaying) {
      setTimeout(() => setShowContour(false), 2000);
    }
  }, [isPlaying]);

  return (
    <div className={`card ${bgColor} transition-all ${isPlaying ? 'ring-2 ring-primary-400 scale-[1.02]' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color }}>
            {name}
          </span>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{chineseName}</p>
        </div>
        <span className="text-3xl font-bold" style={{ color }}>{pinyin}</span>
      </div>

      {/* Character */}
      <div className="text-center my-3">
        <span className="text-5xl chinese-char font-bold" style={{ color: 'var(--text-primary)' }}>
          {character}
        </span>
      </div>

      {/* Pitch Contour Visualization */}
      <div className="bg-white/50 dark:bg-black/20 rounded-lg p-2 mb-3">
        <canvas
          ref={canvasRef}
          width={200}
          height={60}
          className="w-full h-[60px]"
        />
      </div>

      {/* Description */}
      <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
        {description}
      </p>

      {/* Example */}
      <div className="p-2 rounded-lg bg-white/30 dark:bg-black/10 mb-3">
        <p className="text-sm chinese-char" style={{ color: 'var(--text-primary)' }}>{example}</p>
        <p className="text-xs text-primary-600">{examplePinyin}</p>
        <p className="text-xs italic" style={{ color: 'var(--text-secondary)' }}>{exampleMeaning}</p>
      </div>

      {/* Audio Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePlay}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium text-sm transition ${
            isPlaying
              ? 'bg-primary-500 text-white'
              : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}
          style={!isPlaying ? { color: 'var(--text-primary)' } : undefined}
          aria-label={isPlaying ? 'Stop audio' : 'Play pronunciation'}
        >
          {isPlaying ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Playing...
            </>
          ) : (
            <>
              <Volume2 size={16} />
              🔊 Play
            </>
          )}
        </button>
        <button
          onClick={handleReplay}
          className="p-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          aria-label="Replay"
          title="Replay"
        >
          <RotateCcw size={16} style={{ color: 'var(--text-secondary)' }} />
        </button>
      </div>
    </div>
  );
}
