
import { HistoricalComparison } from "@/components/dashboard/HistoricalComparison";

interface HistoricalComparisonContainerProps {
  title: string;
}

export function HistoricalComparisonContainer({ title }: HistoricalComparisonContainerProps) {
  return (
    <div className="col-span-6 md:col-span-6">
      <HistoricalComparison title={title} />
    </div>
  );
}
