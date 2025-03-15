import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const leaderboardData = [
  { name: "Alice", score: 50 },
  { name: "Bob", score: 40 },
  { name: "Charlie", score: 30 },
];

const InvestmentQuiz = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [points, setPoints] = useState(0);
  const [explanation, setExplanation] = useState(null);

  const questions = [
    {
      question: "📉 What does a 'bull market' mean?",
      options: ["A declining stock market", "A rising stock market", "A stable market", "Only tech stocks rising"],
      correct: 1,
      explanation: "A bull market means prices are generally rising, indicating investor confidence. 📈",
    },
    {
      question: "💰 What is 'diversification' in investing?",
      options: ["Investing in multiple assets", "Buying only one type of stock", "Holding cash", "Short selling"],
      correct: 0,
      explanation: "Diversification spreads risk by investing in different assets. 🔄",
    },
    {
      question: "📊 What does 'P/E ratio' stand for?",
      options: ["Profit/Earnings", "Price/Earnings", "Potential/Evaluation", "Portfolio Equity"],
      correct: 1,
      explanation: "The Price-to-Earnings (P/E) ratio helps assess a company's valuation. 💹",
    },
  ];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    if (index === questions[questionIndex].correct) {
      setPoints(points + 10);
    }
    setExplanation(questions[questionIndex].explanation);
    
    setTimeout(() => {
      setSelectedAnswer(null);
      setExplanation(null);
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      }
    }, 2000);
  };

  return (
    <div className="bg-black min-h-screen p-10 text-white flex justify-center gap-10">
      {/* Quiz Section */}
      <div className="flex flex-col items-center w-2/3">
        <h1 className="text-3xl font-bold mb-5">🎲 Investment Trivia Challenge</h1>
        
        <Card className="p-6 w-full max-w-3xl bg-gray-900 rounded-2xl shadow-lg">
          <div className="flex justify-between mb-3 text-lg font-semibold">
            <span className="text-white">📌 Question {questionIndex + 1} / {questions.length}</span>
            <span className="text-yellow-400">🏆 Points: {points}</span>
          </div>
          
          <h2 className="text-xl font-semibold mb-4 text-white">{questions[questionIndex].question}</h2>
          
          <div className="flex flex-col gap-3">
            {questions[questionIndex].options.map((option, idx) => (
              <Button
                key={idx}
                className={`w-full py-3 px-5 rounded-xl text-white text-lg transition-all duration-300 ${
                  selectedAnswer === idx
                    ? idx === questions[questionIndex].correct
                      ? "bg-green-500 scale-105"
                      : "bg-red-500"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </Button>
            ))}
          </div>
          
          {explanation && (
            <p className="mt-4 text-lg text-yellow-400 text-center">💡 {explanation}</p>
          )}
        </Card>
      </div>

      {/* Leaderboard */}
      <div className="w-1/3">
        <Card className="p-5 bg-gray-800 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-white text-center mb-4">🏆 Leaderboard</h2>
          <ul className="text-white text-lg">
            {leaderboardData.map((entry, idx) => (
              <li key={idx} className="flex justify-between p-2 bg-gray-700 rounded-lg my-1">
                <span>{entry.name}</span>
                <span>{entry.score} pts</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default InvestmentQuiz;
