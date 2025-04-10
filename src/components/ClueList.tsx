import { Stack, Text } from '@chakra-ui/react';

interface ClueListProps {
  clues: string[];
}

export const ClueList = ({ clues }: ClueListProps) => {
  return (
    <div className="w-full max-w-2xl space-y-3 p-4">
      {clues.map((clue, index) => (
        <div
          key={index}
          className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-lg"
        >
          {clue}
        </div>
      ))}
    </div>
  );
}; 