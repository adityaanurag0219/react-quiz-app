import React from "react";

function Result({ score, total, answers, onRestart }) {
  return (
    <div className="completion-container">
      <h2 className="completion-title">🎉 Quiz Complete! 🎉</h2>

      {/* Final Score */}
      <div className="final-score">
        <h3>Your Final Score</h3>
        <div className="score-display-large">
          {score} / {total} ({Math.round((score / total) * 100)}%)
        </div>
      </div>

      {/* Performance message */}
      <p className="completion-message">
        {score / total >= 0.8
          ? "Excellent! You're a quiz master! 🎉"
          : score / total >= 0.6
          ? "Good job! 👍"
          : score / total >= 0.4
          ? "Not bad! Keep practicing 💪"
          : "Keep studying! 📚"}
      </p>

      {/* Answers Summary */}
      <h3 style={{ marginBottom: "15px" }}>Your Answers:</h3>
      <div className="answers-summary">
        {answers.map((a, i) => {
          const isCorrect = a.selected === a.correct;
          return (
            <div
              key={i}
              className={`answer-card ${isCorrect ? "correct" : "incorrect"}`}
            >
              <p className="question-text">
                <strong>Q{i + 1}:</strong> {a.question}
              </p>
              <p>
                Your Answer:{" "}
                <span
                  className={`user-answer ${isCorrect ? "right" : "wrong"}`}
                >
                  {a.selected || "No Answer"}
                </span>
              </p>
              {!isCorrect && (
                <p>
                  Correct Answer:{" "}
                  <span className="correct-answer">{a.correct}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Restart Button */}
      <button className="restart-button" onClick={onRestart}>
        Restart Quiz
      </button>
    </div>
  );
}

export default Result;
