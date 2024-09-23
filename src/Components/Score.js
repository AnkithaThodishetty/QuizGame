import React from 'react';

function Score({ score, totalQuestions }) {
  return (
    <div className="score-container">
      <h2 className="score-title">Quiz Completed!</h2>
      <p className="score-text">Your Score: {score} / {totalQuestions}</p>
      <button
        className="restart-button"
        onClick={() => window.location.reload()}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default Score;
