import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const PredictMarket = () => {
  const [points, setPoints] = useState(100);
  const [prediction, setPrediction] = useState(null);
  const [result, setResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState([
    { name: "Alice", score: 250 },
    { name: "Bob", score: 200 },
    { name: "Charlie", score: 150 },
  ]);

  // Fake stock trend data (memoized for stability)
  const stockTrend = useMemo(() => ({
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Stock Price",
        data: [150, 155, 152, 160, 158],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  }), []);

  // Randomly determine if the stock goes up or down
  const generateMarketResult = () => (Math.random() > 0.5 ? "Up" : "Down");

  const handlePrediction = (choice) => {
    setPrediction(choice);
    const marketResult = generateMarketResult();

    if (marketResult === choice) {
      setPoints(points + 20);
      setResult("✅ Correct! You earned 20 points.");
    } else {
      setPoints(points - 10);
      setResult("❌ Wrong! You lost 10 points.");
    }
  };

  return (
    <div className="bg-black min-h-screen p-10 text-white flex justify-center gap-10">
      {/* Game Section */}
      <Card className="p-5 w-2/3 bg-gray-900 rounded-2xl shadow-lg">
        <h1 className="text-3xl text-white font-bold mb-5 text-center">📈 Predict the Market Game</h1>

        <h2 className="text-xl font-semibold mb-3 text-white">💰 Your Points: {points}</h2>

        {/* Stock Graph */}
        <h2 className="text-lg font-semibold text-white">📊 Historical Stock Trend</h2>
        <div className="w-full h-64 mb-5">
          <Line data={stockTrend} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        {/* Prediction Buttons */}
        <h2 className="text-lg font-semibold text-white">📢 Predict: Will the stock go up or down?</h2>
        <div className="flex justify-center gap-4 mt-4">
          <Button className="bg-green-500 text-white px-5 py-2 rounded-xl" onClick={() => handlePrediction("Up")}>
            📈 Up
          </Button>
          <Button className="bg-red-500 text-white px-5 py-2 rounded-xl" onClick={() => handlePrediction("Down")}>
            📉 Down
          </Button>
        </div>

        {/* Result Message */}
        {result && <p className="mt-4 text-white text-lg font-semibold text-center">{result}</p>}
      </Card>

      {/* Leaderboard Section */}
      <Card className="p-5 w-1/3 bg-gray-900 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-3 text-center">🏆 Leaderboard</h2>
        {leaderboard.map((player, index) => (
          <div key={index} className="flex justify-between p-3 border-b border-gray-700">
            <span className="text-white">{index + 1}. {player.name}</span>
            <span className="text-white">{player.score} pts</span>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default PredictMarket;
