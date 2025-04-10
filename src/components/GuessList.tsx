import { GuessResult } from '../types';
import '../styles/game.css';

interface GuessListProps {
  guesses: GuessResult[];
  maxAttempts?: number;
}

export const GuessList = ({ guesses, maxAttempts = 6 }: GuessListProps) => {
  const remainingGuesses = maxAttempts - guesses.length;
  const emptyRows = Array(remainingGuesses).fill(null);

  return (
    <div className="my-4 flex flex-col items-center gap-1">
      {guesses.map((guess, index) => (
        <div key={index} className="flex gap-1">
          {guess.guess.split('').map((digit, digitIndex) => (
            <div key={digitIndex} className={`digit-tile ${guess.feedback[digitIndex]}`}>
              {digit}
            </div>
          ))}
        </div>
      ))}

      {emptyRows.map((_, index) => (
        <div key={`empty-${index}`} className="flex gap-1">
          {Array(4)
            .fill(null)
            .map((_, digitIndex) => (
              <div key={digitIndex} className="digit-tile empty" />
            ))}
        </div>
      ))}
    </div>
  );
};
