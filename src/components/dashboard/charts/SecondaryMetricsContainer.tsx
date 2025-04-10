
import { SecondaryMetrics } from "@/components/dashboard/SecondaryMetrics";

interface SecondaryMetricsContainerProps {
  show: boolean;
}

export function SecondaryMetricsContainer({ show }: SecondaryMetricsContainerProps) {
  if (!show) return null;
  
  return (
    <div className="w-full">
      <SecondaryMetrics />
    </div>
  );
}
