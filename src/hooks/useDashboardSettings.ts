
import { useState } from "react";

export interface DashboardSettings {
  showSecondaryMetrics: boolean;
  showMonthlyNotes: boolean;
  showProgressBars: boolean;
  showExpensesChart: boolean;
}

export function useDashboardSettings() {
  const [settings, setSettings] = useState<DashboardSettings>({
    showSecondaryMetrics: true,
    showMonthlyNotes: true,
    showProgressBars: true,
    showExpensesChart: true,
  });
  
  return {
    settings,
    setSettings
  };
}
