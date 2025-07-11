import { ClueList } from './ClueList';

interface SidePanelDesktopProps {
  isOpen: boolean;
  onClose: () => void;
  clues: string[];
}

export const SidePanelDesktop = ({ isOpen, onClose, clues }: SidePanelDesktopProps) => {
  return (
    <>
      <div
        className={`fixed left-0 top-0 z-10 hidden h-full transform bg-bg-secondary shadow-2xl transition-all duration-300 ease-in-out md:block ${
          isOpen ? 'w-[400px] translate-x-0' : 'w-0 -translate-x-full'
        }`}
      >
        <div className="h-full overflow-hidden">
          <div className="flex h-full flex-col p-6">
            <div className="mb-4 flex items-center justify-between">
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
                    d="M11 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Rules */}
            <div className="mb-6 rounded-lg bg-bg-tertiary/50 p-4 text-sm text-text-secondary">
              <h3 className="mb-2 font-semibold text-text">How to Play</h3>
              <ul className="space-y-2">
                <li>• Guess the year based on the clues below</li>
                <li>• Green digits are correct and in the right position</li>
                <li>• Yellow digits are correct but in the wrong position</li>
                <li>• Red digits are incorrect</li>
              </ul>
            </div>

            <div className="text-text">
              <ClueList clues={clues} />
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={onClose}
          className="fixed bottom-4 left-4 z-30 hidden rounded-full bg-primary p-4 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 md:block"
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
      )}
    </>
  );
};
