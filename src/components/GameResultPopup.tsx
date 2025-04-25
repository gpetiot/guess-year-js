import { ShareButtons } from './ShareButtons';
import { useEffect } from 'react';

interface GameResultPopupProps {
  gameStatus: 'won' | 'lost';
  year: string | number;
  score: number;
  shareText: string;
  onClose: () => void;
}

export const GameResultPopup = ({
  gameStatus,
  year,
  score,
  shareText,
  onClose,
}: GameResultPopupProps) => {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-text/40 backdrop-blur-sm" onClick={onClose} />

      {/* Popup */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform space-y-6 rounded-2xl bg-bg p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-text-secondary transition-colors hover:bg-bg-tertiary"
          aria-label="Close popup"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

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
