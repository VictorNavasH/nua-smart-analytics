
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarNavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface MobileSidebarProps {
  navItems: SidebarNavItem[];
}

export function MobileSidebar({ navItems }: MobileSidebarProps) {
  const { expanded, setExpanded } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();

  // Si el usuario no está autenticado, no mostrar el sidebar
  if (!user) {
    return null;
  }

  return (
    <>
      {/* Overlay que se muestra cuando el sidebar está expandido */}
      {expanded && (
        <div
          className="fixed inset-0 z-10 bg-black/50 md:hidden"
          onClick={() => setExpanded(false)}
        ></div>
      )}

      {/* Sidebar móvil */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r bg-background transition-all duration-200 ease-in-out md:hidden",
          expanded ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
          <Link to="/" className="flex items-center" onClick={() => setExpanded(false)}>
            <img
              src="/lovable-uploads/7f140b8e-4327-4848-b1f0-b992cb671c52.png"
              alt="NÜA Logo"
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex-1"></div>
          <button
            className="h-8 w-8 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => setExpanded(false)}
          >
            <span className="sr-only">Close sidebar</span>
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
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
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
                      "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      location.pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "transparent"
                    )}
                    onClick={() => setExpanded(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
