
import React, { createContext, useContext, useState } from "react";

export interface SidebarContextType {
  expanded: boolean;
  toggleExpanded: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  expanded: true,
  toggleExpanded: () => {},
});

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <SidebarContext.Provider value={{ expanded, toggleExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
