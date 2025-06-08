import React, { useEffect, useState } from 'react';
import { useGameContext } from '../contexts/GameContext';
import Game1 from './games/Game1';
import Game2 from './games/Game2';
import Game3 from './games/Game3';
import Game4 from './games/Game4';

const GameContainer = () => {
  const { currentGame, selectedSport, gameState } = useGameContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Reset loading state when game changes
    setLoading(false);
  }, [currentGame]);

  // Only render game components if we're in playing state
  if (gameState !== 'playing') {
    return null;
  }

  // Show loading indicator
  if (loading) {
    return (
      <div className="game-container loading">
        <h2>Loading game...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  // Render the current game as a full screen
  const renderGame = () => {
    switch (currentGame) {
      case 1:
        return <Game1 sport={selectedSport} setLoading={setLoading} />;
      case 2:
        return <Game2 sport={selectedSport} setLoading={setLoading} />;
      case 3:
        return <Game3 sport={selectedSport} setLoading={setLoading} />;
      case 4:
        return <Game4 sport={selectedSport} setLoading={setLoading} />;
      default:
        return <div>No game selected</div>;
    }
  };

  return (
    <div className="game-container full-screen">
      {renderGame()}
    </div>
  );
};

export default GameContainer;
