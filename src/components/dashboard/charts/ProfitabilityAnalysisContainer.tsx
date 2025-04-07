
import { ProfitabilityAnalysis } from "@/components/dashboard/ProfitabilityAnalysis";
import { profitabilityData } from "@/data/dashboardData";

export function ProfitabilityAnalysisContainer() {
  return (
    <div className="col-span-full">
      <ProfitabilityAnalysis data={profitabilityData} />
    </div>
  );
}
