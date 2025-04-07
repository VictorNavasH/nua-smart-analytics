
import { ComparisonChart } from "@/components/dashboard/ComparisonChart";

interface SalesGoalsChartProps {
  data: Array<{ name: string; actual: number; goal: number }>;
}

export function SalesGoalsChart({ data }: SalesGoalsChartProps) {
  return (
    <div className="col-span-full lg:col-span-3 xl:col-span-3">
      <ComparisonChart 
        data={data} 
        title="Ventas vs Objetivos" 
        subtitle="Comparativa mensual"
      />
    </div>
  );
}
