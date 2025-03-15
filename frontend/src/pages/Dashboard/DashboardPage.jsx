import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  TrendingUp,
  Wallet,
  Clock,
  Newspaper,
  BrainCircuit,
} from "lucide-react";
import PortfolioSummary from "../../components/dashboard/Portfolio-Summary";
import RecentTransactions from "../../components/dashboard/Recent-Transaction";
import MarketNews from "../../components/dashboard/Market-news";
import AIRecommendations from "../../components/dashboard/ai-recommendation";
import TradingViewCryptoWidget from "@/components/dashboard/tradinviewcryptowidget";
import TradingViewMarketOverview from "@/components/dashboard/watchlistwidget";

const DashboardPage = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Investment Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your portfolio.
          </p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button variant="outline">Deposit</Button>
          <Button>Invest Now</Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Left Section: TradingView Market Overview (40% width) */}
        <div className="w-full md:w-[40%]">
          <TradingViewMarketOverview />
        </div>

        {/* Right Section: Cards Grid (60% width) */}
        <div className="w-full md:w-[60%] grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Total Portfolio Value",
              value: "$24,685.75",
              change: "↑ 12.5%",
              icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
              description: "from last month",
              color: "text-emerald-500",
            },
            {
              title: "Wallet Balance",
              value: "$3,450.00",
              icon: <Wallet className="h-4 w-4 text-muted-foreground" />,
              description: "Available for investment",
            },
            {
              title: "Monthly Returns",
              value: "$845.32",
              change: "↑ 3.2%",
              icon: <ArrowUpRight className="h-4 w-4 text-muted-foreground" />,
              description: "this month",
              color: "text-emerald-500",
            },
            {
              title: "Active Investments",
              value: "12",
              icon: <Clock className="h-4 w-4 text-muted-foreground" />,
              description: "Across 4 asset classes",
            },
          ].map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                {card.change && (
                  <p className="text-xs text-muted-foreground">
                    <span className={`${card.color} font-medium`}>
                      {card.change}
                    </span>{" "}
                    {card.description}
                  </p>
                )}
                {!card.change && (
                  <p className="text-xs text-muted-foreground">
                    {card.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-7 mb-6">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Portfolio Summary</CardTitle>
            <CardDescription>
              Your assets categorized by investment type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioSummary />
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your last 5 investment activities</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
        </Card>
      </div>
      <TradingViewCryptoWidget />
      <Tabs defaultValue="market-news" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="market-news" className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            Market News
          </TabsTrigger>
          <TabsTrigger
            value="ai-suggestions"
            className="flex items-center gap-2"
          >
            <BrainCircuit className="h-4 w-4" />
            AI Investment Suggestions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="market-news">
          <Card>
            <CardHeader>
              <CardTitle>Market News & Updates</CardTitle>
              <CardDescription>
                Latest financial news and market trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MarketNews />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai-suggestions">
          <Card>
            <CardHeader>
              <CardTitle>AI Investment Recommendations</CardTitle>
              <CardDescription>
                Personalized investment suggestions based on your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AIRecommendations />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
