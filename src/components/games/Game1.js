import React, { useEffect, useState } from 'react';
import { getBasketballOpenQuestions, getFootballOpenQuestions } from '../../services/api';
import { useGameContext } from '../../contexts/GameContext';

const Game1 = ({ sport, setLoading }) => {
  const { 
    currentRound, 
    players, 
    updateScore, 
    strikes, 
    addStrike, 
    passes, 
    handleUsePass 
  } = useGameContext();
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [roundComplete, setRoundComplete] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showExamples, setShowExamples] = useState(false);
  const [usedQuestionIndices, setUsedQuestionIndices] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        // Get 10 questions for the current sport (more than needed to allow for skipping)
        const sportQuestions = sport === 'basketball' 
          ? await getBasketballOpenQuestions(10)
          : await getFootballOpenQuestions(10);
        
        setQuestions(sportQuestions);
        setUsedQuestionIndices([]);
        setLoading(false);
      } catch (error) {
        console.error('Error loading questions:', error);
        setLoading(false);
      }
    };

    loadQuestions();
  }, [sport, setLoading]);

  useEffect(() => {
    // Set the current question based on the round
    if (questions.length > 0 && currentRound > 0 && currentRound <= 5) {
      // For a new round, select the first unused question
      if (!roundComplete) {
        const roundIndex = currentRound - 1;
        setCurrentQuestionIndex(roundIndex);
        setCurrentQuestion(questions[roundIndex]);
        
        // Mark this question as used
        if (!usedQuestionIndices.includes(roundIndex)) {
          setUsedQuestionIndices(prev => [...prev, roundIndex]);
        }
        
        setWinner(null);
        setShowExamples(false);
      }
    }
  }, [questions, currentRound, roundComplete, usedQuestionIndices]);

  // Check if a player has 3 strikes (lost the round)
  useEffect(() => {
    if (!roundComplete) {
      players.forEach(player => {
        if (strikes[player] >= 3) {
          // Find the other player
          const otherPlayer = players.find(p => p !== player);
          if (otherPlayer) {
            // Award point to the other player
            updateScore(otherPlayer, 1);
            setWinner(otherPlayer);
            setRoundComplete(true);
          }
        }
      });
    }
  }, [strikes, players, roundComplete, updateScore]);

  // Add a strike to a player
  const handleAddStrike = (player) => {
    addStrike(player);
  };

  // Use a pass for a player
  const handlePass = (player) => {
    handleUsePass(player);
  };

  // Format the context into a list of examples
  const formatExamples = (context) => {
    if (!context) return [];
    
    // Split by commas and clean up
    return context.split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0 && !item.endsWith('etc.'));
  };

  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  const examples = formatExamples(currentQuestion.context);

  return (
    <div className="game game1 full-screen">
      <div className="question-container">
        <h4>Question:</h4>
        <p className="question">{currentQuestion.question}</p>
        
        <div className="context-info">
          <div className="context-header">
            <h4>Examples (for referee):</h4>
            <button 
              onClick={() => setShowExamples(!showExamples)} 
              className="toggle-examples-button"
            >
              {showExamples ? 'Hide Examples' : 'Show Examples'}
            </button>
          </div>
          
          {showExamples && (
            <div className="examples-list">
              <ul>
                {examples.map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {roundComplete ? (
        <div className="winner-display">
          <h4>{winner} won this round!</h4>
          <p>1 point awarded</p>
        </div>
      ) : (
        <div className="referee-controls">
          <h4>Referee Controls</h4>
          <div className="player-actions-container">
            {players.map((player, index) => (
              <div key={index} className="player-action-card">
                <h5>{player}</h5>
                <div className="player-stats-mini">
                  <div className="stat-mini">
                    <span>Strikes: {strikes[player] || 0}/3</span>
                  </div>
                  <div className="stat-mini">
                    <span>Passes: {passes[player] || 0}/1</span>
                  </div>
                </div>
                <div className="action-buttons">
                  <button 
                    onClick={() => handleAddStrike(player)}
                    className="strike-button"
                    disabled={strikes[player] >= 3 || roundComplete}
                  >
                    Add Strike
                  </button>
                  <button 
                    onClick={() => handlePass(player)}
                    className="pass-button"
                    disabled={passes[player] <= 0 || roundComplete}
                  >
                    Use Pass
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="skip-question-container">
            <button 
              onClick={() => {
                // Find an unused question index
                const availableIndices = questions
                  .map((_, index) => index)
                  .filter(index => index >= 5 && !usedQuestionIndices.includes(index));
                
                if (availableIndices.length > 0) {
                  // Get a random unused question
                  const newIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
                  
                  // Update the current question
                  setCurrentQuestion(questions[newIndex]);
                  setCurrentQuestionIndex(newIndex);
                  
                  // Mark this question as used
                  setUsedQuestionIndices(prev => [...prev, newIndex]);
                  
                  // Reset UI state
                  setShowExamples(false);
                } else {
                  // If we've used all questions, just mark as complete without a winner
                  setRoundComplete(true);
                  setWinner(null);
                }
              }}
              className="skip-question-button"
            >
              Skip Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game1;
