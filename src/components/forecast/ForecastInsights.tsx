
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartForecast } from "@/lib/supabase/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LightbulbIcon, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { TrendIndicator } from "@/components/dashboard/TrendIndicator";

interface ForecastInsightsProps {
  forecasts: SmartForecast[];
}

export function ForecastInsights({ forecasts }: ForecastInsightsProps) {
  if (forecasts.length === 0) {
    return null;
  }

  // Analizar los datos para generar insights
  const trends = calculateTrends(forecasts);
  const insights = generateInsights(forecasts, trends);

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg text-nua-navy">
          <LightbulbIcon className="mr-2 h-5 w-5 text-nua-yellow" />
          Insights y Recomendaciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <Alert
              key={index}
              variant={insight.type === "success" ? "default" : insight.type}
              className={`
                ${insight.type === "success" ? "border-green-500 bg-green-50" : ""}
                ${insight.type === "warning" ? "border-yellow-500 bg-yellow-50" : ""}
                ${insight.type === "destructive" ? "border-red-500 bg-red-50" : ""}
                ${insight.type === "default" ? "border-blue-500 bg-blue-50" : ""}
              `}
            >
              {insight.type === "success" && (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )}
              {insight.type === "warning" && (
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              )}
              {insight.type === "destructive" && (
                <AlertTriangle className="h-4 w-4 text-red-500" />
              )}
              {insight.type === "default" && (
                <TrendingUp className="h-4 w-4 text-blue-500" />
              )}
              <AlertTitle className="text-gray-800">{insight.title}</AlertTitle>
              <AlertDescription className="text-gray-600">
                {insight.description}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Función para calcular tendencias
function calculateTrends(forecasts: SmartForecast[]) {
  if (forecasts.length < 7) return { weekly: 0, monthly: 0 };

  const firstWeek = forecasts.slice(0, 7);
  const secondWeek = forecasts.slice(7, 14);
  
  const firstWeekAvg = firstWeek.reduce((sum, f) => sum + f.daily_forecast, 0) / 7;
  const secondWeekAvg = secondWeek.reduce((sum, f) => sum + f.daily_forecast, 0) / 7;
  
  const weeklyTrend = ((secondWeekAvg - firstWeekAvg) / firstWeekAvg) * 100;
  
  // Tendencia mensual (simplificada)
  const firstMonth = forecasts.slice(0, 30);
  const monthlyAvg = firstMonth.reduce((sum, f) => sum + f.daily_forecast, 0) / 30;
  const monthlyTrend = forecasts[0].previous_period_comparison;
  
  return {
    weekly: Number(weeklyTrend.toFixed(2)),
    monthly: Number(monthlyTrend.toFixed(2))
  };
}

// Función para generar insights
function generateInsights(forecasts: SmartForecast[], trends: { weekly: number; monthly: number }) {
  const insights = [];
  
  // Insight sobre la tendencia semanal
  if (trends.weekly > 5) {
    insights.push({
      type: "success" as const,
      title: "Crecimiento semanal fuerte",
      description: `Se prevé un crecimiento del ${trends.weekly.toFixed(1)}% para la próxima semana. Asegúrate de tener suficiente personal y stock.`
    });
  } else if (trends.weekly < -5) {
    insights.push({
      type: "destructive" as const,
      title: "Caída semanal significativa",
      description: `Se prevé una caída del ${Math.abs(trends.weekly).toFixed(1)}% para la próxima semana. Considera ajustar las compras y horarios de personal.`
    });
  } else {
    insights.push({
      type: "default" as const,
      title: "Ventas semanales estables",
      description: `Se prevé una tendencia estable (${trends.weekly.toFixed(1)}%) en las ventas de la próxima semana.`
    });
  }
  
  // Insight sobre fin de semana
  const weekend = forecasts.slice(0, 7).filter((f, i) => i === 5 || i === 6);
  const weekendTotal = weekend.reduce((sum, f) => sum + f.daily_forecast, 0);
  const weekdayAvg = forecasts.slice(0, 5).reduce((sum, f) => sum + f.daily_forecast, 0) / 5;
  const weekendAvg = weekendTotal / 2;
  const weekendDiff = ((weekendAvg - weekdayAvg) / weekdayAvg) * 100;
  
  if (weekendDiff > 20) {
    insights.push({
      type: "warning" as const,
      title: "Fin de semana muy activo",
      description: `El fin de semana será un ${weekendDiff.toFixed(0)}% más activo que los días laborables. Refuerza el personal y asegura suficiente stock.`
    });
  }
  
  // Insight sobre días específicos
  const strongestDay = [...forecasts.slice(0, 7)].sort((a, b) => b.daily_forecast - a.daily_forecast)[0];
  const weakestDay = [...forecasts.slice(0, 7)].sort((a, b) => a.daily_forecast - b.daily_forecast)[0];
  const strongestDayName = new Date(strongestDay.date).toLocaleDateString('es-ES', { weekday: 'long' });
  const weakestDayName = new Date(weakestDay.date).toLocaleDateString('es-ES', { weekday: 'long' });
  
  insights.push({
    type: "default" as const,
    title: "Picos y valles semanales",
    description: `${strongestDayName} será tu día más fuerte (${strongestDay.daily_forecast.toLocaleString()}€) y ${weakestDayName} el más suave (${weakestDay.daily_forecast.toLocaleString()}€).`
  });
  
  // Insight sobre comparación con el año anterior
  if (forecasts[0].previous_period_comparison > 10) {
    insights.push({
      type: "success" as const,
      title: "Mejora vs. año anterior",
      description: `Estás superando las cifras del año anterior en un ${forecasts[0].previous_period_comparison.toFixed(1)}%. Mantén la estrategia actual.`
    });
  } else if (forecasts[0].previous_period_comparison < -10) {
    insights.push({
      type: "destructive" as const,
      title: "Rendimiento bajo vs. año anterior",
      description: `Estás por debajo del año anterior en un ${Math.abs(forecasts[0].previous_period_comparison).toFixed(1)}%. Revisa tus estrategias de venta y promoción.`
    });
  }
  
  return insights;
}
