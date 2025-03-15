import React, { useState } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid,  Legend,
 
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp } from 'lucide-react';


const ExpenseAnalytics = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Expense data
  const expenseCategories = [
    { name: "Housing", value: 1450, color: "#0ea5e9", percentage: 37.7 },
    { name: "Food", value: 750, color: "#8b5cf6", percentage: 19.5 },
    { name: "Transportation", value: 380, color: "#f43f5e", percentage: 9.9 },
    { name: "Utilities", value: 320, color: "#10b981", percentage: 8.3 },
    { name: "Entertainment", value: 350, color: "#f59e0b", percentage: 9.1 },
    { name: "Healthcare", value: 150, color: "#6366f1", percentage: 3.9 },
    { name: "Shopping", value: 450, color: "#ec4899", percentage: 11.7 },
  ];

  const monthlyTrends = [
    {
      month: "Jan",
      housing: 1400,
      food: 720,
      transportation: 350,
      utilities: 300,
      entertainment: 280,
      healthcare: 140,
      shopping: 400,
    },
    {
      month: "Feb",
      housing: 1400,
      food: 730,
      transportation: 360,
      utilities: 310,
      entertainment: 290,
      healthcare: 145,
      shopping: 410,
    },
    {
      month: "Mar",
      housing: 1450,
      food: 750,
      transportation: 380,
      utilities: 320,
      entertainment: 350,
      healthcare: 150,
      shopping: 450,
    },
  ];

  const topExpenses = [
    { id: "1", description: "Apartment Rent", category: "Housing", amount: 1200, date: "Mar 1, 2025" },
    { id: "2", description: "Grocery Store", category: "Food", amount: 210.5, date: "Mar 12, 2025" },
    { id: "3", description: "Online Shopping", category: "Shopping", amount: 185.75, date: "Mar 8, 2025" },
    { id: "4", description: "Restaurant Dinner", category: "Food", amount: 125.3, date: "Mar 15, 2025" },
    { id: "5", description: "Concert Tickets", category: "Entertainment", amount: 120.0, date: "Mar 5, 2025" },
  ];

  const categoryChanges = [
    { category: "Housing", previousMonth: 1400, currentMonth: 1450, change: "+3.6%" },
    { category: "Food", previousMonth: 730, currentMonth: 750, change: "+2.7%" },
    { category: "Transportation", previousMonth: 360, currentMonth: 380, change: "+5.6%" },
    { category: "Utilities", previousMonth: 310, currentMonth: 320, change: "+3.2%" },
    { category: "Entertainment", previousMonth: 290, currentMonth: 350, change: "+20.7%" },
    { category: "Healthcare", previousMonth: 145, currentMonth: 150, change: "+3.4%" },
    { category: "Shopping", previousMonth: 410, currentMonth: 450, change: "+9.8%" },
  ];

  const Custom = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: data.color }} />
            <span className="font-medium">{data.name}</span>
          </div>
          <div className="mt-1 font-bold">${data.value}</div>
          <div className="mt-1 text-xs">{data.percentage}% of total</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-4 md:grid-cols-7">
      {/* Pie Chart Card */}
      <div className="bg-white p-6 rounded-lg shadow md:col-span-3">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Expense Breakdown</h2>
          <p className="text-sm text-gray-500">How your expenses are distributed across categories</p>
        </div>
        <div className="flex justify-center mb-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={false}
              >
                {expenseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {expenseCategories.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <div className="flex justify-between w-full">
                <span className="text-sm">{item.name}</span>
                <span className="text-sm font-medium">${item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart Card */}
      <div className="bg-white p-6 rounded-lg shadow md:col-span-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Monthly Expense Trends</h2>
          <p className="text-sm text-gray-500">How your spending has changed over time</p>
        </div>
        
        <div className="flex space-x-2 mb-4">
          <button 
            onClick={() => setActiveTab('all')} 
            className={`px-4 py-2 text-sm rounded ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            All Categories
          </button>
          <button 
            onClick={() => setActiveTab('top')} 
            className={`px-4 py-2 text-sm rounded ${activeTab === 'top' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Top Expenses
          </button>
          <button 
            onClick={() => setActiveTab('changes')} 
            className={`px-4 py-2 text-sm rounded ${activeTab === 'changes' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Monthly Changes
          </button>
        </div>

        {activeTab === 'all' && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              
              <Legend />
              <Bar dataKey="housing" name="Housing" fill="#0ea5e9" />
              <Bar dataKey="food" name="Food" fill="#8b5cf6" />
              <Bar dataKey="transportation" name="Transportation" fill="#f43f5e" />
              <Bar dataKey="utilities" name="Utilities" fill="#10b981" />
              <Bar dataKey="entertainment" name="Entertainment" fill="#f59e0b" />
              <Bar dataKey="healthcare" name="Healthcare" fill="#6366f1" />
              <Bar dataKey="shopping" name="Shopping" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeTab === 'top' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Top Expenses This Month</h3>
            {topExpenses.map((expense, index) => (
              <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-xs font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{expense.description}</div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs bg-gray-200 rounded-full">{expense.category}</span>
                      <span className="text-xs text-gray-500">{expense.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right font-medium">${expense.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'changes' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Month-to-Month Changes</h3>
            {categoryChanges.map((item) => (
              <div key={item.category} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <div>
                  <div className="font-medium">{item.category}</div>
                  <div className="text-xs text-gray-500">
                    ${item.previousMonth} → ${item.currentMonth}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full flex items-center ${item.change.startsWith('+') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                  {item.change.startsWith('+') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 12.586V7z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 13a1 1 0 10-2 0v-5.586l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L12 7.414V13z" clipRule="evenodd" />
                    </svg>
                  )}
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Insights Card */}
      <div className="bg-white p-6 rounded-lg shadow md:col-span-7">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Spending Insights</h2>
          <p className="text-sm text-gray-500">AI-powered analysis of your spending patterns</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 text-xs bg-white rounded-full text-red-500 flex items-center border border-red-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 12.586V7z" clipRule="evenodd" />
                </svg>
                Overspending
              </span>
            </div>
            <h3 className="text-base font-medium mb-2">Entertainment & Shopping</h3>
            <p className="text-sm text-gray-500">
              You've exceeded your budget in entertainment by 17% and shopping by 50%. Consider reducing discretionary spending in these categories.
            </p>
            <button className="mt-4 w-full px-4 py-2 text-sm border border-gray-300 rounded-md bg-white">
              View Details
            </button>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 text-xs bg-white rounded-full text-green-500 flex items-center border border-green-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 13a1 1 0 10-2 0v-5.586l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L12 7.414V13z" clipRule="evenodd" />
                </svg>
                Savings Opportunity
              </span>
            </div>
            <h3 className="text-base font-medium mb-2">Food & Dining</h3>
            <p className="text-sm text-gray-500">
              Your restaurant spending has increased by 15% this month. Cooking at home more often could save approximately $200 monthly.
            </p>
            
              <Button variant="outline" size="sm" className="mt-4 w-full">
                View Details
              </Button>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-amber-500">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  Recurring Expenses
                </Badge>
              </div>
              <h3 className="text-base font-medium mb-2">Subscription Services</h3>
              <p className="text-sm text-muted-foreground">
                You're spending $85 monthly on subscription services. We've identified 3 unused subscriptions that could
                be canceled.
              </p>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                View Details
              </Button>
            </div>
          </div>
    
     </div>
    </div>
  )
}

export default ExpenseAnalytics;