
import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  // Player state
  const [players, setPlayers] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [currentGame, setCurrentGame] = useState(0); // 0: setup, 1-4: games
  const [scores, setScores] = useState({});
  const [gameState, setGameState] = useState('setup'); // setup, playing, finished
  const [currentRound, setCurrentRound] = useState(1);
  const [strikes, setStrikes] = useState({});
  const [passes, setPasses] = useState({});

  // Add players (up to 2)
  const addPlayer = (playerName) => {
    if (players.length < 2 && !players.includes(playerName) && playerName.trim() !== '') {
      setPlayers([...players, playerName]);
      setScores(prev => ({ ...prev, [playerName]: 0 }));
      setStrikes(prev => ({ ...prev, [playerName]: 0 }));
      setPasses(prev => ({ ...prev, [playerName]: 1 })); // 1 pass per round
    }
  };

  // Remove player
  const removePlayer = (playerName) => {
    setPlayers(players.filter(player => player !== playerName));
    
    // Create new objects without the removed player
    const newScores = { ...scores };
    const newStrikes = { ...strikes };
    const newPasses = { ...passes };
    
    delete newScores[playerName];
    delete newStrikes[playerName];
    delete newPasses[playerName];
    
    setScores(newScores);
    setStrikes(newStrikes);
    setPasses(newPasses);
  };

  // Update score
  const updateScore = (playerName, points) => {
    setScores(prev => ({
      ...prev,
      [playerName]: (prev[playerName] || 0) + points
    }));
  };

  // Add strike
  const addStrike = (playerName) => {
    setStrikes(prev => ({
      ...prev,
      [playerName]: (prev[playerName] || 0) + 1
    }));
  };

  // Reset strikes for a new round
  const resetStrikes = () => {
    const newStrikes = {};
    players.forEach(player => {
      newStrikes[player] = 0;
    });
    setStrikes(newStrikes);
  };

  // Use pass
  const handleUsePass = (playerName) => {
    if (passes[playerName] > 0) {
      setPasses(prev => ({
        ...prev,
        [playerName]: prev[playerName] - 1
      }));
      return true;
    }
    return false;
  };

  // Reset passes for a new round
  const resetPasses = () => {
    const newPasses = {};
    players.forEach(player => {
      newPasses[player] = 1; // 1 pass per round
    });
    setPasses(newPasses);
  };

  // Start a new game
  const startGame = () => {
    setCurrentGame(1);
    setGameState('playing');
    setCurrentRound(1);
    resetStrikes();
    resetPasses();
  };

  // Move to next game
  const nextGame = () => {
    if (currentGame < 4) {
      setCurrentGame(currentGame + 1);
      setCurrentRound(1);
      resetStrikes();
      resetPasses();
    } else {
      // End of all games
      setGameState('finished');
    }
  };

  // Move to next round
  const nextRound = () => {
    if (currentRound < 5) {
      setCurrentRound(currentRound + 1);
      resetStrikes();
      resetPasses();
    } else {
      // End of rounds for current game
      nextGame();
    }
  };

  // Reset the entire game
  const resetGame = () => {
    setPlayers([]);
    setSelectedSport('');
    setCurrentGame(0);
    setScores({});
    setGameState('setup');
    setCurrentRound(1);
    setStrikes({});
    setPasses({});
  };

  const value = {
    players,
    selectedSport,
    setSelectedSport,
    currentGame,
    scores,
    gameState,
    currentRound,
    strikes,
    passes,
    addPlayer,
    removePlayer,
    updateScore,
    addStrike,
    handleUsePass,
    startGame,
    nextGame,
    nextRound,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
