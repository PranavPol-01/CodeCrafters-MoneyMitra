import React, { useState } from "react";
import PortfolioOverview from "../../components/portfolio/PortfolioOverview";
import PortfolioDiversification from "../../components/portfolio/PortfolioDiversification";

const PortfolioPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Management</h1>
          <p className="text-muted-foreground">Track and optimize your investment portfolio</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <button className="border px-4 py-2 rounded-md">Export Data</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Investment</button>
        </div>
      </div>

      <div className="w-full">
        <div className="grid w-full grid-cols-2 border-b">
          <button
            className={`py-2 ${activeTab === "overview" ? "border-b-2 border-blue-500" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Portfolio Overview
          </button>
          <button
            className={`py-2 ${activeTab === "diversification" ? "border-b-2 border-blue-500" : ""}`}
            onClick={() => setActiveTab("diversification")}
          >
            Portfolio Diversification
          </button>
        </div>
        <div className="mt-4">
          {activeTab === "overview" && <PortfolioOverview />}
          {activeTab === "diversification" && <PortfolioDiversification />}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
