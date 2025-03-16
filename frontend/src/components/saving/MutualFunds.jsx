import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MutualFundsForm = () => {
  const [mutualFunds, setMutualFunds] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    fundName: "",
    investmentDate: "",
    fundType: "Equity",
    nav: "",
    unitsPurchased: "",
    expenseRatio: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddMutualFund = () => {
    if (
      !formData.amount ||
      !formData.fundName ||
      !formData.investmentDate ||
      !formData.nav ||
      !formData.unitsPurchased ||
      !formData.expenseRatio
    ) {
      alert("Please fill all required fields");
      return;
    }

    const newMutualFund = {
      id: mutualFunds.length + 1,
      amount: formData.amount,
      fundName: formData.fundName,
      investmentDate: formData.investmentDate,
      fundType: formData.fundType,
      nav: formData.nav,
      unitsPurchased: formData.unitsPurchased,
      expenseRatio: formData.expenseRatio,
    };

    setMutualFunds([...mutualFunds, newMutualFund]);
    setFormData({
      amount: "",
      fundName: "",
      investmentDate: "",
      fundType: "Equity",
      nav: "",
      unitsPurchased: "",
      expenseRatio: "",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Mutual Fund</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
              />
            </div>
            <div>
              <Label htmlFor="fundName">Fund Name</Label>
              <Input
                type="text"
                id="fundName"
                name="fundName"
                value={formData.fundName}
                onChange={handleInputChange}
                placeholder="Enter fund name"
              />
            </div>
            <div>
              <Label htmlFor="investmentDate">Investment Date</Label>
              <Input
                type="date"
                id="investmentDate"
                name="investmentDate"
                value={formData.investmentDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="fundType">Fund Type</Label>
              <select
                id="fundType"
                name="fundType"
                value={formData.fundType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="Equity">Equity</option>
                <option value="Debt">Debt</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Index">Index</option>
                <option value="Sectoral">Sectoral</option>
              </select>
            </div>
            <div>
              <Label htmlFor="nav">NAV (Net Asset Value)</Label>
              <Input
                type="number"
                id="nav"
                name="nav"
                value={formData.nav}
                onChange={handleInputChange}
                placeholder="Enter NAV"
              />
            </div>
            <div>
              <Label htmlFor="unitsPurchased">Units Purchased</Label>
              <Input
                type="number"
                id="unitsPurchased"
                name="unitsPurchased"
                value={formData.unitsPurchased}
                onChange={handleInputChange}
                placeholder="Enter units purchased"
              />
            </div>
            <div>
              <Label htmlFor="expenseRatio">Expense Ratio (%)</Label>
              <Input
                type="number"
                id="expenseRatio"
                name="expenseRatio"
                value={formData.expenseRatio}
                onChange={handleInputChange}
                placeholder="Enter expense ratio"
              />
            </div>
          </div>
        </div>
        <Button onClick={handleAddMutualFund} className="mt-4">
          Add Mutual Fund
        </Button>
      </CardContent>

      {/* Display Added Mutual Funds in a Table */}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount (₹)</TableHead>
              <TableHead>Fund Name</TableHead>
              <TableHead>Investment Date</TableHead>
              <TableHead>Fund Type</TableHead>
              <TableHead>NAV</TableHead>
              <TableHead>Units Purchased</TableHead>
              <TableHead>Expense Ratio (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mutualFunds.map((fund) => (
              <TableRow key={fund.id}>
                <TableCell>₹{fund.amount}</TableCell>
                <TableCell>{fund.fundName}</TableCell>
                <TableCell>{fund.investmentDate}</TableCell>
                <TableCell>{fund.fundType}</TableCell>
                <TableCell>{fund.nav}</TableCell>
                <TableCell>{fund.unitsPurchased}</TableCell>
                <TableCell>{fund.expenseRatio}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MutualFundsForm;