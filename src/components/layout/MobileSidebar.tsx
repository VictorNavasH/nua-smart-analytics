
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navItems } from "./SidebarNavItems";

interface MobileSidebarProps {
  mobileOpen: boolean;
  toggleMobileSidebar: () => void;
}

export function MobileSidebar({ mobileOpen, toggleMobileSidebar }: MobileSidebarProps) {
  const location = useLocation();

  return (
    <>
      <aside
        className={cn(
          "md:hidden fixed inset-0 z-40 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 transform",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 h-16 border-b border-sidebar-border">
          <div className="font-bold text-xl flex items-center">
            <span className="text-nua-turquoise">NÜA</span>
            <span className="text-white ml-1 text-sm">Smart Money</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileSidebar}
            className="text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center rounded-md py-2 px-3 text-sm transition-colors",
                location.pathname === item.href
                  ? "bg-sidebar-accent text-white font-medium border-l-4 border-nua-turquoise"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white border-l-4 border-transparent"
              )}
              onClick={toggleMobileSidebar}
            >
              <item.icon className="h-5 w-5 mr-2" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-nua-turquoise flex items-center justify-center text-white font-semibold">
              N
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Mi Restaurante</p>
              <p className="text-xs text-sidebar-foreground/70">Administrador</p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm" 
          onClick={toggleMobileSidebar}
        />
      )}
    </>
  );
}
