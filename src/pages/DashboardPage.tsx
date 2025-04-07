
import { Layout } from "@/components/layout/Layout";
import { RestaurantSelector } from "@/components/dashboard/RestaurantSelector";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard, NuaLineChart, NuaBarChart, NuaPieChart } from "@/components/dashboard/Chart";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { 
  CreditCard, DollarSign, Users, TrendingUp, 
  BarChart2, Percent, Target 
} from "lucide-react";

// Mock data for charts
const salesData = [
  { name: "Ene", ventas: 12000 },
  { name: "Feb", ventas: 14000 },
  { name: "Mar", ventas: 13000 },
  { name: "Abr", ventas: 15000 },
  { name: "May", ventas: 17000 },
  { name: "Jun", ventas: 16000 },
  { name: "Jul", ventas: 18000 },
];

const clientsData = [
  { name: "Lun", clientes: 120 },
  { name: "Mar", clientes: 180 },
  { name: "Mié", clientes: 140 },
  { name: "Jue", clientes: 210 },
  { name: "Vie", clientes: 260 },
  { name: "Sáb", clientes: 290 },
  { name: "Dom", clientes: 190 },
];

const expensesData = [
  { name: "Personal", value: 45 },
  { name: "Insumos", value: 25 },
  { name: "Alquiler", value: 15 },
  { name: "Servicios", value: 15 },
];

export default function DashboardPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Financiero</h1>
            <p className="text-muted-foreground">
              Monitoriza el rendimiento financiero de tu restaurante
            </p>
          </div>
          <RestaurantSelector />
        </div>

        <Tabs defaultValue="daily" className="space-y-4">
          <TabsList>
            <TabsTrigger value="daily">Diario</TabsTrigger>
            <TabsTrigger value="weekly">Semanal</TabsTrigger>
            <TabsTrigger value="monthly">Mensual</TabsTrigger>
            <TabsTrigger value="yearly">Anual</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <div className="col-span-2">
                <StatCard 
                  title="Ingresos" 
                  value="€2,854.00" 
                  trend={12.5} 
                  icon={<DollarSign className="h-5 w-5 text-nua-turquoise" />}
                />
              </div>
              <div className="col-span-2">
                <StatCard 
                  title="Clientes" 
                  value="210" 
                  trend={8.2} 
                  icon={<Users className="h-5 w-5 text-nua-pink" />}
                  colorClass="#FF4797/10"
                />
              </div>
              <div className="col-span-2">
                <StatCard 
                  title="Ticket Medio" 
                  value="€13.59" 
                  trend={3.7} 
                  icon={<CreditCard className="h-5 w-5 text-nua-yellow" />}
                  colorClass="#FFCE85/10"
                />
              </div>
              <div className="col-span-2">
                <StatCard 
                  title="Margen Neto" 
                  value="24.8%" 
                  trend={-1.2} 
                  icon={<Percent className="h-5 w-5 text-nua-blue" />}
                  colorClass="#364F6B/10"
                />
              </div>
              <div className="col-span-2">
                <StatCard 
                  title="Beneficio Operativo" 
                  value="€705.75" 
                  trend={7.3} 
                  icon={<TrendingUp className="h-5 w-5 text-green-500" />}
                  colorClass="rgba(34, 197, 94, 0.1)"
                />
              </div>
              <div className="col-span-2">
                <StatCard 
                  title="% Punto Equilibrio" 
                  value="76%" 
                  icon={<Target className="h-5 w-5 text-orange-500" />}
                  colorClass="rgba(249, 115, 22, 0.1)"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-3 md:col-span-2">
                <ChartCard title="Ingresos por Mes" subtitle="Últimos 7 meses">
                  <NuaLineChart 
                    data={salesData} 
                    dataKey="ventas" 
                    stroke="#02B1C4"
                  />
                </ChartCard>
              </div>
              <div className="col-span-3 md:col-span-1">
                <ChartCard title="Distribución de Gastos" subtitle="Mes actual">
                  <NuaPieChart 
                    data={expensesData} 
                    dataKey="value" 
                    nameKey="name" 
                    colors={["#02B1C4", "#FF4797", "#FFCE85", "#364F6B"]}
                  />
                </ChartCard>
              </div>
              <div className="col-span-3">
                <ChartCard title="Clientes por Día" subtitle="Últimos 7 días">
                  <NuaBarChart 
                    data={clientsData} 
                    dataKey="clientes" 
                    barColor="#FF4797"
                  />
                </ChartCard>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="weekly" className="space-y-4">
            <div className="flex items-center justify-center h-40 bg-muted rounded-md">
              <p className="text-muted-foreground">Contenido del resumen semanal</p>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly" className="space-y-4">
            <div className="flex items-center justify-center h-40 bg-muted rounded-md">
              <p className="text-muted-foreground">Contenido del resumen mensual</p>
            </div>
          </TabsContent>
          
          <TabsContent value="yearly" className="space-y-4">
            <div className="flex items-center justify-center h-40 bg-muted rounded-md">
              <p className="text-muted-foreground">Contenido del resumen anual</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
