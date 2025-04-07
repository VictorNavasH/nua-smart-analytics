
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { TrendIndicator } from "@/components/dashboard/TrendIndicator";
import { historicalComparisonData } from "@/data/dashboardData";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip as UITooltip } from "@/components/ui/tooltip";

interface HistoricalComparisonProps {
  title?: string;
}

export function HistoricalComparison({ title = "Comparativa Histórica" }: HistoricalComparisonProps) {
  const [metric, setMetric] = useState<"sales" | "customers" | "avgTicket">("sales");
  
  const data = historicalComparisonData[metric];
  
  const getMetricLabel = () => {
    switch(metric) {
      case "sales": return "Ventas";
      case "customers": return "Clientes";
      case "avgTicket": return "Ticket Medio";
      default: return "";
    }
  };
  
  const formatValue = (value: number) => {
    if (metric === "avgTicket") return `€${value.toFixed(1)}`;
    if (metric === "sales") return `€${value.toLocaleString()}`;
    return value.toLocaleString();
  };
  
  const tooltipFormatter = (value: number) => {
    return [formatValue(value), metric === "sales" ? "Ventas" : 
           metric === "customers" ? "Clientes" : "Ticket Medio"];
  };
  
  return (
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-nua-turquoise rounded-xl overflow-hidden">
      <CardHeader className="pb-0 flex flex-row items-start justify-between bg-gradient-to-r from-white to-nua-turquoise/5">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-medium text-nua-navy">{title}</CardTitle>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-nua-navy/60 hover:text-nua-turquoise">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Comparación de métricas clave con periodos anteriores</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
        <Tabs 
          defaultValue="sales" 
          className="w-[260px]"
          onValueChange={(value) => setMetric(value as "sales" | "customers" | "avgTicket")}
        >
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="sales">Ventas</TabsTrigger>
            <TabsTrigger value="customers">Clientes</TabsTrigger>
            <TabsTrigger value="avgTicket">Ticket</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={tooltipFormatter}
                labelFormatter={(label) => `Mes: ${label}`}
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              />
              <Legend 
                formatter={(value) => {
                  return value === "thisYear" ? "Este Año" : "Año Anterior";
                }}
              />
              <Bar dataKey="thisYear" fill="#02B1C4" name="thisYear" />
              <Bar dataKey="lastYear" fill="#FFCE85" name="lastYear" />
              <ReferenceLine y={0} stroke="#000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {data.slice(0, 3).map((item) => (
            <div key={item.month} className="bg-muted/30 p-3 rounded-md">
              <div className="text-sm text-muted-foreground mb-1">{item.month}</div>
              <div className="flex justify-between items-center">
                <div className="font-medium text-nua-navy">{formatValue(item.thisYear)}</div>
                <TrendIndicator value={item.change} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
