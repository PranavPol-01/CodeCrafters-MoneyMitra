import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import  BudgetOverview  from "../../components/budget/BudgetOverview";
import  MonthlyBudgetForm  from "../../components/budget/MonthlyBudgetForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, PiggyBank, TrendingDown, BarChart3 } from "lucide-react";
import ExpenseAnalytics from './../../components/budget/ExpenseCategories';

const BudgetPage = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budget & Expenses</h1>
          <p className="text-muted-foreground">Manage your monthly budget and track expenses</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button variant="outline">Export Data</Button>
          <Button>Add Expense</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {[{
          title: "Monthly Income",
          amount: "$5,240.00",
          change: "↑ 8.2%",
          changeColor: "text-emerald-500",
          icon: <Wallet className="h-4 w-4 text-muted-foreground" />
        }, {
          title: "Monthly Expenses",
          amount: "$3,850.75",
          change: "↑ 2.5%",
          changeColor: "text-rose-500",
          icon: <TrendingDown className="h-4 w-4 text-muted-foreground" />
        }, {
          title: "Savings",
          amount: "$1,389.25",
          change: "26.5% of monthly income",
          changeColor: "text-muted-foreground",
          icon: <PiggyBank className="h-4 w-4 text-muted-foreground" />
        }, {
          title: "Budget Health",
          amount: "Good",
          change: "↑ 5% improvement",
          changeColor: "text-emerald-500",
          icon: <BarChart3 className="h-4 w-4 text-muted-foreground" />
        }].map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.amount}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`${card.changeColor} font-medium`}>{card.change}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Budget Overview</TabsTrigger>
          <TabsTrigger value="categories">Expense Categories</TabsTrigger>
          <TabsTrigger value="settings">Budget Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <BudgetOverview />
        </TabsContent>
        <TabsContent value="categories">
          <ExpenseAnalytics />
        </TabsContent>
        <TabsContent value="settings">
          <MonthlyBudgetForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetPage;
