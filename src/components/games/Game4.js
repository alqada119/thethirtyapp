import React, { useEffect, useState } from 'react';
import { getBasketballPlayersForGuessing, getFootballPlayersForGuessing } from '../../services/api';
import { useGameContext } from '../../contexts/GameContext';

const Game4 = ({ sport, setLoading }) => {
  const { currentRound, players, updateScore } = useGameContext();
  const [playerData, setPlayerData] = useState([]);
  const [currentPlayerData, setCurrentPlayerData] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [revealedClues, setRevealedClues] = useState(1);
  const [guessingPlayer, setGuessingPlayer] = useState(null);
  const [roundComplete, setRoundComplete] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const loadPlayerData = async () => {
      setLoading(true);
      try {
        // Get 5 players for the current sport
        const sportPlayerData = sport === 'basketball' 
          ? await getBasketballPlayersForGuessing(5)
          : await getFootballPlayersForGuessing(5);
        
        setPlayerData(sportPlayerData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading player data:', error);
        setLoading(false);
      }
    };

    loadPlayerData();
  }, [sport, setLoading]);

  useEffect(() => {
    // Set the current player data based on the round
    if (playerData.length > 0 && currentRound > 0 && currentRound <= playerData.length) {
      setCurrentPlayerData(playerData[currentRound - 1]);
      setShowAnswer(false);
      setRevealedClues(1);
      setGuessingPlayer(null);
      setRoundComplete(false);
      setWinner(null);
    }
  }, [playerData, currentRound]);

  // Reveal an additional clue
  const revealNextClue = () => {
    if (currentPlayerData && revealedClues < currentPlayerData.clues.length) {
      setRevealedClues(revealedClues + 1);
    }
  };

  // Handle when a player attempts to guess
  const handlePlayerGuess = (player) => {
    setGuessingPlayer(player);
  };

  // Award points based on correct guess
  const awardPoints = (correct) => {
    if (correct && guessingPlayer) {
      // Award 1 point for correct guess
      updateScore(guessingPlayer, 1);
      setWinner(guessingPlayer);
    }
    
    // Show the answer and mark round as complete
    setShowAnswer(true);
    setRoundComplete(true);
  };

  if (!currentPlayerData) {
    return <div>Loading player data...</div>;
  }

  return (
    <div className="game game4 full-screen">
      <h2>Game 4: Guess the Player</h2>
      <h3>Round {currentRound}/5</h3>
      
      <div className="clues-container">
        <h4>Clues:</h4>
        <ul className="clues-list">
          {currentPlayerData.clues.slice(0, revealedClues).map((clue, index) => (
            <li key={index} className="clue">{clue}</li>
          ))}
        </ul>
        
        {revealedClues < currentPlayerData.clues.length && !showAnswer && !guessingPlayer && (
          <button onClick={revealNextClue} className="reveal-clue-button">
            Reveal Next Clue
          </button>
        )}
        
        {showAnswer && (
          <div className="answer">
            <h4>Player:</h4>
            <p className="player-name">{currentPlayerData.name}</p>
          </div>
        )}
      </div>
      
      {roundComplete ? (
        <div className="round-result">
          {winner ? (
            <>
              <h4>{winner} wins this round!</h4>
              <p>1 point awarded</p>
            </>
          ) : (
            <h4>No points awarded this round</h4>
          )}
        </div>
      ) : !guessingPlayer ? (
        <div className="guessing-controls">
          <h4>Who wants to guess?</h4>
          <div className="player-buttons">
            {players.map((player, index) => (
              <button 
                key={index} 
                onClick={() => handlePlayerGuess(player)}
                className="player-button"
              >
                {player}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="referee-controls">
          <h4>{guessingPlayer} is guessing</h4>
          <div className="guess-buttons">
            <button 
              onClick={() => awardPoints(true)}
              className="correct-button"
            >
              Correct
            </button>
            <button 
              onClick={() => awardPoints(false)}
              className="incorrect-button"
            >
              Incorrect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game4;
