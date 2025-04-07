
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
        <div className="absolute top-0 text-xs text-muted-foreground px-1 bg-background rounded shadow-sm" 
             style={{ left: `${(forecastStartIndex / data.length) * 100}%`, transform: 'translateX(-50%)' }}>
          <span className="font-medium text-nua-turquoise">Forecast →</span>
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
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#364F6B' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`} 
            tick={{ fill: '#364F6B' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <Tooltip 
            formatter={(value) => formatCurrency(Number(value))} 
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '0.5rem', 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e5e7eb'
            }}
            labelStyle={{ fontWeight: 'bold', color: '#364F6B' }}
          />
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
            activeDot={{ r: 8, fill: '#02B1C4', stroke: 'white', strokeWidth: 2 }}
            name="Projected Revenue"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
