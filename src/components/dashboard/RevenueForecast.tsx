
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RevenueForecastChart } from "@/components/dashboard/RevenueForecastChart";
import { RevenueForecastControls } from "@/components/dashboard/RevenueForecastControls";
import { revenueForecastData } from "@/data/dashboardData";
import { Button } from "@/components/ui/button";
import { RotateCcw, RefreshCw, TrendingUp, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RevenueForecastProps {
  title?: string;
}

export function RevenueForecast({ title = "Previsión de Ingresos" }: RevenueForecastProps) {
  const [growthRate, setGrowthRate] = useState<number>(5);
  const [seasonality, setSeasonality] = useState<number>(10);
  const [isRecalculating, setIsRecalculating] = useState(false);
  
  const resetControls = () => {
    setGrowthRate(5);
    setSeasonality(10);
  };
  
  const recalculateForecast = () => {
    setIsRecalculating(true);
    
    // Simulamos un tiempo de cálculo
    setTimeout(() => {
      setIsRecalculating(false);
    }, 800);
  };
  
  // Combinar datos históricos y previsión
  const combinedData = [
    ...revenueForecastData.historical,
    ...revenueForecastData.forecast.map(item => {
      // Aplicar tasa de crecimiento y ajustes de estacionalidad
      const adjustedRevenue = item.revenue * (1 + (growthRate - 5) / 100);
      const seasonalFactor = 1 + ((seasonality - 10) / 100) * (item.month === "Nov" || item.month === "Dec" ? 1 : 0.2);
      
      return {
        ...item,
        revenue: Math.round(adjustedRevenue * seasonalFactor),
        min: Math.round(item.min * (1 + (growthRate - 6) / 100) * seasonalFactor * 0.9),
        max: Math.round(item.max * (1 + (growthRate - 4) / 100) * seasonalFactor * 1.1)
      };
    })
  ];
  
  // Agregamos un efecto para recalcular cuando cambian los controles
  useEffect(() => {
    const timer = setTimeout(() => {
      recalculateForecast();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [growthRate, seasonality]);
  
  return (
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-nua-turquoise rounded-xl overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-start justify-between bg-gradient-to-r from-white to-nua-turquoise/5">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-medium text-nua-navy">{title}</CardTitle>
            <Badge variant="outline" className="bg-nua-turquoise/10 text-nua-turquoise">
              <TrendingUp className="h-3 w-3 mr-1" />
              Modelado
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-nua-navy/60 hover:text-nua-turquoise">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>El factor de estacionalidad ajusta las proyecciones según patrones históricos en ciertos periodos.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription className="text-nua-navy/70 max-w-[80%]">
            Proyección de ingresos según tasa de crecimiento y estacionalidad
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={recalculateForecast} 
            title="Recalcular con los parámetros actuales"
            className="hover:bg-nua-turquoise/10 border-nua-turquoise/50 transition-all duration-300 hover:scale-105"
            disabled={isRecalculating}
          >
            <RefreshCw className={`h-4 w-4 text-nua-turquoise ${isRecalculating ? 'animate-spin' : ''}`} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={resetControls} 
            title="Restablecer valores predeterminados"
            className="hover:bg-nua-turquoise/10 border-nua-turquoise/50 transition-all duration-300 hover:scale-105"
          >
            <RotateCcw className="h-4 w-4 text-nua-turquoise" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <div className={`transition-opacity duration-300 ${isRecalculating ? 'opacity-50' : 'opacity-100'}`}>
          <div className="w-full">
            <RevenueForecastChart data={combinedData} />
          </div>
          <RevenueForecastControls 
            growthRate={growthRate}
            seasonality={seasonality}
            onGrowthRateChange={setGrowthRate}
            onSeasonalityChange={setSeasonality}
          />
        </div>
      </CardContent>
    </Card>
  );
}
