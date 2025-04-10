import { useState } from 'react';
import '../styles/game.css';

interface GuessInputProps {
  onSubmit: (guess: string) => void;
  disabled?: boolean;
}

export const GuessInput = ({ onSubmit, disabled }: GuessInputProps) => {
  const [guess, setGuess] = useState('');
  const [shaking, setShaking] = useState(false);

  const handleKeyClick = (value: string) => {
    if (disabled) return;
    
    if (value === 'Enter') {
      handleSubmit();
    } else if (value === 'Backspace') {
      setGuess((prev) => prev.slice(0, -1));
    } else if (guess.length < 4) {
      setGuess((prev) => prev + value);
    }
  };

  const handleSubmit = () => {
    if (guess.length !== 4 || !/^\d{4}$/.test(guess)) {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }

    onSubmit(guess);
    setGuess('');
  };

  const renderKey = (value: string, label?: string) => (
    <button
      key={value}
      onClick={() => handleKeyClick(value)}
      disabled={disabled}
      className="key"
    >
      {label || value}
    </button>
  );

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className={`flex justify-center mb-4 ${shaking ? 'shake' : ''}`}>
        {Array(4).fill(null).map((_, index) => (
          <div
            key={index}
            className={`digit-tile ${index < guess.length ? 'current' : 'empty'}`}
          >
            {guess[index] || ''}
          </div>
        ))}
      </div>

      <div className="keyboard">
        {[...Array(9)].map((_, i) => renderKey(String(i + 1)))}
        {renderKey('Backspace', '⌫')}
        {renderKey('0')}
        {renderKey('Enter', '↵')}
      </div>
    </div>
  );
};
