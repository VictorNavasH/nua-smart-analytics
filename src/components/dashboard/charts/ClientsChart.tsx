
import { ChartCard, NuaBarChart } from "@/components/dashboard/Chart";

interface ClientsChartProps {
  data: Array<{ name: string; clientes: number }>;
}

export function ClientsChart({ data }: ClientsChartProps) {
  return (
    <div className="col-span-6 md:col-span-3">
      <ChartCard title="Clientes por Día" subtitle="Últimos 7 días">
        <NuaBarChart 
          data={data} 
          dataKey="clientes" 
          barColor="#FF4797"
        />
      </ChartCard>
    </div>
  );
}
