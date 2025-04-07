
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartCard, NuaLineChart, NuaBarChart } from "@/components/dashboard/Chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { TrendingUp, BarChart2, PlusCircle, AlertTriangle, Target, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ScenarioSelector } from "@/components/projections/ScenarioSelector";
import { FinancialHealthIndicator } from "@/components/projections/FinancialHealthIndicator";

// Mock data for projections
const salesProjection = [
  { name: "Ene", actual: 12000, proyectado: 12000, optimista: 13000, pesimista: 11000 },
  { name: "Feb", actual: 14000, proyectado: 13500, optimista: 14500, pesimista: 12500 },
  { name: "Mar", actual: 13000, proyectado: 14000, optimista: 15000, pesimista: 13000 },
  { name: "Abr", actual: 15000, proyectado: 14500, optimista: 15500, pesimista: 13500 },
  { name: "May", actual: 17000, proyectado: 15000, optimista: 16000, pesimista: 14000 },
  { name: "Jun", actual: 16000, proyectado: 15500, optimista: 16500, pesimista: 14500 },
  { name: "Jul", actual: 18000, proyectado: 16000, optimista: 17000, pesimista: 15000 },
  { name: "Ago", actual: null, proyectado: 16500, optimista: 17500, pesimista: 15500 },
  { name: "Sep", actual: null, proyectado: 17000, optimista: 18000, pesimista: 16000 },
  { name: "Oct", actual: null, proyectado: 18000, optimista: 19000, pesimista: 17000 },
  { name: "Nov", actual: null, proyectado: 20000, optimista: 21000, pesimista: 19000 },
  { name: "Dic", actual: null, proyectado: 22000, optimista: 23000, pesimista: 21000 },
];

export default function ProjectionsPage() {
  const [scenario, setScenario] = useState("proyectado");
  const [breakEvenPoint] = useState(15000);
  const [currentMonthGoal] = useState(16000);
  const [currentMonthSales] = useState(12800);
  const progressPercentage = Math.min(Math.round((currentMonthSales / currentMonthGoal) * 100), 100);
  
  // Determine financial health status
  const salesTrend = 3.5; // Mock: percentage change in sales
  const marginTrend = -1.2; // Mock: percentage change in margin
  const breakEvenStatus = currentMonthSales < breakEvenPoint;
  
  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Proyecciones</h1>
            <p className="text-muted-foreground">
              Analiza tendencias y establece objetivos financieros
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
            <ScenarioSelector currentScenario={scenario} onScenarioChange={setScenario} />
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>Nueva Proyección</span>
            </Button>
          </div>
        </div>

        {breakEvenStatus && (
          <Alert variant="destructive" className="animate-fade-in">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Alerta de punto de equilibrio</AlertTitle>
            <AlertDescription>
              Las ventas actuales (€{currentMonthSales.toLocaleString()}) están por debajo del punto de equilibrio (€{breakEvenPoint.toLocaleString()}).
            </AlertDescription>
          </Alert>
        )}

        {marginTrend < 0 && (
          <Alert className="animate-fade-in border-orange-300 bg-orange-50 text-orange-800">
            <ArrowDownRight className="h-4 w-4 text-orange-500" />
            <AlertTitle>Disminución de margen</AlertTitle>
            <AlertDescription>
              El margen ha disminuido un {Math.abs(marginTrend)}% respecto al mes anterior.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList className="w-full md:w-auto overflow-x-auto">
            <TabsTrigger value="sales">Ventas</TabsTrigger>
            <TabsTrigger value="costs">Costos</TabsTrigger>
            <TabsTrigger value="profit">Beneficios</TabsTrigger>
            <TabsTrigger value="custom">Personalizado</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <ChartCard title="Proyección de Ventas Anual" subtitle="Actual vs. Proyectado">
                <NuaLineChart 
                  data={salesProjection}
                  dataKey={scenario}
                  stroke={
                    scenario === "optimista" ? "#22c55e" : 
                    scenario === "pesimista" ? "#ef4444" : 
                    "#02B1C4"
                  }
                />
              </ChartCard>

              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle>Parámetros de Proyección</CardTitle>
                  <CardDescription>Ajusta los parámetros para la proyección de ventas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="growth-rate">Tasa de Crecimiento Mensual (%)</Label>
                    <Input id="growth-rate" defaultValue="3.5" type="number" step="0.1" />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="seasonality">Factor de Estacionalidad</Label>
                    <Input id="seasonality" defaultValue="1.2" type="number" step="0.1" />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="base-value">Valor Base (€)</Label>
                    <Input id="base-value" defaultValue="12000" type="number" />
                  </div>
                  
                  <Button className="w-full mt-2">Recalcular Proyección</Button>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle>Progreso hacia el Objetivo Mensual</CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>Ventas actuales vs objetivo del mes</span>
                  <FinancialHealthIndicator 
                    salesTrend={salesTrend} 
                    marginTrend={marginTrend} 
                    breakEvenStatus={breakEvenStatus} 
                  />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>€{currentMonthSales.toLocaleString()}</span>
                    <span>€{currentMonthGoal.toLocaleString()}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="text-center text-sm text-muted-foreground">
                    {progressPercentage}% completado
                  </div>
                  
                  <div className="flex items-center justify-between px-2 mt-2">
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1 text-nua-blue" />
                      <span className="text-sm">Punto de Equilibrio</span>
                    </div>
                    <span className="text-sm font-medium">€{breakEvenPoint.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center">
                      {salesTrend >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1 text-red-500" />
                      )}
                      <span className="text-sm">Tendencia Ventas</span>
                    </div>
                    <span className={`text-sm font-medium ${salesTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {salesTrend >= 0 ? '+' : ''}{salesTrend}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle>Objetivos de Ventas</CardTitle>
                <CardDescription>Establece y monitoriza tus objetivos de ventas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div>
                      <Label htmlFor="quarterly-target">Objetivo Trimestral (€)</Label>
                      <Input id="quarterly-target" defaultValue="45000" type="number" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="monthly-target">Objetivo Mensual (€)</Label>
                      <Input id="monthly-target" defaultValue="15000" type="number" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="daily-target">Objetivo Diario (€)</Label>
                      <Input id="daily-target" defaultValue="500" type="number" className="mt-1" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-2">
                    <Button variant="outline">Restablecer</Button>
                    <Button>Guardar Objetivos</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="costs" className="space-y-4">
            <Card className="h-40 flex items-center justify-center bg-muted/20">
              <p className="text-muted-foreground">Proyecciones de costos (próximamente)</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="profit" className="space-y-4">
            <Card className="h-40 flex items-center justify-center bg-muted/20">
              <p className="text-muted-foreground">Proyecciones de beneficios (próximamente)</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <Card className="h-40 flex items-center justify-center bg-muted/20">
              <p className="text-muted-foreground">Proyecciones personalizadas (próximamente)</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
