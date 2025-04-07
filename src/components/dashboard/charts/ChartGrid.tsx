
import { ReactNode } from "react";

interface ChartGridProps {
  children: ReactNode;
}

export function ChartGrid({ children }: ChartGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 [&>*:nth-child(3n+1):nth-last-of-type(2)]:lg:col-span-2 [&>*:nth-child(3n+1):nth-last-of-type(1)]:lg:col-span-3">
      {children}
    </div>
  );
}
