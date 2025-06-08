import React from 'react';
import { useGameContext } from '../contexts/GameContext';

const GameControls = () => {
  const { 
    players, 
    selectedSport, 
    gameState, 
    currentRound,
    nextGame, 
    nextRound, 
    startGame, 
    resetGame 
  } = useGameContext();

  // Check if we can start the game (2 players and sport selected)
  const canStartGame = players.length === 2 && selectedSport && gameState === 'setup';

  return (
    <div className="game-controls">
      {gameState === 'setup' && (
        <button 
          onClick={startGame} 
          disabled={!canStartGame}
          className="start-button"
        >
          Start Game
        </button>
      )}
      
      {gameState === 'playing' && (
        <div className="navigation-controls">
          <button onClick={nextRound} className="control-button next-round-button">
            Next Round
          </button>
          
          {currentRound === 5 && (
            <button onClick={nextGame} className="control-button next-game-button">
              Next Game
            </button>
          )}
          
          <button onClick={resetGame} className="control-button reset-button">
            Reset
          </button>
        </div>
      )}
      
      {gameState === 'finished' && (
        <div className="game-finished">
          <span className="finished-text">Game Finished!</span>
          <button onClick={resetGame} className="control-button play-again-button">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GameControls;
