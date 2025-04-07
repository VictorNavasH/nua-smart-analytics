
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { TrendIndicator } from "@/components/dashboard/TrendIndicator";
import { ChartPie, TrendingUp, Calendar } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComparisonChart } from "@/components/dashboard/ComparisonChart";

interface ProfitabilityData {
  categories: {
    name: string;
    revenue: number;
    expenses: number;
    profit: number;
    margin: number;
    previousMargin: number;
    change: number;
  }[];
  periods: {
    name: string;
    totalRevenue: number;
    totalExpenses: number;
    totalProfit: number;
    margin: number;
  }[];
}

interface ProfitabilityAnalysisProps {
  data: ProfitabilityData;
}

export function ProfitabilityAnalysis({ data }: ProfitabilityAnalysisProps) {
  const [periodFilter, setPeriodFilter] = useState("all");
  
  // Cálculo de totales
  const totalRevenue = data.categories.reduce((sum, category) => sum + category.revenue, 0);
  const totalExpenses = data.categories.reduce((sum, category) => sum + category.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  
  // Datos para el gráfico de comparación
  const comparisonData = data.periods.map((period) => ({
    name: period.name,
    actual: period.totalProfit,
    goal: period.totalRevenue * 0.2, // Objetivo de rentabilidad del 20%
  }));

  return (
    <Card className="h-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg font-medium">Análisis de Rentabilidad</CardTitle>
          <p className="text-sm text-muted-foreground">
            Desglose de rentabilidad por categorías y períodos
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los períodos</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="quarter">Este trimestre</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="categories" className="flex-1">
              <ChartPie className="h-4 w-4 mr-2" />
              Por Categoría
            </TabsTrigger>
            <TabsTrigger value="periods" className="flex-1">
              <TrendingUp className="h-4 w-4 mr-2" />
              Tendencia
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              Comparativa
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Ingresos</TableHead>
                    <TableHead className="text-right">Gastos</TableHead>
                    <TableHead className="text-right">Beneficio</TableHead>
                    <TableHead className="text-right">Margen</TableHead>
                    <TableHead className="text-right">Evolución</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.categories.map((category) => (
                    <TableRow key={category.name}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell className="text-right">€{category.revenue.toLocaleString()}</TableCell>
                      <TableCell className="text-right">€{category.expenses.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium">
                        €{category.profit.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {category.margin.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <span className="mr-2">{category.change.toFixed(1)}%</span>
                          <TrendIndicator value={category.change} size="sm" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50 font-semibold">
                    <TableCell>TOTAL</TableCell>
                    <TableCell className="text-right">€{totalRevenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">€{totalExpenses.toLocaleString()}</TableCell>
                    <TableCell className="text-right">€{totalProfit.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{profitMargin.toFixed(1)}%</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="periods">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Período</TableHead>
                    <TableHead className="text-right">Ingresos</TableHead>
                    <TableHead className="text-right">Gastos</TableHead>
                    <TableHead className="text-right">Beneficio</TableHead>
                    <TableHead className="text-right">Margen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.periods.map((period) => (
                    <TableRow key={period.name}>
                      <TableCell className="font-medium">{period.name}</TableCell>
                      <TableCell className="text-right">€{period.totalRevenue.toLocaleString()}</TableCell>
                      <TableCell className="text-right">€{period.totalExpenses.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium">
                        €{period.totalProfit.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">{period.margin.toFixed(1)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison">
            <div className="h-[400px]">
              <ComparisonChart 
                data={comparisonData} 
                title="Beneficio vs. Objetivo"
                subtitle="Comparativa del beneficio actual con el objetivo del 20% sobre ingresos"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
