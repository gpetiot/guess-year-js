import { GameProvider, useGame } from './context/GameContext';
import { ClueList } from './components/ClueList';
import { GuessInput } from './components/GuessInput';
import { GuessList } from './components/GuessList';
import './styles/game.css';

const GameContent = () => {
  const { currentPuzzle, guesses, gameStatus, handleGuessSubmit, score, handleShare } = useGame();

  return (
    <div className="flex min-h-screen flex-col items-center bg-white dark:bg-gray-900">
      <header className="w-full border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-center text-3xl font-bold dark:text-white">Chronos Code</h1>
        </div>
      </header>

      <main className="container mx-auto w-full max-w-2xl flex-1 px-4 py-8">
        {currentPuzzle && (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <p className="text-lg dark:text-white">Decode the year from the clues below:</p>
            </div>

            <ClueList clues={currentPuzzle.clues} />

            <GuessList guesses={guesses} maxAttempts={6} />

            <GuessInput onSubmit={handleGuessSubmit} disabled={gameStatus !== 'playing'} />

            {gameStatus !== 'playing' && (
              <div className="space-y-4 rounded-lg bg-gray-100 p-6 text-center dark:bg-gray-800">
                <p className="text-xl font-bold dark:text-white">
                  {gameStatus === 'won' ? '🎉 Congratulations!' : '😔 Better luck next time!'}
                </p>
                <p className="dark:text-white">The year was: {currentPuzzle.year}</p>
                <p className="text-lg font-semibold dark:text-white">Score: {score}</p>
                <button
                  onClick={handleShare}
                  className="rounded-md bg-green-500 px-6 py-2 text-white transition-colors hover:bg-green-600"
                >
                  Share Result
                </button>
              </div>
            )}
          </div>
        )}
      </main>
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
