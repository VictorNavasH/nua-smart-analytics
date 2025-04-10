
import { BookOpen, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function HelpCenterCard() {
  return (
    <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-nua-navy flex items-center gap-2 text-lg">
          <BookOpen className="h-5 w-5 text-nua-turquoise" />
          Centro de Ayuda
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        <p className="text-sm text-muted-foreground">Accede a guías, tutoriales y documentación para aprovechar al máximo la plataforma.</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full justify-between hover:bg-nua-turquoise/5 hover:border-nua-turquoise"
        >
          <span>Ver recursos</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
