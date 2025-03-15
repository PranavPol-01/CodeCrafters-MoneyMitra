import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const PaperTrading = () => {
  const [balance, setBalance] = useState(100000);
  const [portfolio, setPortfolio] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const stockData = [
    { symbol: "AAPL", price: 160, close: 158, high: 165, low: 155, open: 159, volume: 50000, date: "2024-03-15", history: [150, 155, 160, 162, 158] },
    { symbol: "TSLA", price: 720, close: 710, high: 740, low: 700, open: 715, volume: 40000, date: "2024-03-15", history: [690, 700, 710, 720, 730] },
    { symbol: "MSFT", price: 310, close: 305, high: 320, low: 300, open: 308, volume: 35000, date: "2024-03-15", history: [290, 295, 300, 310, 315] },
    { symbol: "GOOG", price: 2800, close: 2750, high: 2850, low: 2700, open: 2780, volume: 45000, date: "2024-03-15", history: [2700, 2725, 2750, 2800, 2850] },
  ];

  const handleStockSelection = (symbol, shares) => {
    if (shares > 0) {
      setSelectedStocks({ ...selectedStocks, [symbol]: shares });
    } else {
      const updatedStocks = { ...selectedStocks };
      delete updatedStocks[symbol];
      setSelectedStocks(updatedStocks);
    }
  };

  const handleBuyClick = () => {
    const totalCost = Object.keys(selectedStocks).reduce(
      (sum, symbol) => sum + stockData.find(stock => stock.symbol === symbol).price * selectedStocks[symbol],
      0
    );

    if (totalCost > balance) {
      alert("Insufficient balance! 💰");
      return;
    }

    setShowConfirm(true);
  };

  const confirmBuy = () => {
    const totalCost = Object.keys(selectedStocks).reduce(
      (sum, symbol) => sum + stockData.find(stock => stock.symbol === symbol).price * selectedStocks[symbol],
      0
    );

    setBalance(balance - totalCost);

    setPortfolio(prevPortfolio => {
      const updatedPortfolio = [...prevPortfolio];

      Object.keys(selectedStocks).forEach(symbol => {
        const existingStockIndex = updatedPortfolio.findIndex(stock => stock.symbol === symbol);
        if (existingStockIndex !== -1) {
          updatedPortfolio[existingStockIndex].shares += selectedStocks[symbol];
        } else {
          updatedPortfolio.push({ symbol, shares: selectedStocks[symbol], avgPrice: stockData.find(stock => stock.symbol === symbol).price });
        }
      });

      return updatedPortfolio;
    });

    setSelectedStocks({});
    setShowConfirm(false);
  };

  return (
    <div className="bg-black min-h-screen p-10 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5 text-white">📈 Virtual Stock Market Game</h1>

      <div className="grid grid-cols-3 gap-4 w-full max-w-7xl">
        <Card className="p-5 col-span-2 bg-gray-900 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-white">💰 Balance: ${balance.toLocaleString()}</h2>
          <h2 className="text-lg font-semibold text-white mb-2">📜 Available Stocks</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-800 rounded-lg text-white">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-2">Symbol</th>
                  <th className="p-2">Open</th>
                  <th className="p-2">High</th>
                  <th className="p-2">Low</th>
                  <th className="p-2">Close</th>
                  <th className="p-2">Volume</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Select Shares</th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((stock, index) => (
                  <tr key={index} className="border-b border-gray-700 text-center">
                    <td className="p-2">{stock.symbol}</td>
                    <td className="p-2">${stock.open}</td>
                    <td className="p-2">${stock.high}</td>
                    <td className="p-2">${stock.low}</td>
                    <td className="p-2">${stock.close}</td>
                    <td className="p-2">{stock.volume.toLocaleString()}</td>
                    <td className="p-2">{stock.date}</td>
                    <td className="p-2">
                      <input 
                        type="number" 
                        min="0" 
                        className="w-16 bg-gray-700 text-white rounded p-1"
                        value={selectedStocks[stock.symbol] || ""}
                        onChange={(e) => handleStockSelection(stock.symbol, parseInt(e.target.value) || 0)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex justify-center">
            <Button className="bg-teal-500 text-black px-5 py-2 rounded-xl" onClick={handleBuyClick}>Confirm Buy</Button>
          </div>
        </Card>

        
<div className="bg-gray-900 p-5 rounded-2xl shadow-lg w-full max-w-7xl my-5">
  <h2 className="text-xl font-semibold text-white">📌 Your Portfolio</h2>
  {portfolio.length > 0 ? (
    <table className="w-full bg-gray-800 rounded-lg text-white mt-3">
      <thead>
        <tr className="border-b border-gray-700">
          <th className="p-2">Symbol</th>
          <th className="p-2">Shares</th>
          <th className="p-2">Avg Price</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.map((stock, index) => (
          <tr key={index} className="border-b border-gray-700 text-center">
            <td className="p-2">{stock.symbol}</td>
            <td className="p-2">{stock.shares}</td>
            <td className="p-2">${stock.avgPrice.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-gray-400 mt-3">No stocks in portfolio yet.</p>
  )}
</div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60">
          <div className="bg-gray-800 p-5 rounded-xl text-center">
            <h2 className="text-lg font-semibold text-white">Confirm Purchase?</h2>
            <div className="mt-3 flex justify-center gap-5">
              <Button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={confirmBuy}>Yes</Button>
              <Button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => setShowConfirm(false)}>No</Button>
            </div>
          </div>
        </div>
      )}


<Card className="p-5 bg-gray-900 rounded-2xl shadow-lg w-full max-w-7xl my-5">
  <h2 className="text-xl font-semibold text-white">📊 Stock Price Trends</h2>
  <div className="w-full h-64">
    <Line
      data={{
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
        datasets: [
          {
            label: "AAPL Stock Price",
            data: stockData.find((stock) => stock.symbol === "AAPL").history,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.4,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: false },
        },
      }}
    />
  </div>
</Card>


    </div>
  );
};

export default PaperTrading;
