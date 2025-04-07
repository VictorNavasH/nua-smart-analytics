
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RevenueForecastChart } from "@/components/dashboard/RevenueForecastChart";
import { RevenueForecastControls } from "@/components/dashboard/RevenueForecastControls";
import { revenueForecastData } from "@/data/dashboardData";

interface RevenueForecastProps {
  title?: string;
}

export function RevenueForecast({ title = "Revenue Forecast" }: RevenueForecastProps) {
  const [growthRate, setGrowthRate] = useState<number>(5);
  const [seasonality, setSeasonality] = useState<number>(10);
  
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
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <CardDescription>Adjust parameters to visualize different scenarios</CardDescription>
      </CardHeader>
      <CardContent>
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
