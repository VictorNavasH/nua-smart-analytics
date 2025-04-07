
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
import { 
  salesData, clientsData, expensesData, financeConstants, 
  salesVsGoalsData, categoryRevenueData, customerLoyaltyData 
} from "@/data/dashboardData";

export default function DashboardPage() {
  const { settings, setSettings } = useDashboardSettings();
  const { alerts, dismissAlert } = useDashboardAlerts();
  const { dateRange, setDateRange } = useDateRange();
  
  const handleExport = async (type: "csv" | "excel") => {
    // Here we would handle real data export based on dateRange
    const columns = [
      { key: "name", label: "Período" },
      { key: "ventas", label: "Ventas (€)" }
    ];
    
    return await exportData(salesData, columns, type, `ventas_dashboard_${new Date().toISOString().split('T')[0]}`);
  };

  return (
    <div className="space-y-6">
      <DashboardHeader 
        settings={settings} 
        onSettingsChange={setSettings} 
      />
      
      <DashboardFilters 
        onRangeChange={setDateRange} 
        onExport={handleExport} 
      />

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
        <StatsSection 
          currentSales={financeConstants.currentSales} 
          monthlyGoal={financeConstants.monthlyGoal} 
          showProgressBars={settings.showProgressBars}
          customerLoyalty={customerLoyaltyData}
        />
        
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
