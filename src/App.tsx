import { GameProvider, useGame } from './context/GameContext';
import { ClueList } from './components/ClueList';
import { GuessInput } from './components/GuessInput';
import { GuessList } from './components/GuessList';
import './styles/game.css';

const GameContent = () => {
  const { currentPuzzle, guesses, gameStatus, handleGuessSubmit, score, handleShare } = useGame();

  return (
    <div className="flex flex-col items-center min-h-screen bg-white dark:bg-gray-900">
      <header className="w-full border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-3xl font-bold text-center dark:text-white">Chronos Code</h1>
        </div>
      </header>

      <main className="flex-1 w-full container mx-auto px-4 py-8 max-w-2xl">
        {currentPuzzle && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-lg dark:text-white">Decode the year from the clues below:</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{currentPuzzle.date}</p>
            </div>

            <ClueList clues={currentPuzzle.clues} />
            
            <GuessList guesses={guesses} maxAttempts={6} />
            
            <GuessInput 
              onSubmit={handleGuessSubmit} 
              disabled={gameStatus !== 'playing'} 
            />

            {gameStatus !== 'playing' && (
              <div className="space-y-4 text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-xl font-bold dark:text-white">
                  {gameStatus === 'won' ? '🎉 Congratulations!' : '😔 Better luck next time!'}
                </p>
                <p className="dark:text-white">The year was: {currentPuzzle.year}</p>
                <p className="text-lg font-semibold dark:text-white">Score: {score}</p>
                <button
                  onClick={handleShare}
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
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
