
import { HistoricalComparison } from "@/components/dashboard/HistoricalComparison";

export function HistoricalComparisonContainer() {
  return (
    <div className="col-span-3 md:col-span-2">
      <HistoricalComparison title="Comparativa con Año Anterior" />
    </div>
  );
}
