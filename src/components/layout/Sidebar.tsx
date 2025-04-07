
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileSidebar } from "./MobileSidebar";

export function Sidebar() {
  const { expanded, setExpanded } = useSidebar();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => setExpanded(!expanded);
  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

  // Cerrar el sidebar móvil al cambiar de ruta
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Desktop sidebar */}
      <DesktopSidebar expanded={expanded} toggleSidebar={toggleSidebar} />

      {/* Mobile sidebar */}
      <MobileSidebar mobileOpen={mobileOpen} toggleMobileSidebar={toggleMobileSidebar} />
    </>
  );
}
