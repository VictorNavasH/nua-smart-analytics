
import { supabase } from './client';
import type { SmartForecast } from './types';
import { calculateAggregates, predictSales } from '../forecast/utils';
import { getFinancialData } from './financial-data';

// Función para obtener predicciones existentes
export async function getSmartForecasts(restaurantId: string) {
  const { data, error } = await supabase
    .from('smart_forecasts')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .order('date', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

// Función para generar nuevas predicciones basadas en datos históricos
export async function generateForecasts(restaurantId: string) {
  try {
    // Obtener datos históricos de los últimos 30 días
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    const historicalData = await getFinancialData(
      restaurantId, 
      startDate.toISOString().split('T')[0], 
      endDate.toISOString().split('T')[0]
    );
    
    if (historicalData.length < 7) {
      throw new Error("Datos históricos insuficientes para generar predicciones");
    }
    
    // Generar predicciones para los próximos 90 días
    const dailyPredictions = predictSales(historicalData, 90);
    
    // Preparar datos para insertar
    const forecastRecords: Omit<SmartForecast, 'id' | 'created_at'>[] = [];
    
    for (let i = 0; i < dailyPredictions.length; i++) {
      const forecastDate = new Date();
      forecastDate.setDate(forecastDate.getDate() + i);
      
      // Calcular agregados (semanal y mensual)
      const remainingDays = dailyPredictions.slice(i);
      const { weekly, monthly } = calculateAggregates(remainingDays);
      
      // Determinar si es día festivo (simplificado, podría mejorarse)
      const isHoliday = forecastDate.getDay() === 0 || forecastDate.getDay() === 6;
      
      // Calcular confianza (simplificado)
      const confidenceScore = Math.max(0.5, 0.9 - (i * 0.005)); // Disminuye con el tiempo
      
      // Comparación con período anterior (datos ficticios para demostración)
      const previousYearValue = dailyPredictions[i] * (0.8 + Math.random() * 0.4);
      const previousPeriodComparison = ((dailyPredictions[i] - previousYearValue) / previousYearValue) * 100;
      
      forecastRecords.push({
        restaurant_id: restaurantId,
        date: forecastDate.toISOString().split('T')[0],
        daily_forecast: dailyPredictions[i],
        weekly_forecast: weekly,
        monthly_forecast: monthly,
        is_holiday: isHoliday,
        confidence_score: Number(confidenceScore.toFixed(2)),
        previous_period_comparison: Number(previousPeriodComparison.toFixed(2))
      });
    }
    
    // Eliminar predicciones anteriores
    await supabase
      .from('smart_forecasts')
      .delete()
      .eq('restaurant_id', restaurantId);
    
    // Insertar nuevas predicciones
    const { error } = await supabase
      .from('smart_forecasts')
      .insert(forecastRecords);
    
    if (error) throw error;
    
    return forecastRecords;
    
  } catch (error) {
    console.error("Error al generar predicciones:", error);
    throw error;
  }
}

// Función para actualizar predicciones
export async function updateForecast(id: string, updates: Partial<Omit<SmartForecast, 'id' | 'created_at'>>) {
  const { data, error } = await supabase
    .from('smart_forecasts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
