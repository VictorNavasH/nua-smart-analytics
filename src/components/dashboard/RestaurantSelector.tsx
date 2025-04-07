
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
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
import { cn } from "@/lib/utils";

const restaurants = [
  { value: "all", label: "Todos los restaurantes" },
  { value: "main", label: "Mi Restaurante" },
  { value: "center", label: "Sucursal Centro" },
  { value: "north", label: "Sucursal Norte" },
];

export function RestaurantSelector() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("all");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[200px] justify-between"
        >
          {value ? restaurants.find((restaurant) => restaurant.value === value)?.label : "Seleccionar restaurante"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar restaurante..." />
          <CommandEmpty>No se encontraron restaurantes.</CommandEmpty>
          <CommandGroup>
            {restaurants.map((restaurant) => (
              <CommandItem
                key={restaurant.value}
                value={restaurant.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === restaurant.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {restaurant.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
