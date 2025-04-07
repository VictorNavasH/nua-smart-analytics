
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Zap } from "lucide-react";
import { ScenarioSelector } from "@/components/projections/ScenarioSelector";
import { FinancialHealthIndicator } from "@/components/projections/FinancialHealthIndicator";

interface AIPredictionData {
  forecastedRevenue: number;
  forecastedMargin: number;
  confidence: number;
  riskLevel: "bajo" | "medio" | "alto";
  marketFactors: Array<{
    name: string;
    impact: number;
    trend: "positivo" | "negativo" | "neutral";
  }>;
  recommendations: string[];
}

const predictionScenarios = {
  proyectado: {
    forecastedRevenue: 32500,
    forecastedMargin: 23.8,
    confidence: 85,
    riskLevel: "bajo" as const,
    marketFactors: [
      { name: "Inflación", impact: 0.2, trend: "neutral" as const },
      { name: "Competencia", impact: 0.5, trend: "negativo" as const },
      { name: "Tendencias", impact: 0.8, trend: "positivo" as const }
    ],
    recommendations: [
      "Mantener estrategia de precios actual",
      "Invertir en marketing digital",
      "Optimizar costos operativos"
    ]
  },
  optimista: {
    forecastedRevenue: 38750,
    forecastedMargin: 26.5,
    confidence: 72,
    riskLevel: "bajo" as const,
    marketFactors: [
      { name: "Inflación", impact: 0.1, trend: "positivo" as const },
      { name: "Competencia", impact: 0.4, trend: "neutral" as const },
      { name: "Tendencias", impact: 0.9, trend: "positivo" as const }
    ],
    recommendations: [
      "Ampliar oferta de productos",
      "Aumentar inversión en marketing",
      "Considerar expansión geográfica"
    ]
  },
  pesimista: {
    forecastedRevenue: 26800,
    forecastedMargin: 18.2,
    confidence: 68,
    riskLevel: "alto" as const,
    marketFactors: [
      { name: "Inflación", impact: 0.7, trend: "negativo" as const },
      { name: "Competencia", impact: 0.8, trend: "negativo" as const },
      { name: "Tendencias", impact: 0.3, trend: "neutral" as const }
    ],
    recommendations: [
      "Reducir costos fijos",
      "Revisar precios de servicios",
      "Ajustar inventario a demanda mínima"
    ]
  }
};

export function AIPredictionEngine() {
  const [isLoading, setIsLoading] = useState(true);
  const [scenario, setScenario] = useState<string>("proyectado");
  const [predictionData, setPredictionData] = useState<AIPredictionData | null>(null);
  
  // Simular la carga de datos de IA
  useEffect(() => {
    setIsLoading(true);
    
    // Simulamos el tiempo de procesamiento de la IA
    const timer = setTimeout(() => {
      setPredictionData(predictionScenarios[scenario as keyof typeof predictionScenarios]);
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [scenario]);
  
  // Calcular tendencias para los indicadores de salud financiera
  const salesTrend = scenario === "pesimista" ? -5.2 : scenario === "optimista" ? 8.7 : 2.1;
  const marginTrend = scenario === "pesimista" ? -3.8 : scenario === "optimista" ? 4.2 : 0.5;
  const breakEvenStatus = scenario === "pesimista"; // En escenario pesimista no se alcanza punto equilibrio
  
  return (
    <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-nua-blue rounded-xl overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-white to-nua-blue/5">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg font-medium text-nua-blue">
              <Brain className="h-5 w-5 text-nua-blue" />
              Predicción IA
            </CardTitle>
            <CardDescription className="text-nua-blue/70">
              Análisis predictivo basado en datos históricos y tendencias de mercado
            </CardDescription>
          </div>
          <div className="flex gap-2 items-center">
            <FinancialHealthIndicator 
              salesTrend={salesTrend}
              marginTrend={marginTrend}
              breakEvenStatus={breakEvenStatus}
            />
            <Badge variant="outline" className="bg-nua-blue/10 text-nua-blue">
              <Zap className="h-3 w-3 mr-1" />
              IA
            </Badge>
          </div>
        </div>
        <div className="mt-2">
          <ScenarioSelector 
            currentScenario={scenario} 
            onScenarioChange={setScenario} 
          />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-2/3" />
          </div>
        ) : predictionData && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/50 p-3 rounded-lg border shadow-sm">
                <div className="text-sm text-muted-foreground">Ingresos Previstos</div>
                <div className="text-2xl font-bold text-nua-blue">€{predictionData.forecastedRevenue.toLocaleString()}</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className={`h-4 w-4 mr-1 ${salesTrend >= 0 ? "text-green-500" : "text-red-500"}`} />
                  <span className={`text-xs ${salesTrend >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {salesTrend >= 0 ? "+" : ""}{salesTrend}%
                  </span>
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg border shadow-sm">
                <div className="text-sm text-muted-foreground">Margen Previsto</div>
                <div className="text-2xl font-bold text-nua-turquoise">{predictionData.forecastedMargin}%</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className={`h-4 w-4 mr-1 ${marginTrend >= 0 ? "text-green-500" : "text-red-500"}`} />
                  <span className={`text-xs ${marginTrend >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {marginTrend >= 0 ? "+" : ""}{marginTrend}%
                  </span>
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg border shadow-sm">
                <div className="text-sm text-muted-foreground">Confianza Predicción</div>
                <div className="text-2xl font-bold text-nua-yellow">{predictionData.confidence}%</div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    predictionData.riskLevel === "bajo" ? "bg-green-100 text-green-700" :
                    predictionData.riskLevel === "medio" ? "bg-orange-100 text-orange-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    Riesgo {predictionData.riskLevel}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Factores de Mercado</h4>
              <div className="space-y-2">
                {predictionData.marketFactors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{factor.name}</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            factor.trend === "positivo" ? "bg-green-500" :
                            factor.trend === "negativo" ? "bg-red-500" :
                            "bg-orange-400"
                          }`}
                          style={{ width: `${factor.impact * 100}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs ${
                        factor.trend === "positivo" ? "text-green-500" :
                        factor.trend === "negativo" ? "text-red-500" :
                        "text-orange-400"
                      }`}>
                        {(factor.impact * 10).toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Recomendaciones IA</h4>
              <ul className="space-y-1 text-sm">
                {predictionData.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-nua-blue/10 rounded-full text-nua-blue text-xs flex items-center justify-center mr-2 mt-0.5">
                      {index + 1}
                    </span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
