import { useState } from 'react';
import { Stack, Input, Button } from '@chakra-ui/react';

interface GuessInputProps {
  onSubmit: (guess: string) => void;
  disabled?: boolean;
}

export const GuessInput = ({ onSubmit, disabled = false }: GuessInputProps) => {
  const [guess, setGuess] = useState('');

  const handleSubmit = () => {
    if (guess.length === 4 && /^\d+$/.test(guess)) {
      onSubmit(guess);
      setGuess('');
    }
  };

  return (
    <Stack direction="row" gap={4} w="100%" maxW="600px" p={4}>
      <Input
        placeholder="Enter year (e.g., 1969)"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        maxLength={4}
        pattern="\d*"
        disabled={disabled}
        size="lg"
      />
      <Button
        colorScheme="blue"
        onClick={handleSubmit}
        disabled={guess.length !== 4 || !/^\d+$/.test(guess) || disabled}
        size="lg"
      >
        Guess
      </Button>
    </Stack>
  );
}; 