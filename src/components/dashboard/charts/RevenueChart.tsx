
import { ChartCard, NuaLineChart } from "@/components/dashboard/Chart";

interface RevenueChartProps {
  data: Array<{ name: string; ventas: number }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="col-span-3 md:col-span-2">
      <ChartCard title="Ingresos por Mes" subtitle="Últimos 7 meses">
        <NuaLineChart 
          data={data} 
          dataKey="ventas" 
          stroke="#02B1C4"
        />
      </ChartCard>
    </div>
  );
}
