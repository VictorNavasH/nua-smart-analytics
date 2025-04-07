
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { revenueForecastData } from "@/data/dashboardData";

interface RevenueForecastProps {
  title?: string;
}

export function RevenueForecast({ title = "Proyección de Ingresos" }: RevenueForecastProps) {
  const [growthRate, setGrowthRate] = useState<number>(5);
  const [seasonality, setSeasonality] = useState<number>(10);
  
  // Combine historical and forecast data
  const combinedData = [
    ...revenueForecastData.historical,
    ...revenueForecastData.forecast.map(item => {
      // Apply growth rate and seasonality adjustments
      const adjustedRevenue = item.revenue * (1 + (growthRate - 5) / 100);
      const seasonalFactor = 1 + ((seasonality - 10) / 100) * (item.month === "Nov" || item.month === "Dic" ? 1 : 0.2);
      
      return {
        ...item,
        revenue: Math.round(adjustedRevenue * seasonalFactor),
        min: Math.round(item.min * (1 + (growthRate - 6) / 100) * seasonalFactor * 0.9),
        max: Math.round(item.max * (1 + (growthRate - 4) / 100) * seasonalFactor * 1.1)
      };
    })
  ];
  
  const formatCurrency = (value: number) => `€${value.toLocaleString()}`;
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <CardDescription>Ajusta los parámetros para visualizar diferentes escenarios</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={combinedData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#02B1C4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#02B1C4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFCE85" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FFCE85" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Area 
                type="monotone" 
                dataKey="min" 
                stackId="1"
                stroke="transparent"
                fill="url(#colorRange)" 
                fillOpacity={0.3}
                name="Rango Mínimo"
              />
              <Area 
                type="monotone" 
                dataKey="max" 
                stackId="1"
                stroke="transparent"
                fill="url(#colorRange)" 
                fillOpacity={0.3}
                name="Rango Máximo"
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#02B1C4" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Ingresos Proyectados"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="growth-rate">Tasa de Crecimiento</Label>
              <span className="text-sm font-medium">{growthRate}%</span>
            </div>
            <Slider 
              id="growth-rate"
              value={[growthRate]} 
              min={0} 
              max={10} 
              step={0.5}
              onValueChange={(values) => setGrowthRate(values[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="seasonality">Factor de Estacionalidad</Label>
              <span className="text-sm font-medium">{seasonality}%</span>
            </div>
            <Slider 
              id="seasonality"
              value={[seasonality]} 
              min={0} 
              max={20} 
              step={1}
              onValueChange={(values) => setSeasonality(values[0])}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
