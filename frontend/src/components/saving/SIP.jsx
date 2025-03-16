import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SIPForm = () => {
  const [sips, setSips] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    frequency: "Monthly",
    startDate: "",
    duration: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSIP = () => {
    if (!formData.amount || !formData.startDate || !formData.duration) {
      alert("Please fill all fields");
      return;
    }

    const newSIP = {
      id: sips.length + 1,
      amount: formData.amount,
      frequency: formData.frequency,
      startDate: formData.startDate,
      duration: formData.duration,
    };

    setSips([...sips, newSIP]);
    setFormData({ amount: "", frequency: "Monthly", startDate: "", duration: "" });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add SIP</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="frequency">Frequency</Label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (Years)</Label>
              <Input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="Enter duration"
              />
            </div>
          </div>
        </div>
        <Button onClick={handleAddSIP} className="mt-4">
          Add SIP
        </Button>
      </CardContent>

      {/* Display Added SIPs in a Table */}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount (₹)</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Duration (Years)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sips.map((sip) => (
              <TableRow key={sip.id}>
                <TableCell>₹{sip.amount}</TableCell>
                <TableCell>{sip.frequency}</TableCell>
                <TableCell>{sip.startDate}</TableCell>
                <TableCell>{sip.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SIPForm;