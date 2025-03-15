import React from 'react';

const Portfolio = ({ portfolio, stocks }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
      <h2 className="text-xl font-bold mb-4">Portfolio</h2>
      {portfolio.length === 0 ? (
        <p className="text-gray-500">Your portfolio is empty.</p>
      ) : (
        portfolio.map((item) => {
          const stock = stocks.find((s) => s.symbol === item.symbol);
          return (
            <div key={item.symbol} className="flex justify-between items-center mb-2">
              <div>
                <p className="font-medium">{item.symbol}</p>
                <p className="text-sm text-gray-500">{item.quantity} shares</p>
              </div>
              <p className="font-medium">${(stock.price * item.quantity).toFixed(2)}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Portfolio;