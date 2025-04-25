import { ClueList } from './ClueList';
import { useSwipeable } from 'react-swipeable';

interface SidePanelMobileProps {
  isOpen: boolean;
  onClose: () => void;
  clues: string[];
}

export const SidePanelMobile = ({ isOpen, onClose, clues }: SidePanelMobileProps) => {
  const swipeHandlers = useSwipeable({
    onSwipedDown: onClose,
    delta: 50, // min distance(px) before a swipe starts
    preventScrollOnSwipe: true,
    trackTouch: true, // track touch input
    trackMouse: false, // don't track mouse input
  });

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-text/20 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        {...swipeHandlers}
        className={`fixed inset-x-0 bottom-0 z-50 transform bg-bg-secondary shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="relative max-h-[80vh] overflow-y-auto">
          {/* Handle */}
          <div className="sticky top-0 flex items-center justify-center bg-bg-secondary py-2">
            <div className="h-1 w-12 rounded-full bg-text/20" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between border-b border-bg-tertiary px-4 py-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">Clues</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-bg-tertiary"
              aria-label="Close panel"
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
          </div>

          {/* Rules */}
          <div className="border-b border-bg-tertiary px-4 py-4">
            <div className="rounded-lg bg-bg-tertiary/50 p-4 text-sm text-text-secondary">
              <h3 className="mb-2 font-semibold text-text">How to Play</h3>
              <ul className="space-y-2">
                <li>• Guess the year based on the clues below</li>
                <li>• Green digits are correct and in the right position</li>
                <li>• Yellow digits are correct but in the wrong position</li>
                <li>• Red digits are incorrect</li>
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <ClueList clues={clues} />
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onClose}
        className={`fixed bottom-4 right-4 z-30 rounded-full bg-primary p-4 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 md:hidden ${
          isOpen ? 'hidden' : 'block'
        }`}
        aria-label="Show clues"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </>
  );
};
