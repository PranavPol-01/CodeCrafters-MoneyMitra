import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StockList = ({ stocks, onSelectStock }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <div className="flex items-center gap-2">
                <p className="font-medium">${stock.price.toFixed(2)}</p>
                <div
                  className={`flex items-center text-sm ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stock.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  {stock.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default StockList;