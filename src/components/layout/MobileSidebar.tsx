
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
        <div className="flex items-center justify-between p-4 h-16">
          <div className="font-bold text-xl">NÜA</div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileSidebar}
            className="text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center rounded-md py-2 px-3 text-sm transition-colors",
                location.pathname === item.href
                  ? "bg-sidebar-accent text-white font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white"
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
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
              N
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Mi Restaurante</p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-black/50" 
          onClick={toggleMobileSidebar}
        />
      )}
    </>
  );
}
