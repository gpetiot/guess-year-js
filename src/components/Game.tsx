import { useState, useEffect } from 'react';
import { Stack, Heading, Text, useToast } from '@chakra-ui/react';
import { ClueList } from './ClueList';
import { GuessInput } from './GuessInput';
import { GuessList } from './GuessList';
import { getToday } from '../data/puzzles';
import { GameState, GuessResult, GameStatus } from '../types';

const MAX_ATTEMPTS = 6;

export const Game = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      if (parsed.currentPuzzle.date === getToday().date) {
        return parsed as GameState;
      }
    }
    return {
      currentPuzzle: getToday(),
      guesses: [],
      gameStatus: 'playing',
      score: 0,
      streak: 0,
      timeStarted: Date.now(),
    };
  });

  const toast = useToast();

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  const checkGuess = (guessStr: string): GuessResult => {
    const answer = gameState.currentPuzzle.answer.toString();
    const feedback: ('correct' | 'partial' | 'incorrect')[] = new Array(4).fill('incorrect');

    // First pass: mark correct digits
    for (let i = 0; i < 4; i++) {
      if (guessStr[i] === answer[i]) {
        feedback[i] = 'correct';
      }
    }

    // Second pass: mark partial matches
    const remainingAnswer = answer.split('');
    const remainingGuess = guessStr.split('');
    for (let i = 0; i < 4; i++) {
      if (feedback[i] === 'correct') {
        remainingAnswer[i] = '';
        remainingGuess[i] = '';
      }
    }

    for (let i = 0; i < 4; i++) {
      if (feedback[i] !== 'correct' && remainingGuess[i] !== '') {
        const matchIndex = remainingAnswer.indexOf(remainingGuess[i]);
        if (matchIndex !== -1) {
          feedback[i] = 'partial';
          remainingAnswer[matchIndex] = '';
        }
      }
    }

    return { guess: guessStr, feedback };
  };

  const handleGuess = (guess: string) => {
    if (gameState.gameStatus !== 'playing') return;

    const guessResult = checkGuess(guess);
    const newGuesses = [...gameState.guesses, guessResult];

    let newGameStatus: GameStatus = gameState.gameStatus;
    let newScore = gameState.score;
    let newStreak = gameState.streak;

    if (guessResult.feedback.every((f) => f === 'correct')) {
      newGameStatus = 'won';
      const remainingAttempts = MAX_ATTEMPTS - newGuesses.length;
      newScore = remainingAttempts * 100;

      // Add speed bonus
      const timeTaken = (Date.now() - gameState.timeStarted) / 1000 / 60; // minutes
      if (timeTaken <= 5) {
        newScore += 50;
      }

      // Add streak bonus
      newStreak = gameState.streak + 1;
      newScore += newStreak * 25;

      toast({
        title: 'Congratulations!',
        description: `You won! Score: ${newScore}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else if (newGuesses.length >= MAX_ATTEMPTS) {
      newGameStatus = 'lost';
      newStreak = 0;
      toast({
        title: 'Game Over',
        description: `The correct year was ${gameState.currentPuzzle.answer}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    setGameState((prev) => ({
      ...prev,
      guesses: newGuesses,
      gameStatus: newGameStatus,
      score: newScore,
      streak: newStreak,
    }));
  };

  return (
    <Stack gap={6} align="center" w="100%" maxW="800px" mx="auto" p={4}>
      <Heading size="xl">Chronos Code</Heading>
      <Text>Attempts remaining: {MAX_ATTEMPTS - gameState.guesses.length}</Text>
      <ClueList clues={gameState.currentPuzzle.clues} />
      <GuessList guesses={gameState.guesses} />
      <GuessInput onSubmit={handleGuess} disabled={gameState.gameStatus !== 'playing'} />
      {gameState.gameStatus !== 'playing' && (
        <Text fontSize="lg" fontWeight="bold">
          {gameState.gameStatus === 'won'
            ? `You won! Score: ${gameState.score}`
            : `Game Over! The answer was ${gameState.currentPuzzle.answer}`}
        </Text>
      )}
    </Stack>
  );
};
