
import { AlertTriangle, TrendingDown, TrendingUp, X, AlertCircle, CheckCircle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type AlertType = "warning" | "danger" | "success" | "info";

interface FinancialAlertProps {
  type: AlertType;
  title: string;
  description: string;
  threshold?: number;
  current?: number;
  onDismiss?: () => void;
  className?: string;
}

export function FinancialAlert({ 
  type, 
  title, 
  description, 
  threshold, 
  current,
  onDismiss,
  className 
}: FinancialAlertProps) {
  const getIcon = () => {
    switch (type) {
      case "danger":
        return <AlertCircle className="h-4 w-4" />;
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      case "info":
        return <Info className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    switch (type) {
      case "danger":
        return "destructive";
      case "success":
        return "default";
      case "warning":
        return "warning"; // Estilizado a través de className
      case "info":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <Alert 
      variant={getVariant() as any} 
      className={cn(
        "relative animate-fade-in", 
        type === "warning" && "border-yellow-500 bg-yellow-50 text-yellow-800",
        className
      )}
    >
      {getIcon()}
      <AlertTitle className="flex items-center gap-2">
        {title}
        {threshold && current && (
          <Badge variant={type === "success" ? "outline" : "secondary"} className="ml-2">
            {type === "danger" ? "Por debajo" : type === "success" ? "Superado" : "Cercano"} al umbral
          </Badge>
        )}
      </AlertTitle>
      <AlertDescription className="pt-1">
        {description}
        {threshold && current && (
          <div className="mt-1 text-xs">
            Valor actual: {current.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} | 
            Umbral: {threshold.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </div>
        )}
      </AlertDescription>
      {onDismiss && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 h-6 w-6 rounded-full p-0" 
          onClick={onDismiss}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </Alert>
  );
}
