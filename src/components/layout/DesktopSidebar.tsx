
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
        "hidden md:flex flex-col h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 fixed z-30 top-0 left-0 border-r border-sidebar-border",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4 h-16">
        {expanded && (
          <div className="font-bold text-xl">
            NÜA
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "text-sidebar-foreground hover:text-white hover:bg-sidebar-accent",
            expanded ? "ml-auto" : "mx-auto"
          )}
        >
          {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
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
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white",
              !expanded && "justify-center"
            )}
          >
            <item.icon className={cn("h-5 w-5", expanded && "mr-2")} />
            {expanded && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
            N
          </div>
          {expanded && (
            <div className="ml-3">
              <p className="text-sm font-medium">Mi Restaurante</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
