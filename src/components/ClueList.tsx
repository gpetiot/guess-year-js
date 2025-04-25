interface ClueListProps {
  clues: string[];
}

export const ClueList = ({ clues }: ClueListProps) => {
  return (
    <div className="rounded-xl border border-bg-tertiary bg-bg p-6 shadow-xl">
      <div className="space-y-4">
        {clues.map((clue, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg bg-bg-secondary p-4 transition-colors hover:bg-bg-tertiary"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
              {index + 1}
            </span>
            <p className="text-sm leading-relaxed text-text-secondary">{clue}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
