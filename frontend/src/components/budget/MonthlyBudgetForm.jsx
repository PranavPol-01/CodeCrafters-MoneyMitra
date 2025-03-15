"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { AlertCircle, Info, Save } from "lucide-react"

const initialBudget = {
  income: 5240,
  housing: 1500,
  food: 800,
  transportation: 400,
  utilities: 350,
  entertainment: 300,
  healthcare: 200,
  shopping: 300,
  savings: 1390,
}

const COLORS = {
  housing: "#0ea5e9",
  food: "#8b5cf6",
  transportation: "#f43f5e",
  utilities: "#10b981",
  entertainment: "#f59e0b",
  healthcare: "#6366f1",
  shopping: "#ec4899",
  savings: "#6b7280"
}

export default function MonthlyBudgetForm() {
  const [budget, setBudget] = useState(initialBudget)
  const [autoSave, setAutoSave] = useState(true)

  const totalExpenses = Object.entries(budget)
    .filter(([key]) => key !== "income" && key !== "savings")
    .reduce((sum, [_, value]) => sum + value, 0)

  const remainingForSavings = budget.income - totalExpenses
  const savingsPercentage = Math.round((remainingForSavings / budget.income) * 100)

  const handleBudgetChange = (category, value) => {
    setBudget((prev) => ({
      ...prev,
      [category]: value,
      savings: category === "savings" ? value : remainingForSavings,
    }))
  }

  const pieData = [
    { name: "Housing", value: budget.housing, color: COLORS.housing },
    { name: "Food", value: budget.food, color: COLORS.food },
    { name: "Transportation", value: budget.transportation, color: COLORS.transportation },
    { name: "Utilities", value: budget.utilities, color: COLORS.utilities },
    { name: "Entertainment", value: budget.entertainment, color: COLORS.entertainment },
    { name: "Healthcare", value: budget.healthcare, color: COLORS.healthcare },
    { name: "Shopping", value: budget.shopping, color: COLORS.shopping },
    { name: "Savings", value: remainingForSavings, color: COLORS.savings },
  ]

  // Filter out zero-value items for better presentation
  const filteredPieData = pieData.filter(item => item.value > 0)

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = Math.round((data.value / budget.income) * 100);
      return (
        <div className="bg-background p-2 border rounded shadow-lg">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: data.color }} />
            <span className="font-medium">{data.name}</span>
          </div>
          <div className="mt-1 font-bold">${data.value}</div>
          <div className="mt-1 text-xs">{percentage}% of income</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-4 md:grid-cols-7">
      <Card className="md:col-span-4">
        <CardHeader>
          <CardTitle>Monthly Budget Settings</CardTitle>
          <CardDescription>Set your monthly income and expense limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="income">Monthly Income</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm">$</span>
              <Input
                id="income"
                type="number"
                value={budget.income}
                onChange={(e) => handleBudgetChange("income", Number.parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Expense Categories</h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="housing">Housing</Label>
                <span className="text-sm font-medium">${budget.housing}</span>
              </div>
              <Slider
                id="housing"
                min={0}
                max={3000}
                step={50}
                value={[budget.housing]}
                onValueChange={(value) => handleBudgetChange("housing", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="food">Food</Label>
                <span className="text-sm font-medium">${budget.food}</span>
              </div>
              <Slider
                id="food"
                min={0}
                max={1500}
                step={50}
                value={[budget.food]}
                onValueChange={(value) => handleBudgetChange("food", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="transportation">Transportation</Label>
                <span className="text-sm font-medium">${budget.transportation}</span>
              </div>
              <Slider
                id="transportation"
                min={0}
                max={1000}
                step={50}
                value={[budget.transportation]}
                onValueChange={(value) => handleBudgetChange("transportation", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="utilities">Utilities</Label>
                <span className="text-sm font-medium">${budget.utilities}</span>
              </div>
              <Slider
                id="utilities"
                min={0}
                max={800}
                step={25}
                value={[budget.utilities]}
                onValueChange={(value) => handleBudgetChange("utilities", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="entertainment">Entertainment</Label>
                <span className="text-sm font-medium">${budget.entertainment}</span>
              </div>
              <Slider
                id="entertainment"
                min={0}
                max={800}
                step={25}
                value={[budget.entertainment]}
                onValueChange={(value) => handleBudgetChange("entertainment", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="healthcare">Healthcare</Label>
                <span className="text-sm font-medium">${budget.healthcare}</span>
              </div>
              <Slider
                id="healthcare"
                min={0}
                max={500}
                step={25}
                value={[budget.healthcare]}
                onValueChange={(value) => handleBudgetChange("healthcare", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="shopping">Shopping</Label>
                <span className="text-sm font-medium">${budget.shopping}</span>
              </div>
              <Slider
                id="shopping"
                min={0}
                max={800}
                step={25}
                value={[budget.shopping]}
                onValueChange={(value) => handleBudgetChange("shopping", value[0])}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Remaining for Savings</p>
                <p className="text-xs text-muted-foreground">{savingsPercentage}% of your income</p>
              </div>
            </div>
            <div className="text-xl font-bold">${remainingForSavings}</div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
            <Label htmlFor="auto-save">Automatically allocate remaining funds to savings</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setBudget(initialBudget)}>Reset to Default</Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Budget
          </Button>
        </CardFooter>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Budget Allocation</CardTitle>
          <CardDescription>Visual breakdown of your budget</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <TabsContent value="chart" className="pt-4">
              <div className="flex justify-center mb-6">
                <div style={{ width: 250, height: 250 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={filteredPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {filteredPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="list" className="pt-4">
              <div className="space-y-3">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-medium">${item.value}</span>
                      <span className="text-xs text-muted-foreground">
                        {Math.round((item.value / budget.income) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 p-3 bg-muted/50 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Budget Recommendations</p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>Aim to save at least 20% of your income</li>
                <li>Housing costs should ideally be below 30% of income</li>
                <li>Consider the 50/30/20 rule: 50% for needs, 30% for wants, 20% for savings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}