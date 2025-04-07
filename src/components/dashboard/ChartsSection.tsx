
import { ChartCard, NuaLineChart, NuaBarChart } from "@/components/dashboard/Chart";
import { MonthlyNotes } from "@/components/dashboard/MonthlyNotes";
import { SecondaryMetrics } from "@/components/dashboard/SecondaryMetrics";
import { ExpensesChart } from "@/components/dashboard/ExpensesChart";
import { ComparisonChart } from "@/components/dashboard/ComparisonChart";
import { CategoryRevenue } from "@/components/dashboard/CategoryRevenue";
import { HistoricalComparison } from "@/components/dashboard/HistoricalComparison";
import { RevenueForecast } from "@/components/dashboard/RevenueForecast";
import { ProductPerformance } from "@/components/dashboard/ProductPerformance";

interface ChartsSectionProps {
  salesData: Array<{ name: string; ventas: number }>;
  clientsData: Array<{ name: string; clientes: number }>;
  expensesData: Array<{ name: string; value: number }>;
  salesVsGoalsData: Array<{ name: string; actual: number; goal: number }>;
  categoryRevenueData: Array<{ name: string; value: number; change: number; color: string }>;
  showMonthlyNotes: boolean;
  showSecondaryMetrics: boolean;
  showExpensesChart: boolean;
}

export function ChartsSection({ 
  salesData, 
  clientsData, 
  expensesData,
  salesVsGoalsData,
  categoryRevenueData,
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
      
      {/* New comparison chart */}
      <div className="col-span-3 md:col-span-2">
        <ComparisonChart 
          data={salesVsGoalsData} 
          title="Ventas vs Objetivos" 
          subtitle="Comparativa mensual"
        />
      </div>
      
      {/* New category revenue chart */}
      <div className="col-span-3 md:col-span-1">
        <CategoryRevenue 
          data={categoryRevenueData} 
          title="Ingresos por Categoría"
        />
      </div>
      
      {/* New historical comparison feature */}
      <div className="col-span-3 md:col-span-2">
        <HistoricalComparison title="Comparativa con Año Anterior" />
      </div>
      
      {/* New interactive revenue forecast chart */}
      <div className="col-span-3 md:col-span-1">
        <RevenueForecast />
      </div>
      
      {/* New product performance breakdown */}
      <div className="col-span-3">
        <ProductPerformance />
      </div>
      
      {showExpensesChart && (
        <div className="col-span-3">
          <ExpensesChart data={expensesData} />
        </div>
      )}
    </div>
  );
}
