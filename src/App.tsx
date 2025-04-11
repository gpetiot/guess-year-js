import { GameProvider, useGame } from './context/GameContext';
import { ClueList } from './components/ClueList';
import { GuessInput, GuessInputHandle } from './components/GuessInput';
import { GuessList } from './components/GuessList';
import { ShareButtons } from './components/ShareButtons';
import { generateShareText } from './utils/gameLogic';
import { useState, useEffect, useRef } from 'react';
import './styles/game.css';

const GameContent = () => {
  const { currentPuzzle, guesses, gameStatus, handleGuessSubmit, score, handleShare } = useGame();
  const [isCluesPanelOpen, setIsCluesPanelOpen] = useState(true);
  const guessInputRef = useRef<GuessInputHandle>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameStatus !== 'playing') return;

      // Prevent handling if user is typing in an input field
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = event.key;
      if (
        (key >= '0' && key <= '9') ||
        key === 'Backspace' ||
        key === 'Enter' ||
        key === 'Delete'
      ) {
        event.preventDefault();
        const value = key === 'Delete' ? 'Backspace' : key;
        guessInputRef.current?.handleKeyClick(value);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus]);

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Side Panel */}
      <div
        className={`fixed left-0 top-0 z-10 h-full transform bg-blue-600 shadow-lg transition-all duration-300 ease-in-out dark:bg-blue-700 ${
          isCluesPanelOpen ? 'w-[30%] translate-x-0' : 'w-0 -translate-x-full'
        }`}
      >
        <div className="h-full overflow-hidden">
          <div className="flex h-full flex-col p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
                Historical Clues
              </h2>
              <button
                onClick={() => setIsCluesPanelOpen(false)}
                className="rounded p-2 text-white/80 hover:bg-blue-500 dark:hover:bg-blue-600"
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
            <div className="text-white">
              {currentPuzzle && <ClueList clues={currentPuzzle.clues} />}
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button (Outside Panel) */}
      <button
        onClick={() => setIsCluesPanelOpen(true)}
        className={`fixed left-0 top-1/2 z-20 -translate-y-1/2 rounded-r bg-blue-600 p-2 text-white/80 shadow-md hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 ${
          isCluesPanelOpen ? 'hidden' : 'block'
        }`}
        aria-label="Open panel"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
        </svg>
      </button>

      {/* Main Content */}
      <div className="flex min-h-screen flex-col items-center">
        <header className="w-full border-b dark:border-gray-800">
          <div className="container mx-auto flex items-center px-4 py-3">
            <h1 className="flex-1 text-center text-3xl font-bold dark:text-white">
              Guess the Year
            </h1>
          </div>
        </header>

        <main className="container mx-auto w-full max-w-2xl flex-1 px-4 py-8">
          {currentPuzzle && (
            <div className="flex flex-col items-center gap-8">
              <GuessList guesses={guesses} maxAttempts={6} />

              <GuessInput
                ref={guessInputRef}
                onSubmit={handleGuessSubmit}
                disabled={gameStatus !== 'playing'}
              />

              {gameStatus !== 'playing' && (
                <div className="w-full space-y-4 rounded-lg bg-gray-100 p-6 text-center dark:bg-gray-800">
                  <p className="text-xl font-bold dark:text-white">
                    {gameStatus === 'won' ? '🎉 Congratulations!' : '😔 Better luck next time!'}
                  </p>
                  <p className="dark:text-white">The year was: {currentPuzzle.year}</p>
                  <p className="text-lg font-semibold dark:text-white">Score: {score}</p>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Share your result:</p>
                    <ShareButtons shareText={generateShareText(guesses, gameStatus === 'won')} />
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;
