import { Stack, Box } from '@chakra-ui/react';
import { GuessResult } from '../types';

interface GuessListProps {
  guesses: GuessResult[];
}

export const GuessList = ({ guesses }: GuessListProps) => {
  const getColorScheme = (feedback: 'correct' | 'partial' | 'incorrect') => {
    switch (feedback) {
      case 'correct':
        return 'correct.500';
      case 'partial':
        return 'partial.500';
      case 'incorrect':
        return 'incorrect.500';
    }
  };

  return (
    <Stack gap={2} w="100%" maxW="600px" p={4}>
      {guesses.map((guess, index) => (
        <Stack key={index} direction="row" gap={2} w="100%" justify="center">
          {guess.guess.split('').map((digit, digitIndex) => (
            <Box
              key={digitIndex}
              w="50px"
              h="50px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={getColorScheme(guess.feedback[digitIndex])}
              color="white"
              fontSize="xl"
              fontWeight="bold"
              borderRadius="md"
            >
              {digit}
            </Box>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}; 