
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FinancialHealthIndicatorProps {
  salesTrend: number;
  marginTrend: number;
  breakEvenStatus: boolean;
}

export function FinancialHealthIndicator({ 
  salesTrend, 
  marginTrend, 
  breakEvenStatus 
}: FinancialHealthIndicatorProps) {
  const getHealthStatus = () => {
    // Estado Rojo: Por debajo del punto de equilibrio
    if (breakEvenStatus) return "red";
    
    // Estado Amarillo: Ventas o margen en tendencia negativa
    if (salesTrend < 0 || marginTrend < 0) return "yellow";
    
    // Estado Verde: Todo bien
    return "green";
  };
  
  const statusColor = getHealthStatus();
  
  const getStatusText = () => {
    switch (statusColor) {
      case "red":
        return "Estado crítico: No se alcanza el punto de equilibrio";
      case "yellow":
        return "Precaución: Tendencia negativa en ventas o margen";
      case "green":
        return "Óptimo: Tendencias positivas, por encima del punto de equilibrio";
      default:
        return "";
    }
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center space-x-1">
            <div 
              className={`w-4 h-4 rounded-full ${
                statusColor === "red" ? "bg-red-500" : 
                statusColor === "yellow" ? "bg-orange-400" : 
                "bg-green-500"
              }`}
            />
            <span className="text-sm font-medium">
              Estado financiero
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getStatusText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
