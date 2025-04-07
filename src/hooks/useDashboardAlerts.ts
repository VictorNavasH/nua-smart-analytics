
import { useState } from "react";

export interface Alert {
  id: string;
  type: "warning" | "danger" | "success" | "info";
  title: string;
  description: string;
  threshold?: number;
  current?: number;
}

export function useDashboardAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "danger",
      title: "Alerta de punto de equilibrio",
      description: "Las ventas actuales no alcanzan el punto de equilibrio. Es necesario tomar medidas.",
      threshold: 9500,
      current: 8700
    }
  ]);
  
  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return {
    alerts,
    dismissAlert
  };
}
