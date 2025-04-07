
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendIndicator } from "@/components/dashboard/TrendIndicator";
import { SmartForecast } from "@/lib/supabase/types";
import { ArrowUp, Calendar, CalendarDays, Clock } from "lucide-react";

interface ForecastSummaryCardsProps {
  dailyForecast?: SmartForecast;
  weeklyForecast?: number;
  monthlyForecast?: number;
  dailyComparison?: number;
  weeklyComparison?: number;
  monthlyComparison?: number;
}

export function ForecastSummaryCards({
  dailyForecast,
  weeklyForecast,
  monthlyForecast,
  dailyComparison,
  weeklyComparison,
  monthlyComparison,
}: ForecastSummaryCardsProps) {
  // Formatear números para mostrar de forma agradable
  const formatCurrency = (value?: number) => {
    if (value === undefined) return "N/A";
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Predicción diaria */}
      <Card className="border-t-4 border-t-nua-turquoise hover:shadow-lg transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg text-nua-navy">
            <Clock className="mr-2 h-5 w-5 text-nua-turquoise" />
            Previsión Diaria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-nua-navy">
              {formatCurrency(dailyForecast?.daily_forecast)}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-muted-foreground">
                vs. año anterior
              </span>
              <TrendIndicator
                value={dailyComparison || 0}
                showValue={true}
                size="md"
              />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Confianza: {dailyForecast?.confidence_score ? `${Math.round(dailyForecast.confidence_score * 100)}%` : "N/A"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predicción semanal */}
      <Card className="border-t-4 border-t-nua-pink hover:shadow-lg transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg text-nua-navy">
            <Calendar className="mr-2 h-5 w-5 text-nua-pink" />
            Previsión Semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-nua-navy">
              {formatCurrency(weeklyForecast)}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-muted-foreground">
                vs. semana anterior
              </span>
              <TrendIndicator
                value={weeklyComparison || 0}
                showValue={true}
                size="md"
              />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Promedio por día: {formatCurrency(weeklyForecast ? weeklyForecast / 7 : undefined)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predicción mensual */}
      <Card className="border-t-4 border-t-nua-yellow hover:shadow-lg transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg text-nua-navy">
            <CalendarDays className="mr-2 h-5 w-5 text-nua-yellow" />
            Previsión Mensual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-nua-navy">
              {formatCurrency(monthlyForecast)}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-muted-foreground">
                vs. mes anterior
              </span>
              <TrendIndicator
                value={monthlyComparison || 0}
                showValue={true}
                size="md"
              />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Promedio por día: {formatCurrency(monthlyForecast ? monthlyForecast / 30 : undefined)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
