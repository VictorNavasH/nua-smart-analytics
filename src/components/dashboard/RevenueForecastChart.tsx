
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Line } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";

interface RevenueForecastChartProps {
  data: Array<{
    month: string;
    revenue: number;
    min?: number;
    max?: number;
  }>;
}

export function RevenueForecastChart({ data }: RevenueForecastChartProps) {
  const formatCurrency = (value: number) => `€${value.toLocaleString()}`;
  
  // Determine where the forecast part begins
  const forecastStartIndex = data.findIndex(item => item.min !== undefined && item.max !== undefined);
  
  return (
    <div className="h-[240px] relative">
      {forecastStartIndex > 0 && (
        <div className="absolute top-0 bottom-0 border-l border-dashed border-muted-foreground" 
             style={{ left: `${(forecastStartIndex / data.length) * 100}%` }}>
        </div>
      )}
      {forecastStartIndex > 0 && (
        <div className="absolute top-0 text-xs text-muted-foreground px-1 bg-background rounded" 
             style={{ left: `${(forecastStartIndex / data.length) * 100}%`, transform: 'translateX(-50%)' }}>
          Forecast →
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
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
            name="Min Range"
          />
          <Area 
            type="monotone" 
            dataKey="max" 
            stackId="1"
            stroke="transparent"
            fill="url(#colorRange)" 
            fillOpacity={0.3}
            name="Max Range"
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#02B1C4" 
            strokeWidth={2}
            activeDot={{ r: 8 }}
            name="Projected Revenue"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
