
import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export interface DashboardSettings {
  showSecondaryMetrics: boolean;
  showMonthlyNotes: boolean;
  showProgressBars: boolean;
  showExpensesChart: boolean;
}

interface UserSettingsProps {
  settings: DashboardSettings;
  onSettingsChange: (settings: DashboardSettings) => void;
}

export function UserSettings({ settings, onSettingsChange }: UserSettingsProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState<DashboardSettings>(settings);

  const handleToggle = (key: keyof DashboardSettings) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    setOpen(false);
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias han sido actualizadas.",
    });
  };

  const handleCancel = () => {
    setLocalSettings(settings);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Personalizar Dashboard</DialogTitle>
          <DialogDescription>
            Configura qué elementos deseas visualizar en tu panel de control.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Mostrar métricas secundarias</FormLabel>
                <FormDescription>
                  Muestra la sección de métricas adicionales
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={localSettings.showSecondaryMetrics}
                  onCheckedChange={() => handleToggle("showSecondaryMetrics")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Mostrar notas mensuales</FormLabel>
                <FormDescription>
                  Muestra la sección de notas y comentarios
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={localSettings.showMonthlyNotes}
                  onCheckedChange={() => handleToggle("showMonthlyNotes")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Mostrar barras de progreso</FormLabel>
                <FormDescription>
                  Muestra el progreso hacia objetivos
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={localSettings.showProgressBars}
                  onCheckedChange={() => handleToggle("showProgressBars")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Mostrar gráfico de gastos</FormLabel>
                <FormDescription>
                  Muestra el gráfico de distribución de gastos
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={localSettings.showExpensesChart}
                  onCheckedChange={() => handleToggle("showExpensesChart")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
