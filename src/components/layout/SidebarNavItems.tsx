
import { 
  HomeIcon, 
  LayoutDashboard,
  ClipboardList, 
  TrendingUp, 
  UserCog, 
  Building, 
  Receipt
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function useSidebarNavItems() {
  const { isAdmin, isManager } = useAuth();
  
  const navItems = [
    { name: "Inicio", href: "/", icon: HomeIcon },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ];
  
  // Solo administradores y managers pueden ver estas opciones
  if (isAdmin || isManager) {
    navItems.push(
      { name: "Carga de Datos", href: "/data-entry", icon: ClipboardList },
      { name: "Proyecciones", href: "/projections", icon: TrendingUp }
    );
  }
  
  // Solo administradores pueden ver la gestión de restaurantes
  if (isAdmin) {
    navItems.push(
      { name: "Restaurantes", href: "/restaurants", icon: Building }
    );
  }
  
  // Todos los usuarios pueden ver su perfil
  navItems.push(
    { name: "Perfil", href: "/profile", icon: UserCog }
  );
  
  return navItems;
}

export const navItems = [
  { name: "Inicio", href: "/", icon: HomeIcon },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Carga de Datos", href: "/data-entry", icon: ClipboardList },
  { name: "Proyecciones", href: "/projections", icon: TrendingUp },
  { name: "Restaurantes", href: "/restaurants", icon: Building },
  { name: "Perfil", href: "/profile", icon: UserCog },
];
