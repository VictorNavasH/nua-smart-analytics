
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { ChartCard } from "@/components/dashboard/Chart";

interface ComparisonData {
  name: string;
  actual: number;
  goal: number;
}

interface ComparisonChartProps {
  data: ComparisonData[];
  title: string;
  subtitle?: string;
}

export function ComparisonChart({ data, title, subtitle }: ComparisonChartProps) {
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => {
              return [`€${value}`, name === "actual" ? "Actual" : "Objetivo"];
            }}
          />
          <Legend 
            formatter={(value) => {
              return value === "actual" ? "Ventas Reales" : "Objetivo";
            }}
          />
          <Bar dataKey="actual" fill="#02B1C4" name="actual" radius={[4, 4, 0, 0]} />
          <Bar dataKey="goal" fill="#FFCE85" name="goal" radius={[4, 4, 0, 0]} />
          <ReferenceLine y={0} stroke="#000" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
