import React from 'react';
import { useGameContext } from '../contexts/GameContext';

const ScoreBoard = () => {
  const { players, scores, currentGame, currentRound, strikes, passes, selectedSport } = useGameContext();
  
  const gameNames = [
    "Setup",
    "What do you know?",
    "Bidding Game",
    "Impossible",
    "Guess the Player"
  ];

  return (
    <div className="score-board">
      <div className="game-header-content">
        <div className="game-title">
          <h2>{gameNames[currentGame]}</h2>
          {currentGame > 0 && <p className="round-indicator">Round {currentRound} of 5</p>}
          {selectedSport && <p className="sport-indicator">{selectedSport}</p>}
        </div>
        
        <div className="scores-container">
          {players.map((player, index) => (
            <div key={index} className="player-score-card">
              <div className="player-name">{player}</div>
              <div className="player-stats">
                <div className="stat-item">
                  <span className="stat-value">{scores[player] || 0}</span>
                  <span className="stat-label">Points</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{strikes[player] || 0}/3</span>
                  <span className="stat-label">Strikes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{passes[player] || 0}/1</span>
                  <span className="stat-label">Passes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
