import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

const transactions = [
  {
    id: "1",
    asset: "Tesla Inc.",
    type: "buy",
    amount: "$1,250.00",
    shares: "5",
    date: "Mar 12, 2025",
    status: "completed",
    change: "+2.4%",
  },
  {
    id: "2",
    asset: "Bitcoin",
    type: "sell",
    amount: "$3,400.00",
    shares: "0.05",
    date: "Mar 10, 2025",
    status: "completed",
    change: "+5.1%",
  },
  {
    id: "3",
    asset: "Apple Inc.",
    type: "buy",
    amount: "$2,100.00",
    shares: "12",
    date: "Mar 8, 2025",
    status: "completed",
    change: "-0.8%",
  },
  {
    id: "4",
    asset: "S&P 500 ETF",
    type: "buy",
    amount: "$500.00",
    shares: "2",
    date: "Mar 5, 2025",
    status: "completed",
    change: "+1.2%",
  },
  {
    id: "5",
    asset: "Gold ETF",
    type: "buy",
    amount: "$750.00",
    shares: "8",
    date: "Mar 1, 2025",
    status: "completed",
    change: "+0.5%",
  },
];

const RecentTransactions = () => {
  return (
    <table className="w-full border-collapse border border-gray-300 text-left">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-3 border border-gray-300">Asset</th>
          <th className="p-3 border border-gray-300">Amount</th>
          <th className="p-3 border border-gray-300">Date</th>
          <th className="p-3 border border-gray-300 text-right">Change</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id} className="border border-gray-300">
            <td className="p-3 border border-gray-300 font-medium">
              <div className="flex flex-col">
                {transaction.asset}
                <span
                  className={`inline-flex items-center mt-1 px-2 py-1 text-xs font-medium rounded-full ${
    transaction.type === "buy" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }`}
                >
                  {transaction.type === "buy" ? <ArrowDown className="mr-1 h-3 w-3" /> : <ArrowUp className="mr-1 h-3 w-3" />}
                  {transaction.type}
                </span>
              </div>
            </td>
            <td className="p-3 border border-gray-300">
              <div className="flex flex-col">
                {transaction.amount}
                <span className="text-xs text-gray-500">
                  {transaction.shares} {transaction.shares === "1" ? "share" : "shares"}
                </span>
              </div>
            </td>
            <td className="p-3 border border-gray-300">{transaction.date}</td>
            <td className={`p-3 border border-gray-300 text-right font-medium ${
    transaction.change.startsWith("+") ? "text-green-600" : "text-red-600"
  }`}
            >
              {transaction.change}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentTransactions;