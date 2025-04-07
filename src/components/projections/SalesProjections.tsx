
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartCard, NuaLineChart } from "@/components/dashboard/Chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { FinancialHealthIndicator } from "@/components/projections/FinancialHealthIndicator";

interface SalesProjectionsProps {
  salesProjection: any[];
  scenario: string;
  currentMonthSales: number;
  currentMonthGoal: number;
  breakEvenPoint: number;
  salesTrend: number;
  marginTrend: number;
  breakEvenStatus: boolean;
}

export function SalesProjections({
  salesProjection,
  scenario,
  currentMonthSales,
  currentMonthGoal,
  breakEvenPoint,
  salesTrend,
  marginTrend,
  breakEvenStatus
}: SalesProjectionsProps) {
  const progressPercentage = Math.min(Math.round((currentMonthSales / currentMonthGoal) * 100), 100);
  
  return (
    <div className="space-y-4">
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
    </div>
  );
}
