
import { HistoricalComparison } from "@/components/dashboard/HistoricalComparison";

interface HistoricalComparisonContainerProps {
  title: string;
}

export function HistoricalComparisonContainer({ title }: HistoricalComparisonContainerProps) {
  return (
    <div className="col-span-full lg:col-span-3 xl:col-span-6">
      <HistoricalComparison title={title} />
    </div>
  );
}
