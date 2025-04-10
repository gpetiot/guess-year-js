import { Stack, Box } from '@chakra-ui/react';
import { GuessResult } from '../types';

interface GuessListProps {
  guesses: GuessResult[];
}

export const GuessList = ({ guesses }: GuessListProps) => {
  const getColorClass = (feedback: 'correct' | 'partial' | 'incorrect') => {
    switch (feedback) {
      case 'correct':
        return 'bg-green-500';
      case 'partial':
        return 'bg-yellow-500';
      case 'incorrect':
        return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-2 p-4">
      {guesses.map((guess, index) => (
        <div key={index} className="flex justify-center gap-2">
          {guess.guess.split('').map((digit, digitIndex) => (
            <div
              key={digitIndex}
              className={`w-12 h-12 flex items-center justify-center text-xl font-bold text-white rounded-md ${getColorClass(
                guess.feedback[digitIndex]
              )}`}
            >
              {digit}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}; 