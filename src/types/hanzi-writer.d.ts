declare module 'hanzi-writer' {
  interface HanziWriterOptions {
    width?: number;
    height?: number;
    padding?: number;
    showOutline?: boolean;
    showCharacter?: boolean;
    strokeAnimationSpeed?: number;
    delayBetweenStrokes?: number;
    strokeColor?: string;
    outlineColor?: string;
    radicalColor?: string | null;
    drawingColor?: string;
    showHintAfterMisses?: number;
    highlightOnComplete?: boolean;
    strokeHighlightSpeed?: number;
    highlightColor?: string;
    charDataLoader?: (char: string, onLoad: (charData: any) => void, onError: (err: string) => void) => void;
  }

  interface AnimateCharacterOptions {
    onComplete?: () => void;
    onWrongStroke?: () => void;
  }

  interface QuizOptions {
    onCorrectStroke?: (data: any) => void;
    onMistake?: (data: any) => void;
    onComplete?: (summary: { character: string; totalMistakes: number }) => void;
  }

  class HanziWriter {
    constructor(element: HTMLElement, character: string, options: HanziWriterOptions);
    animateCharacter(options?: AnimateCharacterOptions): void;
    showCharacter(options?: { onComplete?: () => void }): void;
    hideCharacter(options?: { onComplete?: () => void }): void;
    quiz(options?: QuizOptions): void;
    cancelQuiz(): void;
    updateColor(strokeName: string, color: string): void;

    static create(element: HTMLElement, character: string, options: HanziWriterOptions): HanziWriter;
  }

  export default HanziWriter;
}

declare module 'hanzi-writer-data' {
  const data: Record<string, any>;
  export default data;
}
