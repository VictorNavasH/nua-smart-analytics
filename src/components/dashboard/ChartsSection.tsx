
import { ChartCard, NuaLineChart, NuaBarChart } from "@/components/dashboard/Chart";
import { MonthlyNotes } from "@/components/dashboard/MonthlyNotes";
import { SecondaryMetrics } from "@/components/dashboard/SecondaryMetrics";
import { ExpensesChart } from "@/components/dashboard/ExpensesChart";

interface ChartsSectionProps {
  salesData: Array<{ name: string; ventas: number }>;
  clientsData: Array<{ name: string; clientes: number }>;
  expensesData: Array<{ name: string; value: number }>;
  showMonthlyNotes: boolean;
  showSecondaryMetrics: boolean;
  showExpensesChart: boolean;
}

export function ChartsSection({ 
  salesData, 
  clientsData, 
  expensesData,
  showMonthlyNotes,
  showSecondaryMetrics,
  showExpensesChart
}: ChartsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-3 md:col-span-2">
        <ChartCard title="Ingresos por Mes" subtitle="Últimos 7 meses">
          <NuaLineChart 
            data={salesData} 
            dataKey="ventas" 
            stroke="#02B1C4"
          />
        </ChartCard>
      </div>
      {showMonthlyNotes && (
        <div className="col-span-3 md:col-span-1">
          <MonthlyNotes />
        </div>
      )}
      <div className="col-span-3 md:col-span-2">
        <ChartCard title="Clientes por Día" subtitle="Últimos 7 días">
          <NuaBarChart 
            data={clientsData} 
            dataKey="clientes" 
            barColor="#FF4797"
          />
        </ChartCard>
      </div>
      {showSecondaryMetrics && (
        <div className="col-span-3 md:col-span-1">
          <SecondaryMetrics />
        </div>
      )}
      {showExpensesChart && (
        <div className="col-span-3">
          <ExpensesChart data={expensesData} />
        </div>
      )}
    </div>
  );
}
