
import { ExpensesChart } from "@/components/dashboard/ExpensesChart";

interface ExpensesChartContainerProps {
  data: Array<{ name: string; value: number }>;
  show: boolean;
}

export function ExpensesChartContainer({ data, show }: ExpensesChartContainerProps) {
  if (!show) return null;
  
  return (
    <div className="col-span-6 md:col-span-6">
      <ExpensesChart data={data} />
    </div>
  );
}
