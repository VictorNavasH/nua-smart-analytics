
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';

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
  
  return (
    <div className="h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
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
  );
}
