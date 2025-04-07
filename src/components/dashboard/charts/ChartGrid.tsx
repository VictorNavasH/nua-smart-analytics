
import { ReactNode } from "react";

interface ChartGridProps {
  children: ReactNode;
}

export function ChartGrid({ children }: ChartGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-12">
      {children}
    </div>
  );
}
