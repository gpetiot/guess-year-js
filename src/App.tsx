import { GameProvider, useGame } from './context/GameContext';
import { ClueList } from './components/ClueList';
import { GuessInput } from './components/GuessInput';
import { GuessList } from './components/GuessList';

const GameContent = () => {
  const { currentPuzzle, guesses, gameStatus, handleGuessSubmit, score, handleShare } = useGame();

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold">Chronos Code</h1>
      
      {currentPuzzle && (
        <>
          <div className="text-lg text-center">
            <p>Decode the year from the clues below:</p>
            <p className="text-sm text-gray-600">{currentPuzzle.date}</p>
          </div>

          <ClueList clues={currentPuzzle.clues} />
          
          <GuessList guesses={guesses} />
          
          <GuessInput 
            onSubmit={handleGuessSubmit} 
            disabled={gameStatus !== 'playing'} 
          />

          {gameStatus !== 'playing' && (
            <div className="space-y-4 text-center">
              <p className="text-xl font-bold">
                {gameStatus === 'won' ? '🎉 Congratulations!' : '😔 Better luck next time!'}
              </p>
              <p>The year was: {currentPuzzle.year}</p>
              <p>Score: {score}</p>
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Share Result
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <GameContent />
      </div>
    </GameProvider>
  );
}

export default App;
