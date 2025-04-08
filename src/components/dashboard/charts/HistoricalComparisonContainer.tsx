
import { HistoricalComparison } from "@/components/dashboard/HistoricalComparison";

interface HistoricalComparisonContainerProps {
  title: string;
}

export function HistoricalComparisonContainer({ title }: HistoricalComparisonContainerProps) {
  return (
    <div className="w-full">
      <HistoricalComparison title={title} />
    </div>
  );
}
