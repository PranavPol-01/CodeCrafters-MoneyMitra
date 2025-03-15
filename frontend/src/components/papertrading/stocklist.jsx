import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StockList = ({ onSelectStock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stocks, setStocks] = useState([]); // State to store stocks from the server
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch stocks from the server on component mount
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('/api/stocks'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch stocks');
        }
        const data = await response.json();
        setStocks(data.tickers); // Assuming the server returns { tickers: [...] }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  // Filter stocks based on search term
  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <p>Loading stocks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <Input
        placeholder="Search stocks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <ScrollArea className="h-96">
        {filteredStocks.map((stock) => (
          <div
            key={stock.symbol}
            className="p-2 hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelectStock(stock)}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{stock.symbol}</p>
                <p className="text-sm text-gray-500">{stock.name}</p>
              </div>
              {/* <div className="flex items-center gap-2">
                <p className="font-medium">${stock.price.toFixed(2)}</p>
                <div
                  className={`flex items-center text-sm ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stock.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  {stock.changePercent.toFixed(2)}%
                </div>
              </div> */}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default StockList;