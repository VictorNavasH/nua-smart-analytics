
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartCard, NuaLineChart } from "@/components/dashboard/Chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, BarChart2, PlusCircle } from "lucide-react";

// Mock data for projections
const salesProjection = [
  { name: "Ene", actual: 12000, proyectado: 12000 },
  { name: "Feb", actual: 14000, proyectado: 13500 },
  { name: "Mar", actual: 13000, proyectado: 14000 },
  { name: "Abr", actual: 15000, proyectado: 14500 },
  { name: "May", actual: 17000, proyectado: 15000 },
  { name: "Jun", actual: 16000, proyectado: 15500 },
  { name: "Jul", actual: 18000, proyectado: 16000 },
  { name: "Ago", actual: null, proyectado: 16500 },
  { name: "Sep", actual: null, proyectado: 17000 },
  { name: "Oct", actual: null, proyectado: 18000 },
  { name: "Nov", actual: null, proyectado: 20000 },
  { name: "Dic", actual: null, proyectado: 22000 },
];

export default function ProjectionsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Proyecciones</h1>
            <p className="text-muted-foreground">
              Analiza tendencias y establece objetivos financieros
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Nueva Proyección</span>
          </Button>
        </div>

        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sales">Ventas</TabsTrigger>
            <TabsTrigger value="costs">Costos</TabsTrigger>
            <TabsTrigger value="profit">Beneficios</TabsTrigger>
            <TabsTrigger value="custom">Personalizado</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <ChartCard title="Proyección de Ventas Anual" subtitle="Actual vs. Proyectado">
                <NuaLineChart 
                  data={salesProjection}
                  dataKey="proyectado"
                  stroke="#02B1C4"
                />
              </ChartCard>

              <Card>
                <CardHeader>
                  <CardTitle>Parámetros de Proyección</CardTitle>
                  <CardDescription>Ajusta los parámetros para la proyección de ventas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="growth-rate">Tasa de Crecimiento Mensual (%)</Label>
                    <Input id="growth-rate" defaultValue="3.5" type="number" step="0.1" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="seasonality">Factor de Estacionalidad</Label>
                    <Input id="seasonality" defaultValue="1.2" type="number" step="0.1" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="base-value">Valor Base (€)</Label>
                    <Input id="base-value" defaultValue="12000" type="number" />
                  </div>
                  
                  <Button className="w-full">Recalcular Proyección</Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Objetivos de Ventas</CardTitle>
                <CardDescription>Establece y monitoriza tus objetivos de ventas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
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
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Restablecer</Button>
                    <Button>Guardar Objetivos</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="costs" className="space-y-4">
            <div className="flex items-center justify-center h-40 bg-muted rounded-md">
              <p className="text-muted-foreground">Proyecciones de costos (próximamente)</p>
            </div>
          </TabsContent>
          
          <TabsContent value="profit" className="space-y-4">
            <div className="flex items-center justify-center h-40 bg-muted rounded-md">
              <p className="text-muted-foreground">Proyecciones de beneficios (próximamente)</p>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <div className="flex items-center justify-center h-40 bg-muted rounded-md">
              <p className="text-muted-foreground">Proyecciones personalizadas (próximamente)</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
