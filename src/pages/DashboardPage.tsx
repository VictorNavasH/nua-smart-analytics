
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { RestaurantSelector } from "@/components/dashboard/RestaurantSelector";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard, NuaLineChart, NuaBarChart } from "@/components/dashboard/Chart";
import { MonthlyNotes } from "@/components/dashboard/MonthlyNotes";
import { SecondaryMetrics } from "@/components/dashboard/SecondaryMetrics";
import { DateRangeSelector } from "@/components/dashboard/DateRangeSelector";
import { ExportData } from "@/components/dashboard/ExportData";
import { UserSettings, DashboardSettings } from "@/components/dashboard/UserSettings";
import { FinancialAlert } from "@/components/dashboard/FinancialAlert";
import { ExpensesChart } from "@/components/dashboard/ExpensesChart";
import { DateRange } from "react-day-picker";
import { exportData } from "@/services/exportService";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { 
  CreditCard, DollarSign, Users, TrendingUp, 
  BarChart2, Percent, Target
} from "lucide-react";

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
  const monthlyGoal = 15000;
  const currentSales = 12000;
  const isBelow = currentSales < 9500;
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });
  
  const [alerts, setAlerts] = useState<Array<{
    id: string;
    type: "warning" | "danger" | "success" | "info";
    title: string;
    description: string;
    threshold?: number;
    current?: number;
  }>>([
    {
      id: "1",
      type: "danger",
      title: "Alerta de punto de equilibrio",
      description: "Las ventas actuales no alcanzan el punto de equilibrio. Es necesario tomar medidas.",
      threshold: 9500,
      current: 8700
    }
  ]);
  
  const [settings, setSettings] = useState<DashboardSettings>({
    showSecondaryMetrics: true,
    showMonthlyNotes: true,
    showProgressBars: true,
    showExpensesChart: true,
  });
  
  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };
  
  const handleExport = async (type: "csv" | "excel") => {
    // Aquí se manejaría la exportación de datos real, obteniendo los datos según el dateRange
    // Para este ejemplo, usamos los datos de prueba
    const columns = [
      { key: "name", label: "Período" },
      { key: "ventas", label: "Ventas (€)" }
    ];
    
    return await exportData(salesData, columns, type, `ventas_dashboard_${new Date().toISOString().split('T')[0]}`);
  };

  // Efecto para simular la carga de datos al cambiar el rango de fechas
  useEffect(() => {
    // Aquí se cargarían los datos basados en el rango de fechas
    console.log("Cargando datos para el rango:", dateRange);
  }, [dateRange]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Financiero</h1>
            <p className="text-muted-foreground">
              Monitoriza el rendimiento financiero de tu restaurante
            </p>
          </div>
          <div className="flex items-center gap-2">
            <RestaurantSelector />
            <UserSettings settings={settings} onSettingsChange={setSettings} />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <DateRangeSelector onRangeChange={setDateRange} />
          <ExportData onExport={handleExport} />
        </div>

        {alerts.map(alert => (
          <FinancialAlert
            key={alert.id}
            type={alert.type}
            title={alert.title}
            description={alert.description}
            threshold={alert.threshold}
            current={alert.current}
            onDismiss={() => dismissAlert(alert.id)}
          />
        ))}

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
                  progress={settings.showProgressBars ? currentSales : undefined}
                  progressMax={monthlyGoal}
                  showProgressBar={settings.showProgressBars}
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
              {settings.showMonthlyNotes && (
                <div className="col-span-3 md:col-span-1">
                  <MonthlyNotes />
                </div>
              )}
              <div className="col-span-3 md:col-span-2">
                <ChartCard title="Clientes por Día" subtitle="Últimos 7 días">
                  <NuaBarChart 
                    data={clientsData} 
                    dataKey="clientes" 
                    barColor="#FF4797"
                  />
                </ChartCard>
              </div>
              {settings.showSecondaryMetrics && (
                <div className="col-span-3 md:col-span-1">
                  <SecondaryMetrics />
                </div>
              )}
              {settings.showExpensesChart && (
                <div className="col-span-3">
                  <ExpensesChart data={expensesData} />
                </div>
              )}
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
