import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const PortfolioOverview = () => {
  const [bonds, setBonds] = useState([]);
  const [mutualFunds, setMutualFunds] = useState([]);
  const [sips, setSips] = useState([]);
  const [budget, setBudget] = useState({});
  const uid = sessionStorage.getItem("uid");

  // Fetch all data
  useEffect(() => {
    fetchBonds();
    fetchMutualFunds();
    fetchSips();
    fetchBudget();
  }, []);

  const fetchBonds = async () => {
    try {
      const response = await fetch(`/api/savings/getbonds/${uid}`);
      if (!response.ok) throw new Error("Failed to fetch bonds");
      const data = await response.json();
      setBonds(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching bonds:", error);
    }
  };

  const fetchMutualFunds = async () => {
    try {
      const response = await fetch(`/api/savings/getmf/${uid}`);
      if (!response.ok) throw new Error("Failed to fetch mutual funds");
      const data = await response.json();
      setMutualFunds(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching mutual funds:", error);
    }
  };

  const fetchSips = async () => {
    try {
      const response = await fetch(`/api/savings/getsip/${uid}`);
      if (!response.ok) throw new Error("Failed to fetch SIPs");
      const data = await response.json();
      setSips(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching SIPs:", error);
    }
  };

  const fetchBudget = async () => {
    try {
      const response = await fetch("/api/budget/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: uid }),
      });
      if (!response.ok) throw new Error("Failed to fetch budget");
      const data = await response.json();
      setBudget(data);
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

  // Data for graphs
  const bondData = bonds.map((bond) => ({
    name: bond.bondName,
    value: parseFloat(bond.amount),
  }));

  const mutualFundData = mutualFunds.map((mf) => ({
    name: mf.fundName,
    value: parseFloat(mf.amount),
  }));

  const sipData = sips.map((sip) => ({
    name: `SIP - ${sip.fundName}`,
    value: parseFloat(sip.amount),
  }));

  // Asset Allocation Data
  const assetAllocationData = [
    { name: "Bonds", value: bonds.reduce((sum, bond) => sum + parseFloat(bond.amount), 0) },
    { name: "Mutual Funds", value: mutualFunds.reduce((sum, mf) => sum + parseFloat(mf.amount), 0) },
    { name: "SIPs", value: sips.reduce((sum, sip) => sum + parseFloat(sip.amount), 0) },
  ];

  // Budget Utilization Data
  const budgetUtilizationData = [
    { name: "Income", value: parseFloat(budget.income) },
    { name: "Savings", value: parseFloat(budget.savings) },
    { name: "Expenses", value: parseFloat(budget.income) - parseFloat(budget.savings) },
  ];

  // Total Portfolio Value
  const totalPortfolioValue = assetAllocationData.reduce((sum, asset) => sum + asset.value, 0);

  // Colors for black, white, and grey theme
  const colors = ["#000000", "#4D4D4D", "#A6A6A6"];


  return (
    <div className="p-4">
      {/* Total Portfolio Value */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Total Portfolio Value</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-2xl font-bold">₹{totalPortfolioValue.toFixed(2)}</h3>
        </CardContent>
      </Card>

      {/* Asset Allocation Pie Chart */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart width={400} height={300}>
            <Pie
              data={assetAllocationData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {assetAllocationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </CardContent>
      </Card>

      {/* Budget Utilization Bar Chart */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Budget Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart width={400} height={300} data={budgetUtilizationData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#808080" />
          </BarChart>
        </CardContent>
      </Card>

      {/* Statistical Tables */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Statistical Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Total Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Bonds</TableCell>
                <TableCell>₹{bonds.reduce((sum, bond) => sum + parseFloat(bond.amount), 0)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mutual Funds</TableCell>
                <TableCell>₹{mutualFunds.reduce((sum, mf) => sum + parseFloat(mf.amount), 0)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SIPs</TableCell>
                <TableCell>₹{sips.reduce((sum, sip) => sum + parseFloat(sip.amount), 0)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Budget Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">Income</h3>
              <p>₹{budget.income}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Savings</h3>
              <p>₹{budget.savings}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioOverview;