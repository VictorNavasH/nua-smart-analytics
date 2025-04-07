
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, ArrowDownRight } from "lucide-react";

interface ProjectionAlertsProps {
  breakEvenStatus: boolean;
  currentMonthSales: number;
  breakEvenPoint: number;
  marginTrend: number;
}

export function ProjectionAlerts({ 
  breakEvenStatus, 
  currentMonthSales, 
  breakEvenPoint, 
  marginTrend 
}: ProjectionAlertsProps) {
  return (
    <>
      {breakEvenStatus && (
        <Alert variant="destructive" className="animate-fade-in">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Alerta de punto de equilibrio</AlertTitle>
          <AlertDescription>
            Las ventas actuales (€{currentMonthSales.toLocaleString()}) están por debajo del punto de equilibrio (€{breakEvenPoint.toLocaleString()}).
          </AlertDescription>
        </Alert>
      )}

      {marginTrend < 0 && (
        <Alert className="animate-fade-in border-orange-300 bg-orange-50 text-orange-800">
          <ArrowDownRight className="h-4 w-4 text-orange-500" />
          <AlertTitle>Disminución de margen</AlertTitle>
          <AlertDescription>
            El margen ha disminuido un {Math.abs(marginTrend)}% respecto al mes anterior.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
