
import { useState, useEffect, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { useRestaurantStore } from "@/stores/restaurantStore";
import { DateRange } from "react-day-picker";
import { addDays, format, startOfToday } from "date-fns";
import { toast } from "sonner";
import { getSmartForecasts, generateForecasts } from "@/lib/supabase/smart-forecast";
import { ForecastHeader } from "@/components/forecast/ForecastHeader";
import { ForecastSummaryCards } from "@/components/forecast/ForecastSummaryCards";
import { ForecastCharts } from "@/components/forecast/ForecastCharts";
import { ForecastInsights } from "@/components/forecast/ForecastInsights";
import { NoDataPlaceholder } from "@/components/forecast/NoDataPlaceholder";
import { es } from "date-fns/locale";

export default function SmartForecastPage() {
  const { selectedRestaurantId, setSelectedRestaurantId } = useRestaurantStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [forecasts, setForecasts] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfToday(),
    to: addDays(startOfToday(), 30),
  });

  // Cargar predicciones cuando cambia el restaurante o el rango de fechas
  useEffect(() => {
    if (selectedRestaurantId) {
      loadForecasts();
    }
  }, [selectedRestaurantId, dateRange]);

  // Cargar predicciones
  const loadForecasts = async () => {
    if (!selectedRestaurantId) return;

    setIsLoading(true);
    try {
      const data = await getSmartForecasts(selectedRestaurantId);
      
      // Filtrar por rango de fechas si está definido
      let filteredData = data;
      if (dateRange?.from && dateRange?.to) {
        const fromStr = format(dateRange.from, "yyyy-MM-dd");
        const toStr = format(dateRange.to, "yyyy-MM-dd");
        
        filteredData = data.filter(
          (item) => item.date >= fromStr && item.date <= toStr
        );
      }
      
      setForecasts(filteredData);
    } catch (error) {
      console.error("Error al cargar predicciones:", error);
      toast.error("Error al cargar predicciones");
    } finally {
      setIsLoading(false);
    }
  };

  // Generar nuevas predicciones
  const handleGenerateForecasts = async () => {
    if (!selectedRestaurantId) {
      toast.error("Por favor selecciona un restaurante");
      return;
    }

    setIsGenerating(true);
    try {
      await generateForecasts(selectedRestaurantId);
      toast.success("Predicciones generadas correctamente");
      loadForecasts();
    } catch (error) {
      console.error("Error al generar predicciones:", error);
      toast.error("Error al generar predicciones. Asegúrate de tener suficientes datos históricos.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Formatear datos para gráficos
  const formattedData = useMemo(() => {
    if (forecasts.length === 0) return { weeklyData: [], monthlyData: [] };

    // Datos semanales (4 semanas)
    const weeklyData = [];
    for (let i = 0; i < 4; i++) {
      const weekForecasts = forecasts.slice(i * 7, (i + 1) * 7);
      if (weekForecasts.length === 0) continue;
      
      const weekAvg = weekForecasts.reduce((sum, f) => sum + f.daily_forecast, 0) / weekForecasts.length;
      const weekStartDate = new Date(weekForecasts[0].date);
      const weekEndDate = new Date(weekForecasts[weekForecasts.length - 1].date);
      
      weeklyData.push({
        name: `${format(weekStartDate, "dd/MM", { locale: es })} - ${format(weekEndDate, "dd/MM", { locale: es })}`,
        forecast: Math.round(weekAvg * 7), // total semanal
        lastYear: Math.round(weekAvg * 7 * (1 - weekForecasts[0].previous_period_comparison / 100)), // año anterior (simulado)
      });
    }

    // Datos mensuales (3 meses)
    const monthlyData = [];
    for (let i = 0; i < 3; i++) {
      const monthForecasts = forecasts.slice(i * 30, (i + 1) * 30);
      if (monthForecasts.length === 0) continue;
      
      const monthAvg = monthForecasts.reduce((sum, f) => sum + f.daily_forecast, 0) / monthForecasts.length;
      const monthStartDate = new Date(monthForecasts[0].date);
      
      monthlyData.push({
        name: format(monthStartDate, "MMMM", { locale: es }),
        forecast: Math.round(monthAvg * 30), // total mensual
        lastYear: Math.round(monthAvg * 30 * (1 - monthForecasts[0].previous_period_comparison / 100)), // año anterior (simulado)
      });
    }

    return { weeklyData, monthlyData };
  }, [forecasts]);

  // Datos para las tarjetas resumen
  const summaryData = useMemo(() => {
    if (forecasts.length === 0) return {
      dailyForecast: undefined,
      weeklyForecast: undefined,
      monthlyForecast: undefined,
      dailyComparison: undefined,
      weeklyComparison: undefined,
      monthlyComparison: undefined,
    };

    const dailyForecast = forecasts[0];
    
    // Calcular promedios semanales y mensuales
    const weeklyForecasts = forecasts.slice(0, 7);
    const monthlyForecasts = forecasts.slice(0, 30);
    
    const weeklyTotal = weeklyForecasts.reduce((sum, f) => sum + f.daily_forecast, 0);
    const monthlyTotal = monthlyForecasts.reduce((sum, f) => sum + f.daily_forecast, 0);
    
    // Comparaciones porcentuales (para simplificar, usamos la comparación del primer día)
    const dailyComparison = dailyForecast?.previous_period_comparison || 0;
    
    // Para comparaciones semanales y mensuales, calculamos un promedio ponderado simple
    const weeklyComparison = weeklyForecasts.reduce((sum, f) => sum + f.previous_period_comparison, 0) / weeklyForecasts.length;
    const monthlyComparison = monthlyForecasts.reduce((sum, f) => sum + f.previous_period_comparison, 0) / monthlyForecasts.length;

    return {
      dailyForecast,
      weeklyForecast: weeklyTotal,
      monthlyForecast: monthlyTotal,
      dailyComparison,
      weeklyComparison,
      monthlyComparison,
    };
  }, [forecasts]);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <ForecastHeader
          selectedRestaurantId={selectedRestaurantId}
          onRestaurantChange={setSelectedRestaurantId}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onRefresh={loadForecasts}
          isLoading={isLoading}
        />

        {forecasts.length === 0 ? (
          <NoDataPlaceholder
            onGenerate={handleGenerateForecasts}
            isLoading={isGenerating}
          />
        ) : (
          <div className="space-y-6">
            <ForecastSummaryCards
              dailyForecast={summaryData.dailyForecast}
              weeklyForecast={summaryData.weeklyForecast}
              monthlyForecast={summaryData.monthlyForecast}
              dailyComparison={summaryData.dailyComparison}
              weeklyComparison={summaryData.weeklyComparison}
              monthlyComparison={summaryData.monthlyComparison}
            />
            
            <ForecastCharts
              forecasts={forecasts}
              weeklyData={formattedData.weeklyData}
              monthlyData={formattedData.monthlyData}
            />
            
            <ForecastInsights forecasts={forecasts} />
          </div>
        )}
      </div>
    </Layout>
  );
}
