
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { expanded } = useSidebar();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Sidebar />
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          expanded ? "md:ml-64" : "md:ml-16"
        )}
      >
        <Header />
        <main className="p-3 md:p-4 lg:px-6 xl:px-8 max-w-[1920px] mx-auto animate-scale-in">{children}</main>
      </div>
    </div>
  );
}
