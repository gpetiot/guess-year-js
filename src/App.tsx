import { GameProvider, useGame } from './context/GameContext';
import { ClueList } from './components/ClueList';
import { GuessInput, GuessInputHandle } from './components/GuessInput';
import { GuessList } from './components/GuessList';
import { ShareButtons } from './components/ShareButtons';
import { SidePanelDesktop } from './components/SidePanelDesktop';
import { SidePanelMobile } from './components/SidePanelMobile';
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
    <div className="relative min-h-screen bg-bg text-text">
      {currentPuzzle && (
        <>
          <SidePanelDesktop
            isOpen={isCluesPanelOpen}
            onClose={() => setIsCluesPanelOpen(!isCluesPanelOpen)}
            clues={currentPuzzle.clues}
          />
          <SidePanelMobile
            isOpen={isCluesPanelOpen}
            onClose={() => setIsCluesPanelOpen(!isCluesPanelOpen)}
            clues={currentPuzzle.clues}
          />
        </>
      )}

      {/* Main Content */}
      <div className="flex min-h-screen flex-col items-center">
        <header className="w-full border-b border-bg-tertiary bg-bg">
          <div className="container mx-auto flex items-center px-4 py-4">
            <h1 className="flex-1 text-center text-4xl font-bold tracking-tight">
              <span className="text-primary">Dat</span> <span className="text-text">Year</span>
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
                <div className="w-full space-y-6 rounded-2xl bg-bg-secondary p-8 text-center shadow-xl">
                  <p className="text-2xl font-bold text-text">
                    {gameStatus === 'won' ? '🎉 Congratulations!' : '😔 Better luck next time!'}
                  </p>
                  <p className="text-lg text-text-secondary">The year was: {currentPuzzle.year}</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="rounded-lg bg-bg-tertiary px-6 py-3">
                      <p className="text-sm font-medium text-text-secondary">Score</p>
                      <p className="text-3xl font-bold text-primary">{score}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm text-text-secondary">Share your result:</p>
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
