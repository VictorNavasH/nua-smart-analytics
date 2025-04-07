
import { HistoricalComparison } from "@/components/dashboard/HistoricalComparison";

export function HistoricalComparisonContainer() {
  return (
    <div className="col-span-full lg:col-span-3 xl:col-span-3">
      <HistoricalComparison title="Comparativa con Año Anterior" />
    </div>
  );
}
