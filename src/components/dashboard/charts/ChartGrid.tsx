
import { ReactNode } from "react";

interface ChartGridProps {
  children: ReactNode;
}

export function ChartGrid({ children }: ChartGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 [&>*:last-child:nth-child(odd)]:lg:col-span-3">
      {children}
    </div>
  );
}
