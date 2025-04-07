
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, LineChart, PieChart, TrendingUp, Receipt, FilePlus } from "lucide-react";

export default function HomePage() {
  const quickLinks = [
    {
      title: "Dashboard Financiero",
      description: "Ver indicadores clave de rendimiento y análisis de ventas",
      icon: <LineChart className="h-10 w-10 text-primary" />,
      href: "/dashboard",
    },
    {
      title: "Cargar Datos",
      description: "Registrar ventas, gastos y otras transacciones",
      icon: <FilePlus className="h-10 w-10 text-secondary" />,
      href: "/data-entry",
    },
    {
      title: "Proyecciones",
      description: "Analizar tendencias y prever resultados futuros",
      icon: <TrendingUp className="h-10 w-10 text-nua-yellow" />,
      href: "/projections",
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Bienvenido a NÜA Smart Analytics</h1>
          <p className="text-muted-foreground">
            Gestiona tus finanzas, analiza tendencias y toma decisiones basadas en datos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link, index) => (
            <Card key={index} className="transition-transform hover:scale-[1.02]">
              <CardHeader>
                <div className="mb-2">{link.icon}</div>
                <CardTitle>{link.title}</CardTitle>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full justify-between">
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
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Resumen de ventas</CardTitle>
              <CardDescription>Últimos 7 días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Receipt className="h-12 w-12 text-nua-turquoise bg-primary/10 p-2 rounded-md" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">€8,459.32</p>
                  <p className="text-xs text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5% respecto a la semana anterior
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full justify-between">
                <Link to="/dashboard">
                  <span>Ver detalles</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Actividad reciente</CardTitle>
              <CardDescription>Últimas actualizaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { text: "Se registraron ventas del día", time: "Hace 2 horas" },
                  { text: "Actualización de gastos mensuales", time: "Ayer" },
                  { text: "Nueva proyección trimestral creada", time: "Hace 3 días" },
                ].map((activity, i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                    <p className="text-sm">{activity.text}</p>
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
