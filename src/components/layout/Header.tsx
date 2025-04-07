
import { useState } from "react";
import { Bell, ChevronDown, Search, Store, LogOut, UserCog, Settings, BellRing, Home } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function Header() {
  const [selectedRestaurant, setSelectedRestaurant] = useState("Mi Restaurante");
  const restaurants = ["Mi Restaurante", "Sucursal Centro", "Sucursal Norte"];
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("todo");

  return (
    <header className="h-16 px-4 flex items-center justify-between border-b bg-background sticky top-0 z-10 shadow-sm">
      <div className="flex items-center md:ml-2 transition-all duration-300">
        <div className="flex flex-col items-center mr-6 flex-shrink-0">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/03330604-0926-4f80-9923-9ed3f0b9c399.png" 
              alt="NÜA Smart Analytics Logo" 
              className="h-[36px] w-auto" // Aumentado de 30px a 36px
            />
          </div>
          <span className="text-[10px] text-nua-navy font-medium mt-0.5 hidden md:block animate-fade-in">
            Impulsa tu éxito con inteligencia financiera
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex items-center mr-4">
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative flex items-center">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[200px] lg:w-[300px] focus-visible:ring-nua-turquoise border-nua-navy/20"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-1 top-1 h-6 w-6 text-muted-foreground hover:text-nua-turquoise"
                >
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] lg:w-[300px] p-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Filtros de búsqueda</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="todo" 
                      name="searchFilter" 
                      value="todo" 
                      checked={searchFilter === "todo"} 
                      onChange={() => setSearchFilter("todo")}
                      className="mr-2"
                    />
                    <label htmlFor="todo" className="text-sm">Todo</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="ventas" 
                      name="searchFilter" 
                      value="ventas" 
                      checked={searchFilter === "ventas"} 
                      onChange={() => setSearchFilter("ventas")}
                      className="mr-2"
                    />
                    <label htmlFor="ventas" className="text-sm">Ventas</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="restaurante" 
                      name="searchFilter" 
                      value="restaurante" 
                      checked={searchFilter === "restaurante"} 
                      onChange={() => setSearchFilter("restaurante")}
                      className="mr-2"
                    />
                    <label htmlFor="restaurante" className="text-sm">Restaurante</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="fecha" 
                      name="searchFilter" 
                      value="fecha" 
                      checked={searchFilter === "fecha"} 
                      onChange={() => setSearchFilter("fecha")}
                      className="mr-2"
                    />
                    <label htmlFor="fecha" className="text-sm">Fecha</label>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <Button size="sm" className="w-full bg-nua-turquoise hover:bg-nua-turquoise/90">
                    Aplicar filtros
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <Link to="/" className="relative hidden md:flex mr-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-nua-navy hover:text-nua-turquoise hover:bg-nua-turquoise/10">
                  <Home className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Volver a Inicio</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-nua-blue/20 hover:bg-nua-blue/5">
              <Store className="h-4 w-4 text-nua-blue" />
              {selectedRestaurant}
              <ChevronDown className="h-4 w-4 text-nua-blue" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg rounded-md">
            <DropdownMenuLabel className="text-nua-navy">Cambiar restaurante</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {restaurants.map((restaurant) => (
              <DropdownMenuItem
                key={restaurant}
                onClick={() => setSelectedRestaurant(restaurant)}
                className={cn(
                  "cursor-pointer text-nua-navy",
                  restaurant === selectedRestaurant ? "bg-muted text-nua-blue font-medium" : ""
                )}
              >
                {restaurant}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-nua-pink/10">
                <BellRing className="h-5 w-5 text-nua-navy" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-nua-pink"></span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notificaciones</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-nua-turquoise/10">
              <div className="w-8 h-8 rounded-full bg-nua-turquoise flex items-center justify-center text-white font-semibold">
                U
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg rounded-md">
            <DropdownMenuLabel className="text-nua-navy">Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-nua-navy">
              <UserCog className="h-4 w-4" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-nua-navy">
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
