import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { GameContextType, GameState, GuessResult, GameStatus } from '../types';
import { getToday } from '../data/puzzles';
import {
  MAX_ATTEMPTS,
  generateFeedback,
  calculateScore,
  generateShareText,
  loadGameState,
  saveGameState,
} from '../utils/gameLogic';

const initialGameState: GameState = {
  currentPuzzle: null,
  guesses: [],
  gameStatus: 'playing',
  score: 0,
  streak: 0,
  timeStarted: Date.now(),
  solvedToday: false,
  unlockedCards: [],
  elapsedTime: 0,
};

const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const stored = loadGameState();
    return {
      ...initialGameState,
      currentPuzzle: getToday(),
      streak: stored.streak,
      unlockedCards: stored.unlockedCards,
      solvedToday: stored.solvedToday,
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        elapsedTime: Date.now() - prev.timeStarted,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleGuessSubmit = (guess: string) => {
    if (gameState.gameStatus !== 'playing' || !gameState.currentPuzzle) return;

    const feedback = generateFeedback(guess, gameState.currentPuzzle.year);
    const newGuess: GuessResult = { guess, feedback };
    const newGuesses = [...gameState.guesses, newGuess];

    let newGameStatus: GameStatus = gameState.gameStatus;
    let newScore = gameState.score;
    let newStreak = gameState.streak;

    if (feedback.every(f => f === 'correct')) {
      newGameStatus = 'won';
      newScore = calculateScore(
        MAX_ATTEMPTS - newGuesses.length,
        gameState.elapsedTime,
        gameState.streak
      );
      newStreak = gameState.streak + 1;

      const newState = {
        streak: newStreak,
        lastPlayedDate: new Date().toISOString().split('T')[0],
        unlockedCards: gameState.unlockedCards,
        solvedToday: true,
      };
      saveGameState(newState);
    } else if (newGuesses.length >= MAX_ATTEMPTS) {
      newGameStatus = 'lost';
      newStreak = 0;
      saveGameState({
        streak: 0,
        lastPlayedDate: new Date().toISOString().split('T')[0],
        unlockedCards: gameState.unlockedCards,
        solvedToday: true,
      });
    }

    setGameState(prev => ({
      ...prev,
      guesses: newGuesses,
      gameStatus: newGameStatus,
      score: newScore,
      streak: newStreak,
    }));
  };

  const handleShare = async () => {
    const shareText = generateShareText(gameState.guesses, gameState.gameStatus === 'won');
    try {
      await navigator.clipboard.writeText(shareText);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const value: GameContextType = {
    ...gameState,
    handleGuessSubmit,
    handleShare,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}; 