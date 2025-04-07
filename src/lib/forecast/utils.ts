
import { FinancialData } from "../supabase/types";

// Función simple para calcular la tendencia basada en datos históricos
export function calculateTrend(historicalData: FinancialData[]): number {
  if (historicalData.length < 2) return 0;
  
  // Ordenar datos por fecha
  const sortedData = [...historicalData].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Calcular cambio porcentual entre el primer y último período
  const firstValue = sortedData[0].revenue;
  const lastValue = sortedData[sortedData.length - 1].revenue;
  
  if (firstValue === 0) return 0;
  return Number((((lastValue - firstValue) / firstValue) * 100).toFixed(2));
}

// Predicción simple basada en regresión lineal básica
export function predictSales(
  historicalData: FinancialData[], 
  daysToPredict: number
): number[] {
  if (historicalData.length < 7) {
    // Datos insuficientes, retornar un valor estimado basado en el promedio
    const avgRevenue = historicalData.reduce((sum, item) => sum + item.revenue, 0) / historicalData.length;
    return Array(daysToPredict).fill(avgRevenue);
  }
  
  // Modelo simple: Promedio móvil de los últimos 7 días + factor de tendencia
  const sortedData = [...historicalData].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  const recentData = sortedData.slice(-7);
  const avgRecent = recentData.reduce((sum, item) => sum + item.revenue, 0) / recentData.length;
  
  // Calcular tendencia (cambio porcentual diario promedio)
  const trend = calculateTrend(recentData) / 7; // tendencia diaria aproximada
  
  // Generar predicciones aplicando la tendencia
  return Array(daysToPredict).fill(0).map((_, index) => {
    return Number((avgRecent * (1 + (trend / 100) * (index + 1))).toFixed(2));
  });
}

// Función para obtener día de la semana
export function getDayOfWeek(date: Date): string {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return days[date.getDay()];
}

// Calcular el promedio semanal y mensual a partir de predicciones diarias
export function calculateAggregates(dailyPredictions: number[]): { 
  weekly: number;
  monthly: number;
} {
  if (dailyPredictions.length === 0) return { weekly: 0, monthly: 0 };
  
  const weeklyAvg = dailyPredictions.slice(0, Math.min(7, dailyPredictions.length))
    .reduce((sum, val) => sum + val, 0) / Math.min(7, dailyPredictions.length);
  
  const monthlyAvg = dailyPredictions.slice(0, Math.min(30, dailyPredictions.length))
    .reduce((sum, val) => sum + val, 0) / Math.min(30, dailyPredictions.length);
  
  return {
    weekly: Number(weeklyAvg.toFixed(2)),
    monthly: Number(monthlyAvg.toFixed(2))
  };
}

// Formatear datos para las gráficas
export function formatChartData(
  dailyPredictions: number[], 
  startDate: Date
): { name: string; forecast: number; day: string }[] {
  return dailyPredictions.map((value, index) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + index);
    return {
      name: date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
      forecast: value,
      day: getDayOfWeek(date)
    };
  });
}

// Comparar con el mismo período del año anterior 
export function compareWithPreviousPeriod(
  currentPrediction: number, 
  previousPeriodData?: number
): number {
  if (!previousPeriodData) return 0;
  if (previousPeriodData === 0) return 100;
  
  return Number((((currentPrediction - previousPeriodData) / previousPeriodData) * 100).toFixed(2));
}

// Función para determinar el color basado en la tendencia
export function getTrendColor(trendValue: number): string {
  if (trendValue > 5) return "text-green-500";
  if (trendValue < -5) return "text-red-500";
  return "text-yellow-500";
}

// Función para determinar el emoji basado en la tendencia
export function getTrendEmoji(trendValue: number): string {
  if (trendValue > 5) return "📈";
  if (trendValue < -5) return "📉";
  return "➡️";
}
