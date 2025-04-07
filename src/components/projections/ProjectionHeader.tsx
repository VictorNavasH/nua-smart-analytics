
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ScenarioSelector } from "@/components/projections/ScenarioSelector";

interface ProjectionHeaderProps {
  scenario: string;
  onScenarioChange: (scenario: string) => void;
}

export function ProjectionHeader({ scenario, onScenarioChange }: ProjectionHeaderProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Proyecciones</h1>
        <p className="text-muted-foreground">
          Analiza tendencias y establece objetivos financieros
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
        <ScenarioSelector currentScenario={scenario} onScenarioChange={onScenarioChange} />
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Nueva Proyección</span>
        </Button>
      </div>
    </div>
  );
}
