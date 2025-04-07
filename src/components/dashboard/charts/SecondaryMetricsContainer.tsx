
import { SecondaryMetrics } from "@/components/dashboard/SecondaryMetrics";

interface SecondaryMetricsContainerProps {
  show: boolean;
}

export function SecondaryMetricsContainer({ show }: SecondaryMetricsContainerProps) {
  if (!show) return null;
  
  return (
    <div className="col-span-3 md:col-span-1">
      <SecondaryMetrics />
    </div>
  );
}
