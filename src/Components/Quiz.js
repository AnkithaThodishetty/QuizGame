import React, { useState, useEffect } from 'react';
import './Quiz.css'; 

const questions = [
  { question: "What is the purpose of the useState hook in React?", options: [ "To perform side effects","To manage local state in a function component", "To manage routing", "To handle asynchronous data"], answer: "To manage local state in a function component" },
  { question: "What is JSX?", options: ["JavaScript XML", "JavaScript Extension", "JavaScript Extra", "Java Syntax"], answer: "JavaScript XML" },
  { question: "What does the 'key' prop do in React?", options: [ "Adds a unique ID to the component", "Sets a CSS class for the component",'Helps React identify which items have changed' ,"Updates the component's state"], answer: "Helps React identify which items have changed" },
  { question: "What is the use of 'useEffect' hook?", options: ["To manage side effects in function components", "To manage state", "To handle routing", "To manipulate the DOM"], answer: "To manage side effects in function components" },
  { question: "What is React Context?", options: [ "A state management library", "A routing library","A way to pass data through the component tree without prop drilling", "A testing utility"], answer: "A way to pass data through the component tree without prop drilling" },
  { question: "What are controlled components in React?", options: ["Components whose state is controlled by React", "Components that use local state", "Components that use hooks", "Components that are not re-rendered"], answer: "Components whose state is controlled by React" },
  { question: "What is React's virtual DOM?", options: ["A component that manages routing", "A state management tool", "A way to handle side effects","A lightweight copy of the real DOM"], answer: "A lightweight copy of the real DOM" },
 
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20); 
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    if (timeLeft === 0 && !isQuizFinished) {
      handleAnswer(null); 
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (answer) => {
    if (isQuizFinished) return;

    const isCorrect = answer === questions[currentQuestionIndex].answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setCorrectAnswers(prev => prev + 1);
    }
    setSelectedAnswer(answer);
    setIsAnswerCorrect(isCorrect);
    setAttemptedQuestions(prev => prev + 1);

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
      setTimeLeft(20); 

      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex >= questions.length) {
        setIsQuizFinished(true);
      } else {
        setCurrentQuestionIndex(nextIndex);
      }
    }, 1000); 
  };

  const nextQuestion = () => {
    if (isQuizFinished) return;
    setCurrentQuestionIndex(prevIndex => Math.min(prevIndex + 1, questions.length - 1));
    setTimeLeft(20); 
  };

  const previousQuestion = () => {
    if (isQuizFinished) return;
    setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
    setTimeLeft(20); 
  };

  const { question, options } = questions[currentQuestionIndex];

  if (isQuizFinished) {
    const wrongAnswers = attemptedQuestions - correctAnswers;
    return (
      <div className="quiz-container">
       
        <div className="score-container">
          <h2 className="score">Your Score: {score} / {questions.length}
          <p>Total Questions: {questions.length}</p>
          <p>Questions Attempted: {attemptedQuestions}</p>
          <p>Correct Answers: {correctAnswers}</p>
          <p>Wrong Answers: {wrongAnswers}</p>
          </h2> 
        </div>
        <div className="background-image"></div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      
        <div className="question-container">
        <div className="timer">Time Left: {timeLeft}s
            
        </div>
        
        <h2 className="question">{question}</h2>
        <div className="options">
          {options.map((option, index) => (
            <button
              key={index}
              className={`option ${selectedAnswer === option ? (isAnswerCorrect ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="navigation-buttons">
        <button onClick={previousQuestion} disabled={currentQuestionIndex === 0 || isQuizFinished} className="nav-button">Previous</button>
        <button onClick={nextQuestion} disabled={currentQuestionIndex === questions.length - 1 || isQuizFinished} className="nav-button">Next</button>
      </div>
      <div className="background-image"></div>
    </div>
  );
};

export default Quiz;
