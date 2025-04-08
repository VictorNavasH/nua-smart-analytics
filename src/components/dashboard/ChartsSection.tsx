
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
import { AIPredictionContainer } from "@/components/dashboard/charts/AIPredictionContainer";
import { ProfitabilityAnalysisContainer } from "@/components/dashboard/charts/ProfitabilityAnalysisContainer";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

interface ChartsSectionProps {
  salesData: Array<{ name: string; ventas: number }>;
  clientsData: Array<{ name: string; clientes: number }>;
  expensesData: Array<{ name: string; value: number }>;
  salesVsGoalsData: Array<{ name: string; actual: number; goal: number }>;
  categoryRevenueData: Array<{ name: string; value: number; change: number; color: string }>;
  showMonthlyNotes: boolean;
  showSecondaryMetrics: boolean;
  showExpensesChart: boolean;
  showAIPredictions: boolean;
}

export function ChartsSection({ 
  salesData, 
  clientsData, 
  expensesData,
  salesVsGoalsData,
  categoryRevenueData,
  showMonthlyNotes,
  showSecondaryMetrics,
  showExpensesChart,
  showAIPredictions
}: ChartsSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Simulate data loading to fix the "thinking" issue
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <div className="bg-background/60 p-4 rounded-lg border shadow-sm">
          <h2 className="text-lg font-medium mb-4">Tendencias Principales</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-[350px] w-full" />
            <Skeleton className="h-[350px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Primera sección: Gráficos primarios */}
      <div className="bg-background/60 p-4 rounded-lg border shadow-sm">
        <h2 className="text-lg font-medium mb-4">Tendencias Principales</h2>
        <ChartGrid>
          <RevenueChart data={salesData} />
          <ClientsChart data={clientsData} />
        </ChartGrid>
        
        {/* Sección de notas y métricas secundarias - Ahora debajo de los gráficos principales */}
        {(showMonthlyNotes || showSecondaryMetrics) && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {showMonthlyNotes && <MonthlyNotesContainer show={showMonthlyNotes} />}
            {showSecondaryMetrics && <SecondaryMetricsContainer show={showSecondaryMetrics} />}
          </div>
        )}
      </div>
      
      {/* Segunda sección: Comparativa de ventas vs objetivos */}
      <div className="bg-background/60 p-4 rounded-lg border shadow-sm">
        <h2 className="text-lg font-medium mb-4">Ventas vs Objetivos</h2>
        <ChartGrid>
          <SalesGoalsChart data={salesVsGoalsData} />
          <CategoryRevenueContainer data={categoryRevenueData} />
        </ChartGrid>
      </div>
      
      {/* Nueva sección: Análisis de Rentabilidad */}
      <div className="bg-background/60 p-4 rounded-lg border shadow-sm">
        <h2 className="text-lg font-medium mb-4">Análisis de Rentabilidad</h2>
        <ChartGrid>
          <ProfitabilityAnalysisContainer />
          {showExpensesChart && <ExpensesChartContainer data={expensesData} show={showExpensesChart} />}
        </ChartGrid>
      </div>
      
      {/* Sección: Predicciones IA y Análisis Avanzado */}
      <div className="bg-background/60 p-4 rounded-lg border shadow-sm">
        <h2 className="text-lg font-medium mb-4">Predicciones y Análisis Avanzado</h2>
        <ChartGrid>
          {showAIPredictions && <AIPredictionContainer />}
          <RevenueForecastContainer />
        </ChartGrid>
      </div>
      
      {/* Cuarta sección: Análisis histórico y comparativo */}
      <div className="bg-background/60 p-4 rounded-lg border shadow-sm">
        <h2 className="text-lg font-medium mb-4">Análisis Histórico y Comparativo</h2>
        <ChartGrid>
          <HistoricalComparisonContainer title="Comparativa con Año Anterior" />
          <ProductPerformanceContainer />
        </ChartGrid>
      </div>
    </div>
  );
}
