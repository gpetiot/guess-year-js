import { ShareButtons } from './ShareButtons';

interface GameResultPopupProps {
  gameStatus: 'won' | 'lost';
  year: string | number;
  score: number;
  shareText: string;
}

export const GameResultPopup = ({ gameStatus, year, score, shareText }: GameResultPopupProps) => {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-text/40 backdrop-blur-sm" />

      {/* Popup */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform space-y-6 rounded-2xl bg-bg p-8 shadow-2xl">
        <div className="relative">
          {/* Confetti or Sad Face Decoration */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 transform text-4xl">
            {gameStatus === 'won' ? '🎉' : '😔'}
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl font-bold text-text">
            {gameStatus === 'won' ? 'Congratulations!' : 'Better luck next time!'}
          </h2>
        </div>

        {/* Year Reveal */}
        <div className="rounded-xl bg-bg-secondary p-4 text-center">
          <p className="text-sm text-text-secondary">The year was</p>
          <p className="mt-1 text-3xl font-bold text-primary">{year}</p>
        </div>

        {/* Score */}
        <div className="flex justify-center">
          <div className="rounded-xl bg-bg-tertiary px-8 py-4">
            <p className="text-sm font-medium text-text-secondary">Score</p>
            <p className="text-center text-3xl font-bold text-primary">{score}</p>
          </div>
        </div>

        {/* Share Section */}
        <div className="space-y-3 pt-2">
          <p className="text-center text-sm text-text-secondary">Share your result:</p>
          <ShareButtons shareText={shareText} />
        </div>
      </div>
    </>
  );
}; 