
import { ReactNode } from "react";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";

interface DashboardTabsProps {
  children: ReactNode;
}

export function DashboardTabs({ children }: DashboardTabsProps) {
  return (
    <Tabs defaultValue="daily" className="space-y-4">
      <TabsList>
        <TabsTrigger value="daily">Diario</TabsTrigger>
        <TabsTrigger value="weekly">Semanal</TabsTrigger>
        <TabsTrigger value="monthly">Mensual</TabsTrigger>
        <TabsTrigger value="yearly">Anual</TabsTrigger>
      </TabsList>
      
      <TabsContent value="daily" className="space-y-4">
        {children}
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
  );
}
