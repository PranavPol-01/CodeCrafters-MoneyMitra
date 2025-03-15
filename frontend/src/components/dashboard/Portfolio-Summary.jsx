import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const data = [
  { name: "Stocks", value: 45, color: "#0ea5e9" },
  { name: "Bonds", value: 20, color: "#8b5cf6" },
  { name: "Crypto", value: 15, color: "#f43f5e" },
  { name: "Real Estate", value: 10, color: "#10b981" },
  { name: "Gold", value: 5, color: "#f59e0b" },
  { name: "Cash", value: 5, color: "#6b7280" },
];

const PortfolioSummary = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between">
      <div className="w-full md:w-1/2 flex justify-center">
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={({ payload }) => {
            if (!payload || payload.length === 0) return null;
            const data = payload[0].payload;
            return (
              <div style={{ background: "#fff", padding: "10px", borderRadius: "5px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: "10px", height: "10px", backgroundColor: data.color, marginRight: "5px" }}></div>
                  <span>{data.name}</span>
                </div>
                <div><strong>{data.value}%</strong></div>
              </div>
            );
          }} />
        </PieChart>
      </div>
      <div className="w-full md:w-1/2 mt-4 md:mt-0">
        <h3 className="text-lg font-medium mb-4">Asset Allocation</h3>
        <div className="grid grid-cols-2 gap-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div style={{ backgroundColor: item.color, width: "10px", height: "10px", borderRadius: "50%" }}></div>
              <div className="flex justify-between w-full">
                <span className="text-sm">{item.name}</span>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Diversification Score</p>
              <p className="text-xs text-gray-500">Your portfolio is well balanced</p>
            </div>
            <div className="text-2xl font-bold">8.5/10</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;