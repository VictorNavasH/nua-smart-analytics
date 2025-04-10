
import { RestaurantSelector } from "@/components/dashboard/RestaurantSelector";
import { UserSettings } from "@/components/dashboard/UserSettings";
import { DashboardSettings } from "@/hooks/useDashboardSettings";
import { useRestaurantStore } from "@/stores/restaurantStore";

interface DashboardHeaderProps {
  settings: DashboardSettings;
  onSettingsChange: (settings: DashboardSettings) => void;
}

export function DashboardHeader({ settings, onSettingsChange }: DashboardHeaderProps) {
  const { selectedRestaurantId, setSelectedRestaurantId } = useRestaurantStore();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Financiero</h1>
        <p className="text-muted-foreground">
          Monitoriza el rendimiento financiero de tu restaurante
        </p>
      </div>
      <div className="flex items-center gap-2">
        <RestaurantSelector 
          selectedId={selectedRestaurantId} 
          onSelect={setSelectedRestaurantId} 
        />
        <UserSettings settings={settings} onSettingsChange={onSettingsChange} />
      </div>
    </div>
  );
}
