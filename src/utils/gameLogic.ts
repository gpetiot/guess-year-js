import { FeedbackType, GuessResult, StoredGameState, TimeCard } from '../types';

export const GAME_STORAGE_KEY = 'chronos-code-game-state';
export const MAX_ATTEMPTS = 6;
export const SPEED_BONUS_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds
export const BASE_POINTS_PER_ATTEMPT = 100;
export const SPEED_BONUS_POINTS = 50;
export const STREAK_BONUS_POINTS = 25;

export const generateFeedback = (guess: string, target: string): FeedbackType[] => {
  const feedback: FeedbackType[] = new Array(4).fill('incorrect');
  const targetArray = target.split('');
  const guessArray = guess.split('');

  // First pass: mark correct digits
  for (let i = 0; i < 4; i++) {
    if (guessArray[i] === targetArray[i]) {
      feedback[i] = 'correct';
      targetArray[i] = '';
      guessArray[i] = '';
    }
  }

  // Second pass: mark partial matches
  for (let i = 0; i < 4; i++) {
    if (guessArray[i] !== '') {
      const matchIndex = targetArray.indexOf(guessArray[i]);
      if (matchIndex !== -1) {
        feedback[i] = 'partial';
        targetArray[matchIndex] = '';
      }
    }
  }

  return feedback;
};

export const calculateScore = (
  remainingAttempts: number,
  elapsedTime: number,
  streak: number
): number => {
  let score = remainingAttempts * BASE_POINTS_PER_ATTEMPT;

  // Add speed bonus if solved within 5 minutes
  if (elapsedTime <= SPEED_BONUS_TIME) {
    score += SPEED_BONUS_POINTS;
  }

  // Add streak bonus
  score += streak * STREAK_BONUS_POINTS;

  return score;
};

export const generateShareText = (guesses: GuessResult[], won: boolean): string => {
  const emojiMap: Record<FeedbackType, string> = {
    correct: '🟩',
    partial: '🟨',
    incorrect: '⬜',
  };

  const header = `Dat Year ${guesses.length}/${MAX_ATTEMPTS}${won ? ' ✨' : ' ❌'}\n\n`;
  const grid = guesses.map((guess) => guess.feedback.map((f) => emojiMap[f]).join('')).join('\n');

  return header + grid;
};

export const loadGameState = (): StoredGameState => {
  const defaultState: StoredGameState = {
    streak: 0,
    lastPlayedDate: '',
    unlockedCards: [],
    solvedToday: false,
  };

  try {
    const stored = localStorage.getItem(GAME_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultState;
  } catch {
    return defaultState;
  }
};

export const saveGameState = (state: StoredGameState): void => {
  localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(state));
};

export const checkTimeCardUnlocks = (
  cards: TimeCard[],
  solves: number,
  streak: number,
  perfectSolves: number,
  historicalSolves: number,
  futuristicSolves: number
): string[] => {
  return cards
    .filter((card) => {
      if (card.unlocked) return false;

      switch (card.requirement.type) {
        case 'solves':
          return solves >= card.requirement.count;
        case 'streak':
          return streak >= card.requirement.count;
        case 'perfect':
          return perfectSolves >= card.requirement.count;
        case 'historical':
          return historicalSolves >= card.requirement.count;
        case 'futuristic':
          return futuristicSolves >= card.requirement.count;
        default:
          return false;
      }
    })
    .map((card) => card.id);
};
