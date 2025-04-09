
import { ReactNode } from "react";

interface ChartGridProps {
  children: ReactNode;
}

export function ChartGrid({ children }: ChartGridProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {children}
    </div>
  );
}
