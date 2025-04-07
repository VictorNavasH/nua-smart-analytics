
import { HistoricalComparison } from "@/components/dashboard/HistoricalComparison";

export function HistoricalComparisonContainer() {
  return (
    <div className="col-span-full md:col-span-2 lg:col-span-2 xl:col-span-2">
      <HistoricalComparison title="Comparativa con Año Anterior" />
    </div>
  );
}
