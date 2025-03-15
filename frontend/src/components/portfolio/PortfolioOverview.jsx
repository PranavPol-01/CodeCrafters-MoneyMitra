import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const portfolioHistory = [
  { date: "2024-09-15", value: 15000 },
  { date: "2024-10-15", value: 15200 },
  { date: "2024-11-15", value: 15800 },
  { date: "2024-12-15", value: 16500 },
  { date: "2025-01-15", value: 17200 },
  { date: "2025-02-15", value: 18500 },
  { date: "2025-03-15", value: 24685 },
];

const assetAllocation = [
  { name: "Stocks", value: 45, color: "#0ea5e9" },
  { name: "Bonds", value: 20, color: "#8b5cf6" },
  { name: "Crypto", value: 15, color: "#f43f5e" },
  { name: "Real Estate", value: 10, color: "#10b981" },
  { name: "Gold", value: 5, color: "#f59e0b" },
  { name: "Cash", value: 5, color: "#6b7280" },
];

export default function PortfolioOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-7">
      <Card className="md:col-span-4">
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
          <CardDescription>Track your investment growth over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={portfolioHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
          <CardDescription>Breakdown of your investment by asset class</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={assetAllocation} dataKey="value" nameKey="name" outerRadius={100} label>
                {assetAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}