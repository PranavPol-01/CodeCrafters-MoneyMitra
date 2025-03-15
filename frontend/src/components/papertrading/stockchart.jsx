import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { generateHistoricalData } from '@/utils/generatehistoricaldata';

const StockChart = ({ stock }) => {
  const [timeframe, setTimeframe] = useState('1M');
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    if (stock) {
      const data = generateHistoricalData(timeframe, stock.price);
      setHistoricalData(data);
    }
  }, [stock, timeframe]);

  if (!stock) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm h-96 flex items-center justify-center">
        <p className="text-gray-500">Select a stock to view chart</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{stock.symbol} - {stock.name}</h2>
        <div className="flex gap-2">
          {['1D', '1W', '1M', '3M', '1Y'].map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historicalData}>
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#3b82f6" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;