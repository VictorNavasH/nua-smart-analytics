
import { useState } from "react";
import { FinancialAlert } from "@/components/dashboard/FinancialAlert";
import { exportData } from "@/services/exportService";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { StatsSection } from "@/components/dashboard/StatsSection";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { useDashboardAlerts } from "@/hooks/useDashboardAlerts";
import { useDashboardSettings } from "@/hooks/useDashboardSettings";
import { useDateRange } from "@/hooks/useDateRange";
import { useVisualFeedback } from "@/hooks/useVisualFeedback";
import { 
  salesData, clientsData, expensesData, financeConstants, 
  salesVsGoalsData, categoryRevenueData, customerLoyaltyData 
} from "@/data/dashboardData";

export default function DashboardPage() {
  const { settings, setSettings } = useDashboardSettings();
  const { alerts, dismissAlert } = useDashboardAlerts();
  const { dateRange, setDateRange } = useDateRange();
  const { showSuccess } = useVisualFeedback();
  
  const handleExport = async (type: "csv" | "excel") => {
    // Here we would handle real data export based on dateRange
    const columns = [
      { key: "name", label: "Período" },
      { key: "ventas", label: "Ventas (€)" }
    ];
    
    try {
      await exportData(salesData, columns, type, `ventas_dashboard_${new Date().toISOString().split('T')[0]}`);
      showSuccess(`Datos exportados en formato ${type.toUpperCase()} correctamente`);
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  return (
    <div className="space-y-6 max-w-full">
      <DashboardHeader 
        settings={settings} 
        onSettingsChange={setSettings} 
      />
      
      <DashboardFilters 
        onRangeChange={setDateRange} 
        onExport={handleExport} 
      />

      {/* Destacar KPIs principales primero, fuera de los tabs */}
      <div className="bg-background/60 p-4 rounded-lg border shadow-sm animate-fade-in">
        <h2 className="text-xl font-semibold mb-4 text-nua-turquoise">KPIs Financieros Principales</h2>
        <StatsSection 
          currentSales={financeConstants.currentSales} 
          monthlyGoal={financeConstants.monthlyGoal} 
          showProgressBars={settings.showProgressBars}
          customerLoyalty={customerLoyaltyData}
        />
      </div>

      {alerts.map(alert => (
        <FinancialAlert
          key={alert.id}
          type={alert.type}
          title={alert.title}
          description={alert.description}
          threshold={alert.threshold}
          current={alert.current}
          onDismiss={() => dismissAlert(alert.id)}
        />
      ))}

      <DashboardTabs>
        <ChartsSection 
          salesData={salesData}
          clientsData={clientsData}
          expensesData={expensesData}
          salesVsGoalsData={salesVsGoalsData}
          categoryRevenueData={categoryRevenueData}
          showMonthlyNotes={settings.showMonthlyNotes}
          showSecondaryMetrics={settings.showSecondaryMetrics}
          showExpensesChart={settings.showExpensesChart}
        />
      </DashboardTabs>
    </div>
  );
}
