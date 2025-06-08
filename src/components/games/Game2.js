import React, { useEffect, useState } from 'react';
import { getBasketballBiddingQuestions, getFootballBiddingQuestions } from '../../services/api';
import { useGameContext } from '../../contexts/GameContext';

const Game2 = ({ sport, setLoading }) => {
  const { currentRound, players, updateScore } = useGameContext();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [bids, setBids] = useState({});
  const [currentBidder, setCurrentBidder] = useState(null);
  const [bidding, setBidding] = useState(true);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [roundComplete, setRoundComplete] = useState(false);
  const [winner, setWinner] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        // Get 5 questions for the current sport
        const sportQuestions = sport === 'basketball' 
          ? await getBasketballBiddingQuestions(5)
          : await getFootballBiddingQuestions(5);
        
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
      // Reset state for new question
      setBids({});
      setBidding(true);
      setCurrentBidder(null);
      setTimer(0);
      setTimerRunning(false);
      setRoundComplete(false);
      setWinner(null);
      setPoints(0);
    }
  }, [questions, currentRound]);

  useEffect(() => {
    // Timer logic
    let interval = null;
    if (timerRunning && timer < 30) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else if (timerRunning && timer >= 30) {
      setTimerRunning(false);
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [timerRunning, timer]);

  // Handle bid submission
  const handleBid = (player, bidAmount) => {
    const newBids = { ...bids, [player]: bidAmount };
    setBids(newBids);
  };

  // End bidding and set the highest bidder
  const endBidding = () => {
    // Find the highest bidder
    let highestBid = 0;
    let highestBidder = null;
    
    Object.entries(bids).forEach(([player, bid]) => {
      if (bid > highestBid) {
        highestBid = bid;
        highestBidder = player;
      }
    });
    
    setCurrentBidder(highestBidder);
    setBidding(false);
  };

  // Start the timer for the highest bidder
  const startTimer = () => {
    setTimer(0);
    setTimerRunning(true);
  };

  // Award points based on bid success
  const awardBidPoints = (success) => {
    if (success && currentBidder) {
      // Award points based on bid amount
      const bidAmount = bids[currentBidder];
      const awardedPoints = Math.max(1, Math.floor(bidAmount / 10));
      updateScore(currentBidder, awardedPoints);
      setWinner(currentBidder);
      setPoints(awardedPoints);
    } else if (!success && currentBidder) {
      // Award 1 point to the other player
      const otherPlayer = players.find(player => player !== currentBidder);
      if (otherPlayer) {
        updateScore(otherPlayer, 1);
        setWinner(otherPlayer);
        setPoints(1);
      }
    }
    setRoundComplete(true);
  };

  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="game game2 full-screen">
      <h2>Game 2: Bidding Game</h2>
      <h3>Round {currentRound}/5</h3>
      
      <div className="question-container">
        <h4>Question:</h4>
        <p className="question">{currentQuestion.question}</p>
        
        <div className="context-info">
          <h4>Context (for referee):</h4>
          <p>{currentQuestion.context}</p>
        </div>
      </div>
      
      {bidding ? (
        <div className="bidding-phase">
          <h4>Bidding Phase</h4>
          <p>Players take turns bidding how many answers they can provide.</p>
          
          <div className="bid-controls">
            {players.map((player, index) => (
              <div key={index} className="player-bid">
                <h5>{player}</h5>
                <p>Current Bid: {bids[player] || 0}</p>
                <div className="bid-buttons">
                  <button onClick={() => handleBid(player, (bids[player] || 0) + 1)}>
                    Bid {(bids[player] || 0) + 1}
                  </button>
                  <button onClick={() => handleBid(player, (bids[player] || 0) + 5)}>
                    Bid {(bids[player] || 0) + 5}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <button onClick={endBidding} className="end-bidding-button">
            End Bidding
          </button>
        </div>
      ) : roundComplete ? (
        <div className="round-result">
          <h4>{winner} wins this round!</h4>
          <p>{points} point{points !== 1 ? 's' : ''} awarded</p>
        </div>
      ) : (
        <div className="answering-phase">
          <h4>Answering Phase</h4>
          <p>Highest Bidder: {currentBidder}</p>
          <p>Bid: {bids[currentBidder] || 0}</p>
          
          {timerRunning ? (
            <div className="timer">
              <p>Time Remaining: {30 - timer} seconds</p>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${(timer / 30) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <button onClick={startTimer} className="start-timer-button">
              Start 30-Second Timer
            </button>
          )}
          
          <div className="referee-controls">
            <h5>Did {currentBidder} succeed?</h5>
            <div className="bid-result-buttons">
              <button 
                onClick={() => awardBidPoints(true)}
                className="success-button"
              >
                Yes - Bid Successful
              </button>
              <button 
                onClick={() => awardBidPoints(false)}
                className="failure-button"
              >
                No - Bid Failed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game2;
