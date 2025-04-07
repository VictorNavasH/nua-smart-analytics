
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getRestaurants } from "@/lib/supabase/restaurants";
import { Restaurant } from "@/lib/supabase/types";

interface RestaurantSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function RestaurantSelector({
  selectedId,
  onSelect,
  className,
}: RestaurantSelectorProps) {
  const [open, setOpen] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRestaurants() {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
        
        // Si no hay restaurante seleccionado y hay restaurantes disponibles, seleccionar el primero
        if (!selectedId && data.length > 0) {
          onSelect(data[0].id);
        }
      } catch (error) {
        console.error("Error al cargar restaurantes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadRestaurants();
  }, [selectedId, onSelect]);

  const selectedRestaurant = restaurants.find(r => r.id === selectedId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between w-[220px] text-left", className)}
          size="sm"
          disabled={isLoading}
        >
          <div className="flex items-center">
            <Store className="mr-2 h-4 w-4 shrink-0" />
            <span className="truncate">
              {selectedRestaurant
                ? selectedRestaurant.name
                : isLoading
                ? "Cargando..."
                : "Selecciona restaurante"}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[220px]">
        <Command>
          <CommandInput placeholder="Buscar restaurante..." />
          <CommandEmpty>No se encontraron restaurantes.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {restaurants.map((restaurant) => (
              <CommandItem
                key={restaurant.id}
                value={restaurant.name}
                onSelect={() => {
                  onSelect(restaurant.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedId === restaurant.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex flex-col">
                  <span className="text-sm">{restaurant.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {restaurant.city}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
