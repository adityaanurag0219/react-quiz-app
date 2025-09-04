import React, { useState, useEffect } from "react";
import Question from "./question";
import ProgressBar from "./ProgressBar";
import Result from "./Result";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch questions from API
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data = await res.json();
        if (data.response_code !== 0) throw new Error("No questions available");

        const transformed = data.results.map((q) => {
          const allAnswers = [...q.incorrect_answers, q.correct_answer];
          const shuffled = allAnswers.sort(() => Math.random() - 0.5);
          return {
            question: decodeHtml(q.question),
            options: shuffled,
            correctAnswer: decodeHtml(q.correct_answer),
          };
        });

        setQuestions(transformed);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  function decodeHtml(text) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  function handleAnswerSubmit() {
    const currentQ = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    if (isCorrect) setScore((prev) => prev + 1);

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQ.question,
        selected: selectedAnswer,
        correct: currentQ.correctAnswer,
      },
    ]);

    setSelectedAnswer(null);

    if (currentIndex === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function restartQuiz() {
    setCurrentIndex(0);
    setScore(0);
    setUserAnswers([]);
    setShowResult(false);
  }

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading Quiz Questions...</h2>
        <p>Please wait while we fetch fresh questions for you!</p>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>❌ Error Loading Quiz</h2>
        <p>{error}</p>
        <button className="retry-button" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  if (showResult) {
    return <Result score={score} total={questions.length} answers={userAnswers} onRestart={restartQuiz} />;
  }

  return (
    <>
      <div className="quiz-header">
        <h1 className="quiz-title">Interactive Quiz</h1>
        <p className="quiz-subtitle">Test your knowledge with our interactive quiz!</p>
      </div>

      <ProgressBar current={currentIndex + 1} total={questions.length} />

      <Question
        question={questions[currentIndex]}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />

      <button
        className="submit-button"
        onClick={handleAnswerSubmit}
        disabled={!selectedAnswer}
      >
        {currentIndex === questions.length - 1 ? "Finish Quiz" : "Submit Answer"}
      </button>

      <div className="score-display">
        Score: {score} / {questions.length}
      </div>
    </>
  );
}

export default Quiz;
