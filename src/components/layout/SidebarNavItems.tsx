
import { 
  HomeIcon, 
  BarChart3, 
  ClipboardList, 
  TrendingUp, 
  UserCog, 
  LayoutDashboard,
  Receipt 
} from "lucide-react";

export const navItems = [
  { name: "Inicio", href: "/", icon: HomeIcon },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Carga de Datos", href: "/data-entry", icon: ClipboardList },
  { name: "Proyecciones", href: "/projections", icon: TrendingUp },
  { name: "Perfil", href: "/profile", icon: UserCog },
];
