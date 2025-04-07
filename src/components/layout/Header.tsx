
import { Bell, Settings, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RestaurantSelector } from "@/components/dashboard/RestaurantSelector";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRestaurantStore } from "@/stores/restaurantStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  const { toggleExpanded } = useSidebar();
  const { user, profile, restaurant, signOut } = useAuth();
  const { selectedRestaurantId, setSelectedRestaurantId } = useRestaurantStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  // Obtener iniciales del nombre para el avatar
  const getInitials = () => {
    if (profile?.nombre_completo) {
      return profile.nombre_completo
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return user?.email?.substring(0, 2).toUpperCase() || "NU";
  };

  // Obtener el rol en español
  const getRoleName = () => {
    if (!profile) return "";
    
    switch (profile.rol) {
      case "admin": return "Administrador";
      case "manager": return "Gerente";
      case "analyst": return "Analista";
      default: return "";
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 md:hidden"
        onClick={toggleExpanded}
      >
        <span className="sr-only">Toggle sidebar</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M9 18h6"></path>
          <path d="M2 8h20"></path>
          <path d="M3 14h18"></path>
        </svg>
      </Button>
      <div className="relative flex flex-1 items-center gap-4 md:gap-8">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <img
            src="/lovable-uploads/b59e57f7-7256-4917-a532-2863925ef4f1.png"
            alt="NÜA Logo"
            className="h-6 w-auto"
          />
          
          {user && (
            <RestaurantSelector 
              selectedId={selectedRestaurantId} 
              onSelect={setSelectedRestaurantId} 
            />
          )}
        </nav>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        {user && (
          <>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            
            {/* Botón de cerrar sesión visible siempre */}
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs h-8 hidden md:flex"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Cerrar Sesión
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full h-8 w-8 p-0 relative overflow-hidden"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-nua-turquoise text-white">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">{profile?.nombre_completo || "Usuario"}</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {profile?.email}
                    </span>
                    <span className="text-xs mt-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-sm inline-block w-fit">
                      {getRoleName()}
                    </span>
                    {restaurant && (
                      <span className="text-xs mt-1 flex items-center text-muted-foreground">
                        <Settings className="h-3 w-3 mr-1" />
                        Restaurante: {restaurant.nombre}
                      </span>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Perfil y Preferencias
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500 focus:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </header>
  );
}
