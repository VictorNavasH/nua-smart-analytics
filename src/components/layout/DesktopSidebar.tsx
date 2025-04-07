
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarNavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface DesktopSidebarProps {
  navItems: SidebarNavItem[];
}

export function DesktopSidebar({ navItems }: DesktopSidebarProps) {
  const { expanded, toggleExpanded } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();

  // Si el usuario no está autenticado, no mostrar el sidebar
  if (!user) {
    return null;
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <Link to="/" className="flex items-center">
          {expanded ? (
            <img
              src="/lovable-uploads/7f140b8e-4327-4848-b1f0-b992cb671c52.png"
              alt="NÜA Logo"
              className="h-8 w-auto"
            />
          ) : (
            <img
              src="/lovable-uploads/03330604-0926-4f80-9923-9ed3f0b9c399.png"
              alt="NÜA"
              className="h-8 w-8 rounded-md"
            />
          )}
        </Link>
        <div className="flex-1"></div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleExpanded}
        >
          <span className="sr-only">
            {expanded ? "Collapse sidebar" : "Expand sidebar"}
          </span>
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
            <path d="m15 4-8 8 8 8"></path>
          </svg>
        </Button>
      </div>
      <nav className="flex-1 overflow-auto p-2">
        <ul className="grid gap-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <Link
                  to={item.href}
                  className={cn(
                    "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "transparent"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {expanded && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
