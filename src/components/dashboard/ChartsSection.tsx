
import { ChartGrid } from "@/components/dashboard/charts/ChartGrid";
import { RevenueChart } from "@/components/dashboard/charts/RevenueChart";
import { ClientsChart } from "@/components/dashboard/charts/ClientsChart";
import { MonthlyNotesContainer } from "@/components/dashboard/charts/MonthlyNotesContainer";
import { SecondaryMetricsContainer } from "@/components/dashboard/charts/SecondaryMetricsContainer";
import { SalesGoalsChart } from "@/components/dashboard/charts/SalesGoalsChart";
import { CategoryRevenueContainer } from "@/components/dashboard/charts/CategoryRevenueContainer";
import { HistoricalComparisonContainer } from "@/components/dashboard/charts/HistoricalComparisonContainer";
import { RevenueForecastContainer } from "@/components/dashboard/charts/RevenueForecastContainer";
import { ProductPerformanceContainer } from "@/components/dashboard/charts/ProductPerformanceContainer";
import { ExpensesChartContainer } from "@/components/dashboard/charts/ExpensesChartContainer";

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
    <ChartGrid>
      <RevenueChart data={salesData} />
      <MonthlyNotesContainer show={showMonthlyNotes} />
      <ClientsChart data={clientsData} />
      <SecondaryMetricsContainer show={showSecondaryMetrics} />
      <SalesGoalsChart data={salesVsGoalsData} />
      <CategoryRevenueContainer data={categoryRevenueData} />
      <HistoricalComparisonContainer />
      <RevenueForecastContainer />
      <ProductPerformanceContainer />
      <ExpensesChartContainer data={expensesData} show={showExpensesChart} />
    </ChartGrid>
  );
}
