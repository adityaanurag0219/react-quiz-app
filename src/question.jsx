import React from "react";

function Question({ question, selectedAnswer, setSelectedAnswer }) {
  return (
    <div className="question-container">
      <p className="question-text">{question.question}</p>
      <div className="answer-options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`answer-option ${selectedAnswer === option ? "selected" : ""}`}
            onClick={() => setSelectedAnswer(option)}
          >
            {String.fromCharCode(65 + index)}) {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
