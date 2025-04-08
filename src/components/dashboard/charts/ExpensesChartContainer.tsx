
import { ExpensesChart } from "@/components/dashboard/ExpensesChart";

interface ExpensesChartContainerProps {
  data: Array<{ name: string; value: number }>;
  show: boolean;
}

export function ExpensesChartContainer({ data, show }: ExpensesChartContainerProps) {
  if (!show) return null;
  
  return (
    <div className="w-full">
      <ExpensesChart data={data} />
    </div>
  );
}
