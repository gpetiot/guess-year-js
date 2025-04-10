import { Stack, Text } from '@chakra-ui/react';

interface ClueListProps {
  clues: string[];
}

export const ClueList = ({ clues }: ClueListProps) => {
  return (
    <div className="w-full max-w-2xl space-y-3 p-4">
      {clues.map((clue, index) => (
        <div key={index} className="rounded-md bg-gray-100 p-3 text-lg dark:bg-gray-800">
          {clue}
        </div>
      ))}
    </div>
  );
};
