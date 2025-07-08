import { GameProvider, useGame } from './context/GameContext';
import { GuessInput, GuessInputHandle } from './components/GuessInput';
import { GuessList } from './components/GuessList';
import { SidePanelDesktop } from './components/SidePanelDesktop';
import { SidePanelMobile } from './components/SidePanelMobile';
import { GameResultPopup } from './components/GameResultPopup';
import { generateShareText } from './utils/gameLogic';
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { metadata } from './data/metadata';
import './styles/game.css';

const GameContent = () => {
  const { currentPuzzle, guesses, gameStatus, handleGuessSubmit, score } = useGame();
  const [isCluesPanelOpen, setIsCluesPanelOpen] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const guessInputRef = useRef<GuessInputHandle>(null);

  // Show result popup when game ends
  useEffect(() => {
    if (gameStatus !== 'playing') {
      setShowResult(true);
    }
  }, [gameStatus]);

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
      {/* GitHub link in top-right corner */}
      <a
        href="https://github.com/gpetiot/guess-year-js"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View on GitHub"
        className="fixed right-4 top-4 z-50 flex items-center justify-center rounded-full bg-bg-secondary p-2 shadow-lg transition hover:bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-primary"
        style={{ width: 40, height: 40 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6 text-text-secondary"
        >
          <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" />
        </svg>
      </a>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />

        {/* Open Graph */}
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:locale" content={metadata.openGraph.locale} />

        {/* Twitter */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />

        {/* Additional Meta Tags */}
        {metadata.additionalMetaTags.map((tag, index) => (
          <meta key={index} name={tag.name} content={tag.content} />
        ))}

        {/* Canonical */}
        <link rel="canonical" href={metadata.alternates.canonical} />

        <link rel="manifest" href={metadata.manifest} />
      </Helmet>

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
          <div className="container mx-auto flex flex-col items-center px-4 py-6">
            <h1 className="flex items-baseline gap-3 text-5xl font-black tracking-tight sm:text-6xl">
              <span className="relative">
                <span className="text-primary">DAT</span>
              </span>
              <span className="text-text">YEAR</span>
            </h1>
            <p className="mt-3 text-center text-lg font-medium text-text-secondary">
              Guess the year through historical clues 💡
            </p>
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

              {gameStatus !== 'playing' && showResult && (
                <GameResultPopup
                  gameStatus={gameStatus}
                  year={currentPuzzle.year}
                  score={score}
                  shareText={generateShareText(guesses, gameStatus === 'won')}
                  onClose={() => setShowResult(false)}
                />
              )}
            </div>
          )}
        </main>

        <footer className="w-full border-t border-bg-tertiary bg-bg py-4">
          <div className="container mx-auto flex flex-col items-center gap-2 px-4 text-sm text-text-secondary">
            <div className="text-center">© {new Date().getFullYear()} Dat Year</div>
            <div className="text-center text-xs text-text-secondary opacity-60">
              View source on{' '}
              <a
                href="https://github.com/gpetiot/guess-year-js"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
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
