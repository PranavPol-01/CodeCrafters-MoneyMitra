import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const newsItems = [
  {
    id: "1",
    title: "Federal Reserve Announces Interest Rate Decision",
    description:
      "The Federal Reserve has decided to maintain current interest rates, citing stable inflation and strong employment figures.",
    source: "Financial Times",
    time: "2 hours ago",
    category: "Economy",
    impact: "high",
  },
  {
    id: "2",
    title: "Tech Stocks Rally After Strong Earnings Reports",
    description:
      "Major tech companies exceeded earnings expectations, leading to a significant rally in the technology sector.",
    source: "Wall Street Journal",
    time: "5 hours ago",
    category: "Stocks",
    impact: "medium",
  },
  {
    id: "3",
    title: "New Regulations for Cryptocurrency Trading Announced",
    description:
      "Government officials have unveiled new regulatory framework for cryptocurrency trading, aiming to increase transparency.",
    source: "Bloomberg",
    time: "8 hours ago",
    category: "Crypto",
    impact: "high",
  },
  {
    id: "4",
    title: "Oil Prices Drop Amid Supply Chain Concerns",
    description:
      "Global oil prices have decreased by 3% following reports of potential disruptions in major supply chains.",
    source: "Reuters",
    time: "12 hours ago",
    category: "Commodities",
    impact: "medium",
  },
]

export default function MarketNews() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {newsItems.map((item) => (
        <Card key={item.id} className="flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Badge variant={item.impact === "high" ? "destructive" : "secondary"} className="mb-2">
                {item.category}
              </Badge>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
            <CardTitle className="text-base">{item.title}</CardTitle>
            <CardDescription className="text-xs">{item.source}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm">{item.description}</p>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="ghost" size="sm" className="ml-auto">
              Read More <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
