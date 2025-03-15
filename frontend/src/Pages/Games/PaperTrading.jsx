import React, { useState, useEffect } from 'react';
import Header from '@/components/papertrading/header';
import StockList from '@/components/papertrading/stocklist';
import StockChart from '@/components/papertrading/stockchart';
import TradingInterface from '@/components/papertrading/tradinginterface';
import Portfolio from '@/components/papertrading/portfolio';

const PaperTrading = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [balance, setBalance] = useState(100000);
  const [stocks, setStocks] = useState([]); // List of tickers
  const [historicalData, setHistoricalData] = useState(null); // Historical data for selected stock

  // Fetch the list of tickers on component mount
  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await fetch('/api/stocks');
        const data = await response.json();
        setStocks(data.tickers);
      } catch (error) {
        console.error('Error fetching tickers:', error);
      }
    };

    fetchTickers();
  }, []);

  // Fetch historical data when a stock is selected
  useEffect(() => {
    if (selectedStock) {
      const fetchHistoricalData = async () => {
        try {
          const response = await fetch('/api/stock/historical', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ticker: selectedStock.symbol }),
          });
          const data = await response.json();
          if (data.file_content) {
            // Decode the Base64-encoded CSV content
            const decodedData = atob(data.file_content);
            setHistoricalData(decodedData);
          }
        } catch (error) {
          console.error('Error fetching historical data:', error);
        }
      };

      fetchHistoricalData();
    }
  }, [selectedStock]);

  const handleTrade = (symbol, action, quantity, price) => {
    const totalCost = quantity * price;
    if (action === 'buy' && totalCost > balance) {
      alert('Insufficient balance!');
      return;
    }

    const updatedPortfolio = [...portfolio];
    const stockIndex = updatedPortfolio.findIndex((item) => item.symbol === symbol);

    if (action === 'buy') {
      if (stockIndex !== -1) {
        updatedPortfolio[stockIndex].quantity += quantity;
      } else {
        updatedPortfolio.push({ symbol, quantity, avgPrice: price });
      }
      setBalance(balance - totalCost);
    } else if (action === 'sell') {
      if (stockIndex !== -1 && updatedPortfolio[stockIndex].quantity >= quantity) {
        updatedPortfolio[stockIndex].quantity -= quantity;
        if (updatedPortfolio[stockIndex].quantity === 0) {
          updatedPortfolio.splice(stockIndex, 1);
        }
        setBalance(balance + totalCost);
      } else {
        alert('Not enough shares to sell!');
        return;
      }
    }

    setPortfolio(updatedPortfolio);
  };

  return (
    <div className="container mx-auto p-4">
      <Header balance={balance} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <StockChart stock={selectedStock} historicalData={historicalData} />
          <TradingInterface stock={selectedStock} onTrade={handleTrade} />
        </div>
        <div className="lg:col-span-1">
          <StockList stocks={stocks} onSelectStock={setSelectedStock} />
          <Portfolio portfolio={portfolio} stocks={stocks} />
        </div>
      </div>
    </div>
  );
};

export default PaperTrading;