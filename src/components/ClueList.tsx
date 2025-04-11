interface ClueListProps {
  clues: string[];
}

export const ClueList = ({ clues }: ClueListProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
      <div className="p-4">
        <div className="space-y-2">
          {clues.map((clue, index) => (
            <p key={index} className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-700 dark:text-gray-300">{index + 1}.</span>{' '}
              {clue}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
