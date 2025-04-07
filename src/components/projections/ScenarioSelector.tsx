
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ScenarioSelectorProps {
  currentScenario: string;
  onScenarioChange: (scenario: string) => void;
}

export function ScenarioSelector({ currentScenario, onScenarioChange }: ScenarioSelectorProps) {
  return (
    <div className="flex items-center">
      <div className="mr-2 text-sm font-medium">Escenario:</div>
      <Select value={currentScenario} onValueChange={onScenarioChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Seleccionar escenario" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="proyectado">Realista</SelectItem>
          <SelectItem value="optimista">Optimista</SelectItem>
          <SelectItem value="pesimista">Pesimista</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
