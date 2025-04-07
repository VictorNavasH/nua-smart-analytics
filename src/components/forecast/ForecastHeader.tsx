
import { useState } from "react";
import { RestaurantSelector } from "@/components/dashboard/RestaurantSelector";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { DateRangeSelector } from "@/components/dashboard/DateRangeSelector";
import { Loader, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { generateForecasts } from "@/lib/supabase/smart-forecast";

interface ForecastHeaderProps {
  selectedRestaurantId: string;
  onRestaurantChange: (id: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export function ForecastHeader({
  selectedRestaurantId,
  onRestaurantChange,
  dateRange,
  onDateRangeChange,
  onRefresh,
  isLoading
}: ForecastHeaderProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateForecasts = async () => {
    if (!selectedRestaurantId) {
      toast.error("Por favor selecciona un restaurante");
      return;
    }

    setIsGenerating(true);
    try {
      await generateForecasts(selectedRestaurantId);
      toast.success("Predicciones generadas correctamente");
      onRefresh();
    } catch (error) {
      console.error("Error al generar predicciones:", error);
      toast.error("Error al generar predicciones");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-end w-full">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[#02f2d2] to-[#02b1c4] bg-clip-text text-transparent">
          Smart Forecast
        </h1>
        <p className="text-muted-foreground">
          Predicciones inteligentes de ventas basadas en datos históricos
        </p>
      </div>

      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4 md:items-center">
        <RestaurantSelector
          value={selectedRestaurantId}
          onChange={onRestaurantChange}
        />

        <DateRangeSelector
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
        />

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-1"
            onClick={onRefresh}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span>Actualizar</span>
          </Button>

          <Button
            variant="default"
            size="sm"
            className="flex items-center space-x-1 bg-gradient-to-r from-[#02f2d2] to-[#02b1c4] hover:from-[#02b1c4] hover:to-[#02f2d2]"
            onClick={handleGenerateForecasts}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span>Generar Predicciones</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
