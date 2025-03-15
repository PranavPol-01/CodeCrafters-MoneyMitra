"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, FileText, Printer } from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';

const profitLossData = [
  { date: "2025-01-01", value: 20000 },
  { date: "2025-01-15", value: 20500 },
  { date: "2025-02-01", value: 21200 },
  { date: "2025-02-15", value: 22500 },
  { date: "2025-03-01", value: 23800 },
  { date: "2025-03-15", value: 24685 },
]

const assetPerformance = [
  {
    id: "1",
    name: "NVIDIA Corp.",
    symbol: "NVDA",
    initialValue: 2900,
    currentValue: 3850.4,
    profit: 950.4,
    change: "+32.5%",
  },
  {
    id: "2",
    name: "Meta Platforms",
    symbol: "META",
    initialValue: 2140,
    currentValue: 2526.4,
    profit: 386.4,
    change: "+18.2%",
  },
  {
    id: "3",
    name: "Bitcoin",
    symbol: "BTC",
    initialValue: 2950,
    currentValue: 3412.5,
    profit: 462.5,
    change: "+15.8%",
  },
  {
    id: "4",
    name: "Tesla Inc.",
    symbol: "TSLA",
    initialValue: 1100,
    currentValue: 1212.5,
    profit: 112.5,
    change: "+10.0%",
  },
  {
    id: "5",
    name: "Apple Inc.",
    symbol: "AAPL",
    initialValue: 1850,
    currentValue: 1905.5,
    profit: 55.5,
    change: "+3.0%",
  },
  {
    id: "6",
    name: "S&P 500 ETF",
    symbol: "SPY",
    initialValue: 2200,
    currentValue: 2266.0,
    profit: 66.0,
    change: "+3.0%",
  },
  {
    id: "7",
    name: "Gold ETF",
    symbol: "GLD",
    initialValue: 1520,
    currentValue: 1483.2,
    profit: -36.8,
    change: "-2.5%",
  },
  {
    id: "8",
    name: "Bond ETF",
    symbol: "BND",
    initialValue: 2145,
    currentValue: 2105.6,
    profit: -39.4,
    change: "-1.8%",
  },
]

const transactionHistory = [
  {
    id: "1",
    date: "Mar 12, 2025",
    type: "Buy",
    asset: "Tesla Inc. (TSLA)",
    amount: "$1,250.00",
    shares: "5",
    price: "$250.00",
  },
  {
    id: "2",
    date: "Mar 10, 2025",
    type: "Sell",
    asset: "Bitcoin (BTC)",
    amount: "$3,400.00",
    shares: "0.05",
    price: "$68,000.00",
  },
  {
    id: "3",
    date: "Mar 8, 2025",
    type: "Buy",
    asset: "Apple Inc. (AAPL)",
    amount: "$2,100.00",
    shares: "12",
    price: "$175.00",
  },
  {
    id: "4",
    date: "Mar 5, 2025",
    type: "Buy",
    asset: "S&P 500 ETF (SPY)",
    amount: "$500.00",
    shares: "2",
    price: "$250.00",
  },
  {
    id: "5",
    date: "Mar 1, 2025",
    type: "Buy",
    asset: "Gold ETF (GLD)",
    amount: "$750.00",
    shares: "8",
    price: "$93.75",
  },
  {
    id: "6",
    date: "Feb 25, 2025",
    type: "Buy",
    asset: "NVIDIA Corp. (NVDA)",
    amount: "$1,600.00",
    shares: "4",
    price: "$400.00",
  },
  {
    id: "7",
    date: "Feb 20, 2025",
    type: "Sell",
    asset: "Meta Platforms (META)",
    amount: "$950.00",
    shares: "3",
    price: "$316.67",
  },
  {
    id: "8",
    date: "Feb 15, 2025",
    type: "Buy",
    asset: "Bitcoin (BTC)",
    amount: "$2,950.00",
    shares: "0.05",
    price: "$59,000.00",
  },
]

export function ProfitLossReport() {
  const [transactionTab, setTransactionTab] = useState('all');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="font-bold">${payload[0].value.toLocaleString()}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-4 md:grid-cols-7">
      <Card className="md:col-span-7">
        <CardHeader>
          <CardTitle>Portfolio Value Over Time</CardTitle>
          <CardDescription>Track your investment growth for Q1 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={profitLossData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Starting Value</div>
              <div className="text-lg font-medium">$20,000.00</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Current Value</div>
              <div className="text-lg font-medium">$24,685.75</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Total Profit/Loss</div>
              <div className="text-lg font-medium text-emerald-500">+$4,685.75 (+23.5%)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-7">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Asset Performance</CardTitle>
            <CardDescription>Individual performance of each asset in your portfolio</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileDown className="mr-2 h-4 w-4" />
              CSV
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Initial Value</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Profit/Loss</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assetPerformance.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">
                    <div>
                      {asset.symbol}
                      <div className="text-xs text-muted-foreground">{asset.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>${asset.initialValue.toLocaleString()}</TableCell>
                  <TableCell>${asset.currentValue.toLocaleString()}</TableCell>
                  <TableCell className={asset.profit >= 0 ? "text-emerald-500" : "text-rose-500"}>
                    {asset.profit >= 0 ? "+" : ""}${asset.profit.toLocaleString()}
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      asset.change.startsWith("+") ? "text-emerald-500" : "text-rose-500"
                    }`}
                  >
                    {asset.change}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="md:col-span-7">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Record of all your investment transactions for Q1 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setTransactionTab}>
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="buy">Buy Orders</TabsTrigger>
              <TabsTrigger value="sell">Sell Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Shares</TableHead>
                    <TableHead className="text-right">Price Per Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionHistory.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={transaction.type === "Buy" ? "outline" : "secondary"}
                          className={transaction.type === "Buy" ? "text-emerald-500" : "text-rose-500"}
                        >
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{transaction.asset}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.shares}</TableCell>
                      <TableCell className="text-right">{transaction.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="buy" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Shares</TableHead>
                    <TableHead className="text-right">Price Per Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionHistory
                    .filter((transaction) => transaction.type === "Buy")
                    .map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-500">
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{transaction.asset}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.shares}</TableCell>
                        <TableCell className="text-right">{transaction.price}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="sell" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Shares</TableHead>
                    <TableHead className="text-right">Price Per Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionHistory
                    .filter((transaction) => transaction.type === "Sell")
                    .map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-rose-500">
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{transaction.asset}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.shares}</TableCell>
                        <TableCell className="text-right">{transaction.price}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}