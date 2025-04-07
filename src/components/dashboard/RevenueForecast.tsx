
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RevenueForecastChart } from "@/components/dashboard/RevenueForecastChart";
import { RevenueForecastControls } from "@/components/dashboard/RevenueForecastControls";
import { revenueForecastData } from "@/data/dashboardData";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface RevenueForecastProps {
  title?: string;
}

export function RevenueForecast({ title = "Revenue Forecast" }: RevenueForecastProps) {
  const [growthRate, setGrowthRate] = useState<number>(5);
  const [seasonality, setSeasonality] = useState<number>(10);
  
  const resetControls = () => {
    setGrowthRate(5);
    setSeasonality(10);
  };
  
  // Combine historical and forecast data
  const combinedData = [
    ...revenueForecastData.historical,
    ...revenueForecastData.forecast.map(item => {
      // Apply growth rate and seasonality adjustments
      const adjustedRevenue = item.revenue * (1 + (growthRate - 5) / 100);
      const seasonalFactor = 1 + ((seasonality - 10) / 100) * (item.month === "Nov" || item.month === "Dec" ? 1 : 0.2);
      
      return {
        ...item,
        revenue: Math.round(adjustedRevenue * seasonalFactor),
        min: Math.round(item.min * (1 + (growthRate - 6) / 100) * seasonalFactor * 0.9),
        max: Math.round(item.max * (1 + (growthRate - 4) / 100) * seasonalFactor * 1.1)
      };
    })
  ];
  
  return (
    <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-nua-turquoise rounded-xl overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-start justify-between bg-gradient-to-r from-white to-nua-turquoise/5">
        <div>
          <CardTitle className="text-lg font-medium text-nua-blue">{title}</CardTitle>
          <CardDescription className="text-nua-blue/70">Adjust parameters to visualize different scenarios</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={resetControls} 
          title="Reset to defaults"
          className="hover:bg-nua-turquoise/10 border-nua-turquoise/50 transition-all duration-300 hover:scale-105"
        >
          <RotateCcw className="h-4 w-4 text-nua-turquoise" />
        </Button>
      </CardHeader>
      <CardContent className="pb-6">
        <RevenueForecastChart data={combinedData} />
        <RevenueForecastControls 
          growthRate={growthRate}
          seasonality={seasonality}
          onGrowthRateChange={setGrowthRate}
          onSeasonalityChange={setSeasonality}
        />
      </CardContent>
    </Card>
  );
}
