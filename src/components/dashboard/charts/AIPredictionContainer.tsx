
import { AIPredictionEngine } from "@/components/dashboard/AIPredictionEngine";

interface AIPredictionContainerProps {
  show?: boolean;
}

export function AIPredictionContainer({ show = true }: AIPredictionContainerProps) {
  if (!show) return null;
  
  return (
    <div className="col-span-full lg:col-span-3">
      <AIPredictionEngine />
    </div>
  );
}
