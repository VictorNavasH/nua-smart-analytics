
import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, StoreIcon } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { useRestaurantStore } from "@/stores/restaurantStore";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Restaurant } from "@/lib/supabase/auth";

export function RestaurantSelector() {
  const [open, setOpen] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { selectedRestaurant, setSelectedRestaurant } = useRestaurantStore();
  const { profile, isAdmin } = useAuth();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        let data: Restaurant[] = [];
        
        // Si el usuario es administrador, cargar todos los restaurantes
        if (isAdmin) {
          const result = await getRestaurants();
          data = result as unknown as Restaurant[];
        } 
        // Si no es admin pero tiene un restaurante asignado, solo mostrar ese
        else if (profile?.restaurante_id) {
          const { data: restaurantData, error } = await supabase
            .from('restaurantes')
            .select('*')
            .eq('id', profile.restaurante_id)
            .single();
            
          if (!error) {
            data = [restaurantData as Restaurant];
          }
        }
        
        setRestaurants(data);
        
        // Si no hay restaurante seleccionado y hay restaurantes disponibles
        if (!selectedRestaurant && data.length > 0) {
          setSelectedRestaurant(data[0]);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los restaurantes",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [profile, isAdmin]);

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setOpen(false);
  };

  if (loading) {
    return (
      <Button variant="outline" className="w-[200px] justify-start" disabled>
        <span className="animate-pulse">Cargando...</span>
      </Button>
    );
  }

  if (restaurants.length === 0) {
    return (
      <Button
        variant="outline"
        className="w-[200px] justify-start text-muted-foreground"
        disabled
      >
        <StoreIcon className="mr-2 h-4 w-4" />
        No hay restaurantes
      </Button>
    );
  }

  // Si el usuario no es admin y solo tiene un restaurante, mostrar sin selector
  if (!isAdmin && restaurants.length === 1) {
    return (
      <Button
        variant="outline"
        className="w-[200px] justify-start pointer-events-none"
        disabled
      >
        <StoreIcon className="mr-2 h-4 w-4" />
        {restaurants[0].nombre}
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedRestaurant ? (
            <>
              <StoreIcon className="mr-2 h-4 w-4" />
              {selectedRestaurant.nombre}
            </>
          ) : (
            <>
              <StoreIcon className="mr-2 h-4 w-4" />
              Seleccionar restaurante
            </>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar restaurante..." />
          <CommandEmpty>No se encontraron restaurantes.</CommandEmpty>
          <CommandGroup>
            {restaurants.map((restaurant) => (
              <CommandItem
                key={restaurant.id}
                value={restaurant.nombre}
                onSelect={() => handleSelectRestaurant(restaurant)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedRestaurant?.id === restaurant.id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {restaurant.nombre}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
