export interface Puzzle {
  date: string;
  year: string;
  clues: string[];
}

export type FeedbackType = 'correct' | 'partial' | 'incorrect';

export interface GuessResult {
  guess: string;
  feedback: FeedbackType[];
}

export type GameStatus = 'playing' | 'won' | 'lost';

export interface TimeCard {
  id: string;
  name: string;
  description: string;
  requirement: {
    type: 'solves' | 'streak' | 'perfect' | 'historical' | 'futuristic';
    count: number;
  };
  unlocked: boolean;
}

export interface GameState {
  currentPuzzle: Puzzle | null;
  guesses: GuessResult[];
  gameStatus: GameStatus;
  score: number;
  streak: number;
  timeStarted: number;
  solvedToday: boolean;
  unlockedCards: string[];
  elapsedTime: number;
}

export interface GameContextType extends GameState {
  handleGuessSubmit: (guess: string) => void;
  handleShare: () => void;
}

export interface StoredGameState {
  streak: number;
  lastPlayedDate: string;
  unlockedCards: string[];
  solvedToday: boolean;
}
