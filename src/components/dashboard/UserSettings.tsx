
import { useState, useEffect } from "react";
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useVisualFeedback } from "@/hooks/useVisualFeedback";
import { DashboardSettings } from "@/hooks/useDashboardSettings";
import { useForm } from "react-hook-form";

interface UserSettingsProps {
  settings: DashboardSettings;
  onSettingsChange: (settings: DashboardSettings) => void;
}

export function UserSettings({ settings, onSettingsChange }: UserSettingsProps) {
  const { showSuccess } = useVisualFeedback();
  const [open, setOpen] = useState(false);
  
  // Initialize the form with react-hook-form
  const form = useForm({
    defaultValues: settings
  });

  // Update local form values when settings prop changes
  useEffect(() => {
    form.reset(settings);
  }, [settings, form]);

  const handleSave = () => {
    const values = form.getValues();
    onSettingsChange(values);
    setOpen(false);
    showSuccess(
      "Configuración guardada", 
      "Tus preferencias han sido actualizadas."
    );
  };

  const handleCancel = () => {
    form.reset(settings);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-9 w-9 transition-transform active:scale-95 hover:bg-accent/80"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] animate-scale-in">
        <DialogHeader>
          <DialogTitle>Personalizar Dashboard</DialogTitle>
          <DialogDescription>
            Configura qué elementos deseas visualizar en tu panel de control.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="py-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="showSecondaryMetrics"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 transition-all hover:shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Mostrar métricas secundarias</FormLabel>
                      <FormDescription>
                        Muestra la sección de métricas adicionales
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="showMonthlyNotes"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 transition-all hover:shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Mostrar notas mensuales</FormLabel>
                      <FormDescription>
                        Muestra la sección de notas y comentarios
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="showProgressBars"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 transition-all hover:shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Mostrar barras de progreso</FormLabel>
                      <FormDescription>
                        Muestra el progreso hacia objetivos
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="showExpensesChart"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 transition-all hover:shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Mostrar gráfico de gastos</FormLabel>
                      <FormDescription>
                        Muestra el gráfico de distribución de gastos
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="showAIPredictions"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 transition-all hover:shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Mostrar predicciones IA</FormLabel>
                      <FormDescription>
                        Muestra las predicciones de inteligencia artificial
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} className="transition-all hover:bg-background/80">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="transition-all active:scale-95">
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
