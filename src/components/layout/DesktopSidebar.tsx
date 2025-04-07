
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navItems } from "./SidebarNavItems";

interface DesktopSidebarProps {
  expanded: boolean;
  toggleSidebar: () => void;
}

export function DesktopSidebar({ expanded, toggleSidebar }: DesktopSidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 fixed z-30 top-0 left-0 border-r border-sidebar-border shadow-md",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-sidebar-border">
        {expanded && (
          <div className="font-bold text-xl flex items-center">
            <span className="text-nua-turquoise">NÜA</span>
            <span className="text-white ml-1 text-sm">Smart Money</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "text-sidebar-foreground hover:text-white hover:bg-sidebar-accent transition-all duration-300",
            expanded ? "ml-auto" : "mx-auto"
          )}
        >
          {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center rounded-md py-2 px-3 text-sm transition-all duration-200",
              location.pathname === item.href
                ? "bg-sidebar-accent text-white font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white",
              !expanded && "justify-center",
              location.pathname === item.href && expanded
                ? "border-l-4 border-nua-turquoise"
                : "border-l-4 border-transparent"
            )}
          >
            <item.icon className={cn("h-5 w-5", expanded && "mr-2")} />
            {expanded && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-nua-turquoise flex items-center justify-center text-white font-semibold">
            N
          </div>
          {expanded && (
            <div className="ml-3">
              <p className="text-sm font-medium">Mi Restaurante</p>
              <p className="text-xs text-sidebar-foreground/70">Administrador</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
