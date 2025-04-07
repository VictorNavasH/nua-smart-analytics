
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ProjectionHeader } from "@/components/projections/ProjectionHeader";
import { ProjectionAlerts } from "@/components/projections/ProjectionAlerts";
import { SalesProjections } from "@/components/projections/SalesProjections";
import { PlaceholderTab } from "@/components/projections/PlaceholderTab";
import { salesProjection } from "@/components/projections/ProjectionData";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectionsPage() {
  const [scenario, setScenario] = useState("proyectado");
  const [breakEvenPoint] = useState(15000);
  const [currentMonthGoal] = useState(16000);
  const [currentMonthSales] = useState(12800);
  
  // Determine financial health status
  const salesTrend = 3.5; // Mock: percentage change in sales
  const marginTrend = -1.2; // Mock: percentage change in margin
  const breakEvenStatus = currentMonthSales < breakEvenPoint;
  
  return (
    <Layout>
      <div className="space-y-4 animate-fade-in">
        <div className="flex justify-between items-center">
          <ProjectionHeader 
            scenario={scenario} 
            onScenarioChange={setScenario} 
          />
          
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2 text-nua-navy hover:text-nua-turquoise">
              <Home className="h-4 w-4" />
              <span className="hidden md:inline">Volver a Inicio</span>
            </Button>
          </Link>
        </div>

        <ProjectionAlerts 
          breakEvenStatus={breakEvenStatus}
          currentMonthSales={currentMonthSales}
          breakEvenPoint={breakEvenPoint}
          marginTrend={marginTrend}
        />

        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList className="w-full md:w-auto overflow-x-auto">
            <TabsTrigger value="sales">Ventas</TabsTrigger>
            <TabsTrigger value="costs">Costos</TabsTrigger>
            <TabsTrigger value="profit">Beneficios</TabsTrigger>
            <TabsTrigger value="custom">Personalizado</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="space-y-4">
            <SalesProjections 
              salesProjection={salesProjection}
              scenario={scenario}
              currentMonthSales={currentMonthSales}
              currentMonthGoal={currentMonthGoal}
              breakEvenPoint={breakEvenPoint}
              salesTrend={salesTrend}
              marginTrend={marginTrend}
              breakEvenStatus={breakEvenStatus}
            />
          </TabsContent>
          
          <TabsContent value="costs" className="space-y-4">
            <PlaceholderTab tabName="costos" />
          </TabsContent>
          
          <TabsContent value="profit" className="space-y-4">
            <PlaceholderTab tabName="beneficios" />
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <PlaceholderTab tabName="personalizadas" />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
