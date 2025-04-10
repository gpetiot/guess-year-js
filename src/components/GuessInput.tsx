import { useState } from 'react';

interface GuessInputProps {
  onSubmit: (guess: string) => void;
  disabled?: boolean;
}

export const GuessInput = ({ onSubmit, disabled = false }: GuessInputProps) => {
  const [guess, setGuess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.length === 4 && /^\d+$/.test(guess)) {
      onSubmit(guess);
      setGuess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl p-4">
      <div className="flex gap-4">
        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={4}
          placeholder="Enter year (e.g., 1969)"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={disabled}
          className="flex-1 p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
        />
        <button
          type="submit"
          disabled={guess.length !== 4 || !/^\d+$/.test(guess) || disabled}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Guess
        </button>
      </div>
    </form>
  );
}; 