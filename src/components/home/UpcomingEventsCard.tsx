
import { Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface Event {
  name: string;
  date: string;
}

export function UpcomingEventsCard() {
  const events: Event[] = [
    {
      name: "Reunión mensual",
      date: "15/04 - 10:00"
    },
    {
      name: "Cierre de mes",
      date: "30/04 - 18:00"
    }
  ];

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-nua-navy flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-nua-yellow" />
          Próximos Eventos
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="space-y-2">
          {events.map((event, index) => (
            <div key={index} className={`flex items-center justify-between ${index < events.length - 1 ? 'border-b pb-2' : ''}`}>
              <p className="text-sm font-medium">{event.name}</p>
              <span className="text-xs text-muted-foreground">{event.date}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full justify-between hover:bg-nua-yellow/5 hover:border-nua-yellow"
        >
          <span>Ver calendario</span>
          <Calendar className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
