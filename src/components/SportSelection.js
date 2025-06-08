import React from 'react';
import { useGameContext } from '../contexts/GameContext';

const SportSelection = () => {
  const { selectedSport, setSelectedSport } = useGameContext();

  return (
    <div className="sport-selection">
      <h2>Select a Sport</h2>
      <div className="sport-options">
        <button 
          className={`sport-button ${selectedSport === 'basketball' ? 'selected' : ''}`}
          onClick={() => setSelectedSport('basketball')}
        >
          Basketball
        </button>
        <button 
          className={`sport-button ${selectedSport === 'football' ? 'selected' : ''}`}
          onClick={() => setSelectedSport('football')}
        >
          Football
        </button>
      </div>
    </div>
  );
};

export default SportSelection;
