
import { useState } from "react";
import { Bell, ChevronDown, Search, Store, LogOut, UserCog, Settings, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [selectedRestaurant, setSelectedRestaurant] = useState("Mi Restaurante");
  const restaurants = ["Mi Restaurante", "Sucursal Centro", "Sucursal Norte"];

  return (
    <header className="h-16 px-4 flex items-center justify-between border-b bg-background sticky top-0 z-10 shadow-sm">
      <div className="flex items-center md:ml-2 transition-all duration-300">
        <div className="flex items-center mr-4 flex-shrink-0">
          <img 
            src="/lovable-uploads/03330604-0926-4f80-9923-9ed3f0b9c399.png" 
            alt="NÜA Smart Analytics Logo" 
            className="h-[34px] w-auto my-auto" 
          />
        </div>
        
        {/* Search moved to the right side */}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex items-center mr-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="pl-8 w-[200px] lg:w-[300px] focus-visible:ring-nua-turquoise"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-nua-blue/20 hover:bg-nua-blue/5">
              <Store className="h-4 w-4 text-nua-blue" />
              {selectedRestaurant}
              <ChevronDown className="h-4 w-4 text-nua-blue" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg rounded-md">
            <DropdownMenuLabel className="text-[#2f2f4c]">Cambiar restaurante</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {restaurants.map((restaurant) => (
              <DropdownMenuItem
                key={restaurant}
                onClick={() => setSelectedRestaurant(restaurant)}
                className={cn(
                  "cursor-pointer text-[#2f2f4c]",
                  restaurant === selectedRestaurant ? "bg-muted text-nua-blue font-medium" : ""
                )}
              >
                {restaurant}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon" className="relative hover:bg-nua-pink/10">
          <BellRing className="h-5 w-5 text-[#2f2f4c]" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-nua-pink"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-nua-turquoise/10">
              <div className="w-8 h-8 rounded-full bg-nua-turquoise flex items-center justify-center text-white font-semibold">
                U
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg rounded-md">
            <DropdownMenuLabel className="text-[#2f2f4c]">Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-[#2f2f4c]">
              <UserCog className="h-4 w-4" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-[#2f2f4c]">
              <Settings className="h-4 w-4" />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-50 flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
