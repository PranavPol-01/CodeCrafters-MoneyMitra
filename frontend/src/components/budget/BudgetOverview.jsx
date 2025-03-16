// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import {  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";


// const monthlyData = [
//   { month: "Jan", income: 4800, expenses: 3600 },
//   { month: "Feb", income: 4900, expenses: 3700 },
//   { month: "Mar", income: 5100, expenses: 3800 },
//   { month: "Apr", income: 5000, expenses: 3750 },
//   { month: "May", income: 5200, expenses: 3900 },
//   { month: "Jun", income: 5150, expenses: 3850 },
//   { month: "Jul", income: 5100, expenses: 3800 },
//   { month: "Aug", income: 5050, expenses: 3750 },
//   { month: "Sep", income: 5200, expenses: 3900 },
//   { month: "Oct", income: 5150, expenses: 3850 },
//   { month: "Nov", income: 5100, expenses: 3800 },
//   { month: "Dec", income: 5240, expenses: 3850 },
// ];

// const budgetProgress = [
//   { category: "Housing", allocated: 1500, spent: 1450, percentage: 97 },
//   { category: "Food", allocated: 800, spent: 750, percentage: 94 },
//   { category: "Transportation", allocated: 400, spent: 380, percentage: 95 },
//   { category: "Utilities", allocated: 350, spent: 320, percentage: 91 },
//   { category: "Entertainment", allocated: 300, spent: 350, percentage: 117 },
//   { category: "Healthcare", allocated: 200, spent: 150, percentage: 75 },
//   { category: "Shopping", allocated: 300, spent: 450, percentage: 150 },
//   { category: "Savings", allocated: 1390, spent: 1390, percentage: 100 },
// ];

// const recentTransactions = [
//   { id: "1", description: "Grocery Shopping", category: "Food", amount: 125.5, date: "Mar 15, 2025" },
//   { id: "2", description: "Electric Bill", category: "Utilities", amount: 85.2, date: "Mar 14, 2025" },
//   { id: "3", description: "Netflix Subscription", category: "Entertainment", amount: 15.99, date: "Mar 12, 2025" },
//   { id: "4", description: "Gas Station", category: "Transportation", amount: 45.75, date: "Mar 10, 2025" },
//   { id: "5", description: "Restaurant Dinner", category: "Food", amount: 78.25, date: "Mar 8, 2025" },
// ];

// const BudgetOverview = () => {
//   const formatCurrency = (value) => `$${value.toLocaleString()}`;

//   return (
//     <div className="grid gap-4 md:grid-cols-7">
//       <Card className="md:col-span-7">
//         <CardHeader>
//           <CardTitle>Income vs. Expenses</CardTitle>
//           <p className="text-sm text-gray-500">Monthly comparison of your income and expenses</p>
//         </CardHeader>
//         <CardContent>
//         <ResponsiveContainer width="100%" height={300}>
//    <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="month" />
//       <YAxis tickFormatter={formatCurrency} />
//       <Legend />
//       <Bar dataKey="income" name="Income" fill="#4f46e5" />
//       <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
//    </BarChart>
// </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       <Card className="md:col-span-4">
//         <CardHeader>
//           <CardTitle>Budget Progress</CardTitle>
//           <p className="text-sm text-gray-500">Track your spending against budget allocations</p>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {budgetProgress.map((item) => (
//               <div key={item.category} className="space-y-1">
//                 <div className="flex justify-between text-sm">
//                   <span>{item.category}</span>
//                   <span className="font-medium">
//                     ${item.spent} / ${item.allocated}
//                   </span>
//                 </div>
//                 <Progress 
//                   value={item.percentage} 
//                   style={{ backgroundColor: item.percentage > 100 ? "red" : "" }} 
//                 />
//                 {item.percentage > 100 && (
//                   <div className="text-xs text-red-500">
//                     Over budget by ${(item.spent - item.allocated).toFixed(2)}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="md:col-span-3">
//         <CardHeader>
//           <CardTitle>Recent Transactions</CardTitle>
//           <p className="text-sm text-gray-500">Your latest expenses and income</p>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead className="text-right">Amount</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {recentTransactions.map((transaction) => (
//                 <TableRow key={transaction.id}>
//                   <TableCell className="font-medium">{transaction.description}</TableCell>
//                   <TableCell>
//                     <Badge variant="outline">{transaction.category}</Badge>
//                   </TableCell>
//                   <TableCell className="text-right font-medium">${transaction.amount.toFixed(2)}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default BudgetOverview;


// import React, { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

// const BudgetOverview = () => {
//   const [monthlyData, setMonthlyData] = useState([]);
//   const [budgetProgress, setBudgetProgress] = useState([]);
//   const [recentTransactions, setRecentTransactions] = useState([]);

//   const formatCurrency = (value) => `$${value.toLocaleString()}`;

//   // Fetch data from Flask backend
//   useEffect(() => {
//     const fetchData = async () => {
//       const userId = sessionStorage.getItem("uid");
//       if (!userId) return;

//       try {
//         // Fetch monthly data
//         const monthlyResponse = await fetch(`http://localhost:5000/api/monthly-data`, {
//           headers: {
//             Authorization: `Bearer ${userId}`,
//           },
//         });
//         if (!monthlyResponse.ok) throw new Error("Failed to fetch monthly data");
//         const monthlyData = await monthlyResponse.json();
//         setMonthlyData(monthlyData);

//         // Fetch budget progress
//         const budgetResponse = await fetch(`http://localhost:5000/api/budget-progress`, {
//           headers: {
//             Authorization: `Bearer ${userId}`,
//           },
//         });
//         if (!budgetResponse.ok) throw new Error("Failed to fetch budget progress");
//         const budgetProgress = await budgetResponse.json();
//         setBudgetProgress(budgetProgress);

//         // Fetch recent transactions
//         const transactionsResponse = await fetch(`http://localhost:5000/api/recent-transactions`, {
//           headers: {
//             Authorization: `Bearer ${userId}`,
//           },
//         });
//         if (!transactionsResponse.ok) throw new Error("Failed to fetch recent transactions");
//         const recentTransactions = await transactionsResponse.json();
//         setRecentTransactions(recentTransactions);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="grid gap-4 md:grid-cols-7">
//       <Card className="md:col-span-7">
//         <CardHeader>
//           <CardTitle>Income vs. Expenses</CardTitle>
//           <p className="text-sm text-gray-500">Monthly comparison of your income and expenses</p>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis tickFormatter={formatCurrency} />
//               <Legend />
//               <Bar dataKey="income" name="Income" fill="#4f46e5" />
//               <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       <Card className="md:col-span-4">
//         <CardHeader>
//           <CardTitle>Budget Progress</CardTitle>
//           <p className="text-sm text-gray-500">Track your spending against budget allocations</p>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {budgetProgress.map((item) => (
//               <div key={item.category} className="space-y-1">
//                 <div className="flex justify-between text-sm">
//                   <span>{item.category}</span>
//                   <span className="font-medium">
//                     ${item.spent} / ${item.allocated}
//                   </span>
//                 </div>
//                 <Progress
//                   value={item.percentage}
//                   style={{ backgroundColor: item.percentage > 100 ? "red" : "" }}
//                 />
//                 {item.percentage > 100 && (
//                   <div className="text-xs text-red-500">
//                     Over budget by ${(item.spent - item.allocated).toFixed(2)}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="md:col-span-3">
//         <CardHeader>
//           <CardTitle>Recent Transactions</CardTitle>
//           <p className="text-sm text-gray-500">Your latest expenses and income</p>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead className="text-right">Amount</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {recentTransactions.map((transaction) => (
//                 <TableRow key={transaction.id}>
//                   <TableCell className="font-medium">{transaction.description}</TableCell>
//                   <TableCell>
//                     <Badge variant="outline">{transaction.category}</Badge>
//                   </TableCell>
//                   <TableCell className="text-right font-medium">${transaction.amount.toFixed(2)}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default BudgetOverview;

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const BudgetOverview = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [budgetProgress, setBudgetProgress] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const formatCurrency = (value) => `$${value.toLocaleString()}`;

  // Fetch monthly data
  useEffect(() => {
    const fetchMonthlyData = async () => {
      const userId = sessionStorage.getItem("uid");
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:5000/api/monthly-data`, {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch monthly data");
        const data = await response.json();
        setMonthlyData(data);
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      }
    };

    fetchMonthlyData();
  }, []);

  // Fetch budget progress
  useEffect(() => {
    const fetchBudgetProgress = async () => {
      const userId = sessionStorage.getItem("uid");
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:5000/api/budget-progress`, {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch budget progress");
        const data = await response.json();
        setBudgetProgress(data);
      } catch (error) {
        console.error("Error fetching budget progress:", error);
      }
    };

    fetchBudgetProgress();
  }, []);

  // Fetch recent transactions
  useEffect(() => {
    const fetchRecentTransactions = async () => {
      const userId = sessionStorage.getItem("uid");
      if (!userId) return;
  
      try {
        const response = await fetch(`http://localhost:5000/api/recent-transactions`, {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch recent transactions: ${response.statusText}`);
        }
        const data = await response.json();
        setRecentTransactions(data);
      } catch (error) {
        console.error("Error fetching recent transactions:", error);
      }
    };
  
    fetchRecentTransactions();
  }, []);
  useEffect(() => {
    const fetchBudgetProgress = async () => {
      const userId = sessionStorage.getItem("uid");
      if (!userId) return;
  
      try {
        const response = await fetch(`http://localhost:5000/api/budget-progress`, {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch budget progress: ${response.statusText}`);
        }
        const data = await response.json();
        setBudgetProgress(data);
      } catch (error) {
        console.error("Error fetching budget progress:", error);
      }
    };
  
    fetchBudgetProgress();
  }, []);
  return (
    <div className="grid gap-4 md:grid-cols-7">
      {/* Income vs. Expenses */}
      <Card className="md:col-span-7">
        <CardHeader>
          <CardTitle>Income vs. Expenses</CardTitle>
          <p className="text-sm text-gray-500">Monthly comparison of your income and expenses</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatCurrency} />
              <Legend />
              <Bar dataKey="income" name="Income" fill="#4f46e5" />
              <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Budget Progress */}
      <Card className="md:col-span-4">
        <CardHeader>
          <CardTitle>Budget Progress</CardTitle>
          <p className="text-sm text-gray-500">Track your spending against budget allocations</p>
        </CardHeader>
        {/* <CardContent>
          <div className="space-y-4">
            {budgetProgress.map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.category}</span>
                  <span className="font-medium">
                    ${item.spent} / ${item.allocated}
                  </span>
                </div>
                <Progress
                  value={item.percentage}
                  style={{ backgroundColor: item.percentage > 100 ? "red" : "" }}
                />
                {item.percentage > 100 && (
                  <div className="text-xs text-red-500">
                    Over budget by ${(item.spent - item.allocated).toFixed(2)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent> */}
        <CardContent>
  <div className="space-y-4">
    {budgetProgress.length > 0 ? (
      budgetProgress.map((item) => (
        <div key={item.category} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{item.category}</span>
            <span className="font-medium">
              ${item.spent} / ${item.allocated}
            </span>
          </div>
          <Progress
            value={item.percentage}
            style={{ backgroundColor: item.percentage > 100 ? "red" : "" }}
          />
          {item.percentage > 100 && (
            <div className="text-xs text-red-500">
              Over budget by ${(item.spent - item.allocated).toFixed(2)}
            </div>
          )}
        </div>
      ))
    ) : (
      <p className="text-sm text-gray-500">No budget data available for this month.</p>
    )}
  </div>
</CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <p className="text-sm text-gray-500">Your latest expenses and income</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            <TableBody>
  {recentTransactions.map((transaction) => (
    <TableRow key={transaction.id}>  {/* Use transaction.id as the key */}
      <TableCell className="font-medium">{transaction.description}</TableCell>
      <TableCell>
        <Badge variant="outline">{transaction.category}</Badge>
      </TableCell>
      <TableCell className="text-right font-medium">${transaction.amount.toFixed(2)}</TableCell>
    </TableRow>
  ))}
</TableBody>
</TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetOverview;