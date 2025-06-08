import React, { useEffect, useState } from 'react';
import { getHardBasketballQuestions, getHardFootballQuestions } from '../../services/api';
import { useGameContext } from '../../contexts/GameContext';

const Game3 = ({ sport, setLoading }) => {
  const { currentRound, players, updateScore } = useGameContext();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeringPlayer, setAnsweringPlayer] = useState(null);
  const [roundComplete, setRoundComplete] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        // Get 5 questions for the current sport
        const sportQuestions = sport === 'basketball' 
          ? await getHardBasketballQuestions(5)
          : await getHardFootballQuestions(5);
        
        setQuestions(sportQuestions);
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
    if (questions.length > 0 && currentRound > 0 && currentRound <= questions.length) {
      setCurrentQuestion(questions[currentRound - 1]);
      setShowAnswer(false);
      setAnsweringPlayer(null);
      setRoundComplete(false);
      setWinner(null);
    }
  }, [questions, currentRound]);

  // Handle when a player attempts to answer
  const handlePlayerAnswer = (player) => {
    setAnsweringPlayer(player);
    setShowAnswer(true);
  };

  // Award points to the answering player
  const awardPoints = (correct) => {
    if (correct && answeringPlayer) {
      // Award 2 points for correct answer
      updateScore(answeringPlayer, 2);
      setWinner(answeringPlayer);
    }
    // Mark round as complete
    setRoundComplete(true);
  };

  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="game game3 full-screen">
      <h2>Game 3: Impossible</h2>
      <h3>Round {currentRound}/5</h3>
      
      <div className="question-container">
        <h4>Question:</h4>
        <p className="question">{currentQuestion.question}</p>
        
        {showAnswer && (
          <div className="answer">
            <h4>Answer:</h4>
            <p>{currentQuestion.answer}</p>
          </div>
        )}
      </div>
      
      {roundComplete ? (
        <div className="round-result">
          {winner ? (
            <>
              <h4>{winner} wins this round!</h4>
              <p>2 points awarded</p>
            </>
          ) : (
            <h4>No points awarded this round</h4>
          )}
        </div>
      ) : !answeringPlayer ? (
        <div className="answering-controls">
          <h4>Who answered first?</h4>
          <div className="player-buttons">
            {players.map((player, index) => (
              <button 
                key={index} 
                onClick={() => handlePlayerAnswer(player)}
                className="player-button"
              >
                {player}
              </button>
            ))}
            <button 
              onClick={() => setShowAnswer(true)}
              className="show-answer-button"
            >
              Show Answer
            </button>
          </div>
        </div>
      ) : (
        <div className="referee-controls">
          <h4>Was {answeringPlayer}'s answer correct?</h4>
          <div className="answer-buttons">
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

export default Game3;
