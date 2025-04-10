
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityItem {
  text: string;
  time: string;
}

export function RecentActivityCard() {
  const activities: ActivityItem[] = [
    {
      text: "Se registraron ventas del día",
      time: "Hace 2 horas"
    }, 
    {
      text: "Actualización de gastos mensuales",
      time: "Ayer"
    }, 
    {
      text: "Nueva proyección trimestral creada",
      time: "Hace 3 días"
    }
  ];

  return (
    <Card className="md:col-span-1 shadow-card hover:shadow-card-hover transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-nua-navy">Actividad reciente</CardTitle>
        <CardDescription>Últimas actualizaciones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, i) => (
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
  );
}
