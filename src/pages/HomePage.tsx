
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, LineChart, PieChart, TrendingUp, Receipt, FilePlus, Github, Calendar, BarChart3, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HomePage() {
  const [timeRange, setTimeRange] = useState("7d");

  const quickLinks = [{
    title: "Dashboard Financiero",
    description: "Ver indicadores clave de rendimiento y análisis de ventas",
    icon: <LineChart className="h-10 w-10 text-nua-turquoise" />,
    href: "/dashboard"
  }, {
    title: "Cargar Datos",
    description: "Registrar ventas, gastos y otras transacciones",
    icon: <FilePlus className="h-10 w-10 text-nua-pink" />,
    href: "/data-entry"
  }, {
    title: "Proyecciones",
    description: "Analizar tendencias y prever resultados futuros",
    icon: <TrendingUp className="h-10 w-10 text-nua-yellow" />,
    href: "/projections"
  }];
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-nua-navy">Bienvenido a NÜA Smart Analytics</h1>
            <a 
              href="https://github.com/nua-analytics/nua-dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-nua-turquoise transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="hidden md:inline">GitHub</span>
            </a>
          </div>
          <p className="text-muted-foreground">Impulsa tu éxito con la inteligencia financiera de NÜA Smart Restaurant.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link, index) => (
            <Card 
              key={index} 
              className="transition-all duration-300 hover:shadow-card-hover hover:scale-[1.02] border border-gray-100"
            >
              <CardHeader>
                <div className="mb-2">{link.icon}</div>
                <CardTitle className="text-nua-navy">{link.title}</CardTitle>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full justify-between hover:bg-nua-turquoise/5 hover:border-nua-turquoise"
                >
                  <Link to={link.href}>
                    <span>Ir ahora</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-1 shadow-card hover:shadow-card-hover transition-all duration-300">
            <CardHeader className="pb-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-nua-navy flex items-center gap-2">
                  Resumen de ventas
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-nua-navy/60 hover:text-nua-turquoise">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total de ventas registradas en el periodo seleccionado</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[130px] h-7 mt-1 text-xs">
                      <SelectValue placeholder="Últimos 7 días" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1d">Último día</SelectItem>
                      <SelectItem value="7d">Últimos 7 días</SelectItem>
                      <SelectItem value="30d">Últimos 30 días</SelectItem>
                      <SelectItem value="90d">Último trimestre</SelectItem>
                      <SelectItem value="1y">Último año</SelectItem>
                    </SelectContent>
                  </Select>
                </CardDescription>
              </div>
              <div className="hidden md:flex gap-2 mt-2 md:mt-0">
                <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Día</span>
                </Button>
                <Button variant="outline" size="sm" className="text-xs flex items-center gap-1 bg-nua-turquoise/5 border-nua-turquoise/30 text-nua-turquoise">
                  <BarChart3 className="h-3 w-3" />
                  <span>Semana</span>
                </Button>
                <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                  <PieChart className="h-3 w-3" />
                  <span>Mes</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Receipt className="h-12 w-12 text-white bg-nua-turquoise p-2 rounded-md" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-nua-navy">€8,459.32</p>
                  <p className="text-xs text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5% respecto a la semana anterior
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                asChild 
                variant="outline" 
                className="w-full justify-between hover:bg-nua-turquoise/5 hover:border-nua-turquoise"
              >
                <Link to="/dashboard">
                  <span>Ver detalles</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="md:col-span-1 shadow-card hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-nua-navy">Actividad reciente</CardTitle>
              <CardDescription>Últimas actualizaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[{
                text: "Se registraron ventas del día",
                time: "Hace 2 horas"
              }, {
                text: "Actualización de gastos mensuales",
                time: "Ayer"
              }, {
                text: "Nueva proyección trimestral creada",
                time: "Hace 3 días"
              }].map((activity, i) => (
                  <div 
                    key={i} 
                    className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded transition-colors"
                  >
                    <p className="text-sm text-nua-navy">{activity.text}</p>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
