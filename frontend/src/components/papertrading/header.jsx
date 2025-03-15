import React from 'react';
import { DollarSign } from 'lucide-react';

const Header = ({ balance }) => {
  return (
    <header className="bg-white shadow-sm p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Paper Trading Demo</h1>
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-gray-600" />
          <span className="text-lg font-medium text-gray-900">${balance.toLocaleString()}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;