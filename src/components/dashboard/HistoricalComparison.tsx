
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { TrendIndicator } from "@/components/dashboard/TrendIndicator";
import { historicalComparisonData } from "@/data/dashboardData";

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
    <Card className="h-full">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={tooltipFormatter}
                labelFormatter={(label) => `Mes: ${label}`}
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
                <div className="font-medium">{formatValue(item.thisYear)}</div>
                <TrendIndicator value={item.change} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
