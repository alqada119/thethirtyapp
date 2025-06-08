import React, { useState } from 'react';
import { useGameContext } from '../contexts/GameContext';

const PlayerSelection = () => {
  const { players, addPlayer, removePlayer } = useGameContext();
  const [playerName, setPlayerName] = useState('');

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (playerName.trim() !== '') {
      addPlayer(playerName);
      setPlayerName('');
    }
  };

  return (
    <div className="player-selection">
      <h2>Add Players</h2>
      <p>Add up to 2 players</p>
      
      <form onSubmit={handleAddPlayer}>
        <div className="input-group">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter player name"
            disabled={players.length >= 2}
          />
          <button 
            type="submit" 
            disabled={players.length >= 2 || playerName.trim() === ''}
          >
            Add Player
          </button>
        </div>
      </form>
      
      <div className="players-list">
        <h3>Players:</h3>
        {players.length === 0 ? (
          <p>No players added yet</p>
        ) : (
          <ul>
            {players.map((player, index) => (
              <li key={index}>
                {player}
                <button onClick={() => removePlayer(player)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PlayerSelection;
