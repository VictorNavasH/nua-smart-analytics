
import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { WelcomeMessage } from "@/components/dashboard/WelcomeMessage";
import { 
  salesData, clientsData, expensesData, financeConstants, 
  salesVsGoalsData, categoryRevenueData, customerLoyaltyData 
} from "@/data/dashboardData";

export default function DashboardPage() {
  const { settings, setSettings } = useDashboardSettings();
  const { alerts, dismissAlert } = useDashboardAlerts();
  const { dateRange, setDateRange } = useDateRange();
  const { showSuccess } = useVisualFeedback();
  const [showWelcome, setShowWelcome] = useState(true);
  
  const handleExport = async (type: "csv" | "excel"): Promise<boolean> => {
    // Here we would handle real data export based on dateRange
    const columns = [
      { key: "name", label: "Período" },
      { key: "ventas", label: "Ventas (€)" }
    ];
    
    try {
      await exportData(salesData, columns, type, `ventas_dashboard_${new Date().toISOString().split('T')[0]}`);
      showSuccess(`Datos exportados en formato ${type.toUpperCase()} correctamente`);
      return true; // Indicate success
    } catch (error) {
      console.error("Error exporting data:", error);
      return false; // Indicate failure
    }
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-full animate-fade-in">
        {showWelcome && <WelcomeMessage onClose={() => setShowWelcome(false)} />}
        
        <div className="flex justify-between items-center">
          <DashboardHeader 
            settings={settings} 
            onSettingsChange={setSettings} 
          />
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2 text-nua-navy hover:text-nua-turquoise">
              <Home className="h-4 w-4" />
              <span className="hidden md:inline">Volver a Inicio</span>
            </Button>
          </Link>
        </div>
        
        <DashboardFilters 
          onRangeChange={setDateRange} 
          onExport={handleExport} 
        />

        {/* Destacar KPIs principales primero, fuera de los tabs */}
        <div className="bg-background/60 p-4 md:p-6 rounded-lg border shadow-sm animate-fade-in">
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
            showAIPredictions={settings.showAIPredictions}
          />
        </DashboardTabs>
      </div>
    </Layout>
  );
}
