import React, { useState, useEffect } from "react";
import axios from "axios";

interface Question {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const TriviaGame: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // useEffect(() => {
  //   fetchQuestion();
  // }, []);

  const fetchQuestion = async () => {
    const response = await axios.get("https://opentdb.com/api.php?amount=1");
    const data = response.data.results[0];
    const formattedQuestion: Question = {
      category: data.category,
      question: data.question,
      correct_answer: data.correct_answer,
      incorrect_answers: data.incorrect_answers
    };
    setQuestion(formattedQuestion);
    setIsCorrect(null);
  };
  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (answer.toLowerCase() === question?.correct_answer.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setAnswer("");
    fetchQuestion();
  };

  return (
    <div>
      {question && (
        <>
          <h2>{question.category}</h2>
          <h3>{question.question}</h3>
          <input type="text" value={answer} onChange={handleAnswerChange} />
          <button onClick={handleSubmit}>Submit</button>
          {isCorrect !== null && <p>{isCorrect ? "Correct!" : "Incorrect!"}</p>}
        </>
      )}
    </div>
  );
};

export default TriviaGame;
