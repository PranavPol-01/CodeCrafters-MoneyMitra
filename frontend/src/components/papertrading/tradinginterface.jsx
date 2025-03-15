import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TradingInterface = ({ stock, onTrade }) => {
  const [action, setAction] = useState('buy');
  const [quantity, setQuantity] = useState(1);

  const handleTrade = () => {
    if (!stock || !quantity || quantity <= 0) return;
    onTrade(stock.symbol, action, quantity, stock.price);
  };

  if (!stock) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <p className="text-gray-500">Select a stock to trade</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
      <div className="flex gap-4">
        <Select value={action} onValueChange={setAction}>
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buy">Buy</SelectItem>
            <SelectItem value="sell">Sell</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-24"
        />
        <Button onClick={handleTrade}>Place Order</Button>
      </div>
    </div>
  );
};

export default TradingInterface;