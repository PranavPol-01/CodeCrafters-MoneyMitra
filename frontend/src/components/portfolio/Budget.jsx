import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, Legend } from "recharts";

const Budget = ({ budget, budgetUtilizationData, budgetAllocationData }) => {
    // Custom label for PieChart
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    // Custom Tooltip for PieChart
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border border-gray-200 rounded shadow">
                    <p className="font-semibold">{payload[0].name}</p>
                    <p>₹{payload[0].value.toFixed(2)}</p>
                </div>
            );
        }
        return null;
    };

    // Colors for PieChart
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <TabsContent value="budget" className="space-y-6">
            {/* Budget Overview */}
            <Card className="bg-white shadow-md">
                <CardHeader>
                    <CardTitle>Budget Overview</CardTitle>
                    <CardDescription>Your income and expenses</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Total Income</p>
                            <h3 className="text-2xl font-bold">₹{parseFloat(budget.income || 0).toFixed(2)}</h3>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Total Savings</p>
                            <h3 className="text-2xl font-bold">₹{parseFloat(budget.savings || 0).toFixed(2)}</h3>
                            <p className="text-xs mt-1">
                                {budget.income ? ((budget.savings / budget.income) * 100).toFixed(1):0}% of income
                            </p>
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={budgetUtilizationData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value">
                                {budgetUtilizationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Budget Allocation */}
            <Card className="bg-white shadow-md">
                <CardHeader>
                    <CardTitle>Budget Allocation</CardTitle>
                    <CardDescription>Where your money goes</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={budgetAllocationData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {budgetAllocationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>% of Budget</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {budgetAllocationData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>₹{item.value.toFixed(2)}</TableCell>
                                        <TableCell>
                                            {((item.value / (parseFloat(budget.income || 0))) * 100).toFixed(1)}%
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Financial Health Metrics */}
            <Card className="bg-white shadow-md">
                <CardHeader>
                    <CardTitle>Financial Health Metrics</CardTitle>
                    <CardDescription>Key indicators of your financial status</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg">
                            <p className="text-sm text-gray-500">Savings Rate</p>
                            <h3 className="text-xl font-bold">
                                {budget.income ? ((budget.savings / budget.income) * 100).toFixed(1) : 0}%

                            </h3>
                            <p className="text-xs mt-1 text-gray-500">
                                {budget.income && (budget.savings / budget.income) > 0.2
                                    ? "Excellent"
                                    : budget.income && (budget.savings / budget.income) > 0.1
                                        ? "Good"
                                        : "Needs improvement"}
                            </p>
                        </div>

                        <div className="p-4 border rounded-lg">
                            <p className="text-sm text-gray-500">Investment Ratio</p>
                            <h3 className="text-xl font-bold">
                                {budget.income
                                    ? (
                                        ((parseFloat(budget.bonds || 0) +
                                            parseFloat(budget.stocks || 0) +
                                            parseFloat(budget.mutualFunds || 0)) /
                                            budget.income) *
                                        100
                                    ).toFixed(1)
                                    : 0}
                                %
                            </h3>
                            <p className="text-xs mt-1 text-gray-500">Portion of income allocated to investments</p>
                        </div>

                        <div className="p-4 border rounded-lg">
                            <p className="text-sm text-gray-500">Expense Coverage</p>
                            <h3 className="text-xl font-bold">
                                {budget.income && budget.income > budget.savings
                                    ? (budget.savings / (budget.income - budget.savings)).toFixed(1)
                                    : 0}{" "}
                                months
                            </h3>
                            <p className="text-xs mt-1 text-gray-500">How long savings can cover expenses</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default Budget;