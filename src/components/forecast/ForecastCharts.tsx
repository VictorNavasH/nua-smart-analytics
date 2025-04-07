
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SmartForecast } from "@/lib/supabase/types";
import { getTrendColor, getTrendEmoji } from "@/lib/forecast/utils";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ReferenceLine,
} from "recharts";
import { InfoIcon } from "lucide-react";

interface ForecastChartsProps {
  forecasts: SmartForecast[];
  weeklyData: any[];
  monthlyData: any[];
}

export function ForecastCharts({
  forecasts,
  weeklyData,
  monthlyData,
}: ForecastChartsProps) {
  // Formatear datos para los gráficos diarios
  const dailyData = forecasts.slice(0, 7).map((forecast) => {
    const date = new Date(forecast.date);
    const dayName = new Intl.DateTimeFormat("es-ES", { weekday: "short" }).format(date);
    const dayNumber = new Intl.DateTimeFormat("es-ES", { day: "numeric" }).format(date);
    
    return {
      name: `${dayName} ${dayNumber}`,
      forecast: Math.round(forecast.daily_forecast),
      comparison: forecast.previous_period_comparison,
    };
  });

  // Calcular el promedio para la línea de referencia
  const avgDailyForecast = Math.round(
    dailyData.reduce((sum, item) => sum + item.forecast, 0) / dailyData.length
  );

  return (
    <div className="space-y-6">
      <Card className="border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg text-nua-navy">
            Evolución de ventas estimadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="daily">Próximos 7 días</TabsTrigger>
              <TabsTrigger value="weekly">Próximas 4 semanas</TabsTrigger>
              <TabsTrigger value="monthly">Próximos 3 meses</TabsTrigger>
            </TabsList>

            {/* Datos diarios */}
            <TabsContent value="daily" className="w-full">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) =>
                        [`${value.toLocaleString()} €`, "Previsión"]
                      }
                    />
                    <Legend />
                    <ReferenceLine
                      y={avgDailyForecast}
                      label="Promedio"
                      stroke="#FF4797"
                      strokeDasharray="3 3"
                    />
                    <Bar
                      dataKey="forecast"
                      name="Ventas estimadas"
                      fill="#02B1C4"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-nua-navy flex items-center mb-2">
                    <InfoIcon className="h-4 w-4 mr-1 text-nua-turquoise" />
                    Análisis diario
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      Día más fuerte:{" "}
                      <span className="font-medium">
                        {
                          dailyData.reduce((prev, current) =>
                            prev.forecast > current.forecast ? prev : current
                          ).name
                        }
                      </span>
                    </li>
                    <li>
                      Día más débil:{" "}
                      <span className="font-medium">
                        {
                          dailyData.reduce((prev, current) =>
                            prev.forecast < current.forecast ? prev : current
                          ).name
                        }
                      </span>
                    </li>
                    <li>
                      Promedio diario:{" "}
                      <span className="font-medium">
                        {avgDailyForecast.toLocaleString()} €
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-nua-navy flex items-center mb-2">
                    <InfoIcon className="h-4 w-4 mr-1 text-nua-pink" />
                    Tendencia general
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      Comparando con el período anterior, las ventas muestran una tendencia:
                    </p>
                    {dailyData.length > 0 && (
                      <div
                        className={`text-lg font-bold ${getTrendColor(
                          dailyData[0].comparison || 0
                        )}`}
                      >
                        {getTrendEmoji(dailyData[0].comparison || 0)}{" "}
                        {dailyData[0].comparison > 0
                          ? "Crecimiento"
                          : dailyData[0].comparison < 0
                          ? "Decrecimiento"
                          : "Estable"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Datos semanales */}
            <TabsContent value="weekly" className="w-full">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) =>
                        [`${value.toLocaleString()} €`, "Previsión"]
                      }
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      name="Ventas estimadas"
                      stroke="#02B1C4"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="lastYear"
                      name="Año anterior"
                      stroke="#FF4797"
                      strokeDasharray="3 3"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            {/* Datos mensuales */}
            <TabsContent value="monthly" className="w-full">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) =>
                        [`${value.toLocaleString()} €`, "Previsión"]
                      }
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      name="Ventas estimadas"
                      stroke="#02B1C4"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="lastYear"
                      name="Año anterior"
                      stroke="#FFCE85"
                      strokeDasharray="3 3"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
