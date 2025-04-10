import { Stack, Text } from '@chakra-ui/react';

interface ClueListProps {
  clues: string[];
}

export const ClueList = ({ clues }: ClueListProps) => {
  return (
    <Stack gap={3} align="stretch" w="100%" maxW="600px" p={4}>
      {clues.map((clue, index) => (
        <Text
          key={index}
          fontSize="lg"
          p={3}
          bg="gray.100"
          borderRadius="md"
          _dark={{ bg: 'gray.700' }}
        >
          {clue}
        </Text>
      ))}
    </Stack>
  );
}; 