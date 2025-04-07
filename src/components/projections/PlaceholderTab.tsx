
import { Card } from "@/components/ui/card";

interface PlaceholderTabProps {
  tabName: string;
}

export function PlaceholderTab({ tabName }: PlaceholderTabProps) {
  return (
    <Card className="h-40 flex items-center justify-center bg-muted/20">
      <p className="text-muted-foreground">Proyecciones de {tabName} (próximamente)</p>
    </Card>
  );
}
