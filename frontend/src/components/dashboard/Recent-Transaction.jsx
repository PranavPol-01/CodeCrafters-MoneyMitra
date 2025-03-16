import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [livePricesLoaded, setLivePricesLoaded] = useState(false);

  // First effect to fetch initial transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Get UID from sessionStorage
        const userId = sessionStorage.getItem("uid");

        if (!userId) {
          throw new Error("User ID not found in sessionStorage");
        }

        // Fetch transactions from the API
        const transactionsResponse = await fetch(`/api/transactions?uid=${userId}`);
        if (!transactionsResponse.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const transactionsData = await transactionsResponse.json();
        setTransactions(transactionsData.transactions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Separate effect to fetch live prices ONCE after transactions are loaded
  useEffect(() => {
    if (transactions.length === 0 || livePricesLoaded) return;

    const fetchLivePrices = async () => {
      try {
        // Extract unique stock symbols from transactions
        const uniqueSymbols = [
          ...new Set(transactions.map((t) => t.stock_symbol + ".NS")),
        ];

        // Fetch live stock prices
        const response = await fetch("/api/get_stock_prices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stock_symbols: uniqueSymbols }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch live stock prices");
        }

        const data = await response.json();
        const livePrices = data.stock_prices;

        // Update transactions with live price and percentage change
        const updatedTransactions = transactions.map((transaction) => {
          const livePrice = livePrices[transaction.stock_symbol + ".NS"];
          const changePercent = livePrice
            ? (
                ((livePrice - transaction.price_per_share) /
                  transaction.price_per_share) *
                100
              ).toFixed(2)
            : "N/A";

          return {
            ...transaction,
            livePrice,
            changePercent,
          };
        });

        setTransactions(updatedTransactions);
        setLivePricesLoaded(true); // Mark that we've loaded prices
      } catch (err) {
        console.error("Error fetching live stock prices:", err);
        setLivePricesLoaded(true); // Mark as loaded even on error to prevent retry loop
      }
    };

    fetchLivePrices();
  }, [transactions, livePricesLoaded]);

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Map the API response to the expected structure
  const mappedTransactions = transactions.map((transaction) => ({
    id: transaction.stock_symbol + transaction.timestamp, // Unique ID for each transaction
    asset: transaction.stock_symbol,
    type: transaction.type,
    amount: `Rs ${transaction.total_cost.toFixed(2)}`,
    shares: transaction.quantity.toFixed(2),
    date: new Date(transaction.timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    status: "completed",
    change: `${transaction.changePercent || '0.00'}%`,
    isPositive: parseFloat(transaction.changePercent || 0) >= 0,
  }));

  return (
    <table className="w-full border-collapse border border-gray-300 text-left">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-3 border border-gray-300">Asset</th>
          <th className="p-3 border border-gray-300">Total Investment</th>
          <th className="p-3 border border-gray-300">Date</th>
          <th className="p-3 border border-gray-300 text-right">Change</th>
        </tr>
      </thead>
      <tbody>
        {mappedTransactions.map((transaction) => (
          <tr key={transaction.id} className="border border-gray-300">
            <td className="p-3 border border-gray-300 font-medium">
              <div className="flex flex-col">
                {transaction.asset}
                <span
                  className={`inline-flex items-center mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                    transaction.type === "buy"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.type === "buy" ? (
                    <ArrowDown className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowUp className="mr-1 h-3 w-3" />
                  )}
                  {transaction.type}
                </span>
              </div>
            </td>
            <td className="p-3 border border-gray-300">
              <div className="flex flex-col">
                {transaction.amount}
                <span className="text-xs text-gray-500">
                  {transaction.shares} {transaction.shares === "1.00" ? "share" : "shares"}
                </span>
              </div>
            </td>
            <td className="p-3 border border-gray-300">{transaction.date}</td>
            <td
              className={`p-3 border border-gray-300 text-right font-medium ${
                transaction.isPositive ? "text-green-600" : "text-red-600"
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