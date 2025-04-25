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

        {/* Icons */}
        <link rel="shortcut icon" href={metadata.icons.shortcut} />
        {metadata.icons.apple.map((icon, index) => (
          <link key={index} rel="apple-touch-icon" sizes={icon.sizes} href={icon.url} />
        ))}
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
