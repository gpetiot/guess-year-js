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
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Historical Clues
              </h2>
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
            <div className="text-text">
              <ClueList clues={clues} />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className={`fixed left-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-r-lg bg-bg-secondary p-2 text-text-secondary shadow-lg transition-colors hover:bg-bg-tertiary md:block ${
          isOpen ? 'hidden' : 'block'
        }`}
        aria-label="Open panel"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
        </svg>
      </button>
    </>
  );
};
