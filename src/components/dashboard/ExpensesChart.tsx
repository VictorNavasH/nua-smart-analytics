
import { ChartCard, NuaPieChart } from "@/components/dashboard/Chart";

interface ExpensesChartProps {
  data: Array<{ name: string; value: number }>;
}

export function ExpensesChart({ data }: ExpensesChartProps) {
  return (
    <ChartCard title="Distribución de Gastos" subtitle="Porcentaje por categoría">
      <NuaPieChart 
        data={data} 
        dataKey="value" 
        nameKey="name"
        colors={["#02B1C4", "#FF4797", "#FFCE85", "#364F6B", "#7048e8"]}
      />
    </ChartCard>
  );
}
