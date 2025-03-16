import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent,CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertCircle, FileDown } from "lucide-react";

const Recommendation = ({ transactions }) => {
  const [outperformanceText, setOutperformanceText] = useState("");
  const [riskAnalysisText, setRiskAnalysisText] = useState("");
  const [recommendationsText, setRecommendationsText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiKey = "AIzaSyCRjmh5VKcCnANplEe3Vloz7SmR3mEwtnA";


  useEffect(() => {
    const generateInsights = async () => {
      try {
        // Prepare the prompt for Gemini API
        const prompt = `Analyze the following transaction data and provide insights in three sections:
        1. Outperformance: Compare the portfolio performance to the S&P 500 (if benchmark data is available). If no benchmark data is available, provide a general assessment of the portfolio's potential performance based on the transactions.
        2. Risk Analysis: Assess the volatility and risk of the portfolio (if sufficient data is available). If data is insufficient, provide a general risk assessment based on the types of assets in the portfolio.
        3. Recommendations: Suggest portfolio adjustments based on the data. If data is insufficient, provide general recommendations for diversification and risk management.
        
        **Important Notes:**
        - If the data is insufficient (e.g., only one day of transactions or no benchmark data), provide approximate insights based on general market knowledge and the available data.
        - Highlight any limitations in the analysis due to insufficient data.
        
        Transaction Data: ${JSON.stringify(transactions)}`;
  
        // Call Gemini API
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: prompt,
                    },
                  ],
                },
              ],
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to generate insights");
        }

        console.log("response",response)
  
        const data = await response.json();
        const generatedText = data.candidates[0].content.parts[0].text;
  
        // Remove ** from the generated text
        const cleanedText = generatedText.replace(/\*\*/g, "");
  
        // Split the cleaned text into sections
        const sections = cleanedText.split("\n\n");
        setOutperformanceText(sections[0]);
        setRiskAnalysisText(sections[1]);
        setRecommendationsText(sections[2]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (transactions && transactions.length > 0) {
      generateInsights();
    }
  }, [transactions]);

//   if (loading) {
//     return <div>Loading insights...</div>;
//   }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="md:col-span-7">
      <CardHeader>
        <CardTitle>Performance Insights</CardTitle>
        <CardDescription>
          AI-powered analysis of your investment performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Outperformance Box */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-emerald-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                Outperformance
              </Badge>
            </div>
            <h3 className="text-base font-medium mb-2">Market Benchmark</h3>
            <p className="text-sm text-muted-foreground">
              {outperformanceText || "Loading..."}
            </p>
          </div>

          {/* Risk Analysis Box */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-primary">
                <AlertCircle className="mr-1 h-3 w-3" />
                Risk Analysis
              </Badge>
            </div>
            <h3 className="text-base font-medium mb-2">Volatility Assessment</h3>
            <p className="text-sm text-muted-foreground">
              {riskAnalysisText || "Loading..."}
            </p>
          </div>

          {/* Recommendations Box */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-amber-500">
                <FileDown className="mr-1 h-3 w-3" />
                Recommendations
              </Badge>
            </div>
            <h3 className="text-base font-medium mb-2">Portfolio Adjustments</h3>
            <p className="text-sm text-muted-foreground">
              {recommendationsText || "Loading..."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendation;