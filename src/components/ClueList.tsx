interface ClueListProps {
  clues: string[];
}

export const ClueList = ({ clues }: ClueListProps) => {
  return (
    <div className="rounded-lg border border-blue-400/20 bg-white/10 shadow-lg backdrop-blur-sm">
      <div className="p-4">
        <div className="space-y-3">
          {clues.map((clue, index) => (
            <p key={index} className="text-sm leading-relaxed text-white/90">
              <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/30 text-xs font-semibold text-white">
                {index + 1}
              </span>
              {clue}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
