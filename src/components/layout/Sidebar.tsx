
import { useState, useEffect } from "react";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileSidebar } from "./MobileSidebar";
import { useSidebarNavItems } from "./SidebarNavItems";

export function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const navItems = useSidebarNavItems();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar al montar
    checkIfMobile();

    // Añadir listener
    window.addEventListener("resize", checkIfMobile);

    // Limpiar al desmontar
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return isMobile ? (
    <MobileSidebar navItems={navItems} />
  ) : (
    <DesktopSidebar navItems={navItems} />
  );
}
