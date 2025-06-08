import React from 'react';
import './App.css';
import { GameProvider } from './contexts/GameContext';
import { useGameContext } from './contexts/GameContext';
import PlayerSelection from './components/PlayerSelection';
import SportSelection from './components/SportSelection';
import ScoreBoard from './components/ScoreBoard';
import GameContainer from './components/GameContainer';
import GameControls from './components/GameControls';

// Main app content that uses the context
const AppContent = () => {
  const { gameState } = useGameContext();
  
  return (
    <div className="App">
      {gameState === 'setup' ? (
        // Setup screen with header
        <>
          <header className="App-header">
            <h1>The Thirty App</h1>
            <p>A Sports Trivia Game</p>
          </header>
          
          <main className="App-main">
            <div className="setup-section">
              <PlayerSelection />
              <SportSelection />
              <GameControls />
            </div>
          </main>
          
          <footer className="App-footer">
            <p>&copy; 2025 The Thirty App</p>
          </footer>
        </>
      ) : (
        // Game screen - full screen with score in header
        <div className="game-fullscreen">
          <div className="game-header">
            <ScoreBoard />
          </div>
          <div className="game-content">
            <GameContainer />
          </div>
          <div className="game-footer">
            <GameControls />
          </div>
        </div>
      )}
    </div>
  );
};

// Wrapper component that provides the context
function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
