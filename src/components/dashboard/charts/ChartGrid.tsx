
import { ReactNode } from "react";

interface ChartGridProps {
  children: ReactNode;
}

export function ChartGrid({ children }: ChartGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-6 lg:grid-cols-12">
      {children}
    </div>
  );
}
