
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LineChart, BarChart3, FilePlus, TrendingUp, Building } from "lucide-react";

export interface QuickLink {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
}

export function useQuickLinks() {
  const { isAdmin, isManager } = useAuth();
  
  // Filtrar enlaces rápidos según permisos del usuario
  const getQuickLinks = (): QuickLink[] => {
    const baseLinks: QuickLink[] = [{
      title: "Dashboard Financiero",
      description: "Ver indicadores clave de rendimiento y análisis de ventas",
      icon: <LineChart className="h-10 w-10 text-nua-turquoise" />,
      href: "/dashboard"
    }, {
      title: "Smart Forecast",
      description: "Predicciones inteligentes basadas en IA para tu negocio",
      icon: <BarChart3 className="h-10 w-10 text-nua-blue" />,
      href: "/smart-forecast"
    }];

    // Solo mostrar Cargar Datos si es admin o manager
    if (isAdmin || isManager) {
      baseLinks.push({
        title: "Cargar Datos",
        description: "Registrar ventas, gastos y otras transacciones",
        icon: <FilePlus className="h-10 w-10 text-nua-pink" />,
        href: "/data-entry"
      });
    }

    // Solo mostrar Proyecciones si es admin o manager
    if (isAdmin || isManager) {
      baseLinks.push({
        title: "Proyecciones",
        description: "Analizar tendencias y prever resultados futuros",
        icon: <TrendingUp className="h-10 w-10 text-nua-yellow" />,
        href: "/projections"
      });
    }

    // Solo administradores pueden ver gestión de restaurantes
    if (isAdmin) {
      baseLinks.push({
        title: "Restaurantes",
        description: "Gestionar locales y configuración de sucursales",
        icon: <Building className="h-10 w-10 text-green-500" />,
        href: "/restaurants"
      });
    }

    return baseLinks;
  };
  
  return getQuickLinks();
}
