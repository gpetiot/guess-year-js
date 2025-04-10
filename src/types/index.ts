export interface Puzzle {
  date: string;
  clues: string[];
  answer: number;
}

export interface GuessResult {
  guess: string;
  feedback: ('correct' | 'partial' | 'incorrect')[];
}

export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
  currentPuzzle: Puzzle;
  guesses: GuessResult[];
  gameStatus: GameStatus;
  score: number;
  streak: number;
  timeStarted: number;
}

export interface TimeCard {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
} 